import { JsonController, Get, Post, Body, Authorize, Put, Param, HeaderParam } from 'kiwi-server';
import { UserIn, LoginIn, ForgotPasswordIn, ResetPasswordIn } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { Log } from '../sdk/logs';
import { Response } from '../sdk/response';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { ResponseCode, StatusProject } from '../sdk/constants';
import { Project } from '../datastore/entities';
import { v4 as uuidv4 } from 'uuid';
import { ObjectID as ObjectIDType } from 'typeorm'
import { ObjectID } from 'mongodb';

@JsonController('/user')
export class UserController {


    constructor(private authService: AuthService, private projectService: ProjectService, private userService: UserService) { }

    @Post('/login')
    public post(@Body() body: LoginIn) {
        try {
            return this.authService.login(body);
        } catch (err) {
            Log.error(`user/login`, err);
            return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
        }
    }

    @Post()
    public register(@Body() body: UserIn) {
        return this.authService.register(body);
    }

    @Authorize()
    @Get('/current')
    public current(request: any) {
        try {
            return new Response(ResponseCode.OK, '', request.user);
        } catch (err) {
            Log.error(`user/current`, err);
            return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
        }
    }

    @Authorize()
    @Get('/logout')
    public logout() {
        // TODO: not sure if we need it
    }

    @Authorize()
    @Get('/projects')
    public async projects(request: any) {
        try {
            const user = await this.userService.get(request.user.email);
            const projects = await this.projectService.list(user.projects);
            return new Response(ResponseCode.OK, '', projects);
        } catch (err) {
            Log.error(`user/projects`, err);
            return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
        }
    }

    @Authorize()
    @Post('/projects')
    public async create(@Body() body: any, @HeaderParam("authorization") token: string, request: any) {
        try {
            
            const projectModel = new Project();
            if (body.name == '' || body.type == '' || body.apiKey == '') {
                throw new Error('all fields are required')
            }
            projectModel.name = body.title;
            projectModel.type = body.type;
            projectModel.apiKey = uuidv4();
            projectModel.status = StatusProject.ENABLED;
            let user = this.authService.decode(token);

            const project = await this.projectService.add(projectModel)
            this.addProjectUser(project.identifiers[0].id, user.email);

            return new Response(ResponseCode.OK, '', project);
        } catch (err) {
            Log.error(`/projects`, err);
            return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
        }
    }

    @Post('/forgot-password')
    public forgotPassword(@Body() body: ForgotPasswordIn) { }

    @Put('/reset-password')
    public resetPassword(@Body() body: ResetPasswordIn) { }


    private async addProjectUser(projectId: any, email: string) {
        let user = await this.userService.get(email);
        if (!user.projects) {
            user.projects = new Array();
        }
        user.projects.push(new ObjectID(projectId.id));
        let retorno = await this.userService.update(user);

    }
}