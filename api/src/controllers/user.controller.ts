import { JsonController, Get, Post, Body, Authorize, Put, Param, HeaderParam, QueryParam, Delete, getSocket } from 'kiwi-server';
import { UserIn, LoginIn, ForgotPasswordIn, ResetPasswordIn, CreateUserIn, UpdateUserIn } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { Log } from '../sdk/logs';
import { Response } from '../sdk/response';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { ResponseCode, StatusLog, StatusProject, userRoles, UserRoles, UserStatus } from '../sdk/constants';
import { Project, User } from '../datastore/entities';
import { v4 as uuidv4 } from 'uuid';
import { ObjectID } from 'mongodb';
import { ProjectListIn } from '../models/project.models';
import { LogService } from '../services/log.service';

import { encrypt } from '../sdk/encrypt';

@JsonController('/user')
export class UserController {


    constructor(private authService: AuthService, private projectService: ProjectService, private userService: UserService, private logService: LogService) { }

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
    public async register(@Body() body: UserIn) {

        const user = new User();
        user.email = body.email;
        user.username = body.username;
        user.password = encrypt(body.password);
        user.status = UserStatus.ACTIVE;
        user.role = UserRoles.USER;

        return this.authService.register(user);
    }

    @Authorize()
    @Get('/logout')
    public logout() {
        // TODO: not sure if we need it
    }

    @Authorize()
    @Get('/projects')
    public async projects(@QueryParam() body: ProjectListIn, request: any) {
        try {
            let projects;
            const user = await this.userService.get(request.user.email);
            if (user.projects) {
                projects = await this.projectService.list(user.projects, body?.text);

                for (let item in projects) {
                    projects[item].countLogs = await this.logService.countLogsByProjectId(projects[item].id);
                }
            }
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
            body.typeLogStatus.push(StatusLog.ACTIVE);
            projectModel.typeLogStatus = body.typeLogStatus
            projectModel.urls = body.urls;
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

    @Authorize()
    @Post('/user')
    public async createUser(@Body() body: CreateUserIn) {

        const user = new User();
        user.email = body.email;
        user.username = body.username;
        user.password = body.password != null ? encrypt(body.password) : encrypt(body.email);
        user.status = UserStatus.ACTIVE;
        if (!userRoles.includes(body.role)) {
            return new Response(ResponseCode.ERROR, 'user role does not exist')
        }
        user.role = body.role == UserRoles.ADMINISTRATOR ? UserRoles.ADMINISTRATOR : UserRoles.USER;

        if (body.projects) {
            user.projects = new Array();
            for (const item of body.projects) {
                let element = new ObjectID(item.id)
                user.projects.push(element);
            }
        }
        const result = await this.authService.register(user);
        return new Response(ResponseCode.OK, '')
    }
    @Put('/:user')
    public async updateUser(@Param('user') user_id: string, @Body() body: UpdateUserIn) {
        let user = await this.userService.getById(user_id);
        if (!userRoles.includes(body.role)) {
            return new Response(ResponseCode.ERROR, 'user role does not exist')
        }
        
        user.username = body.username;
        user.role = body.role == UserRoles.ADMINISTRATOR ? UserRoles.ADMINISTRATOR : UserRoles.USER;
        user.email = body.email;
        if (body.projects) {
            user.projects = new Array();
            for (const item of body.projects) {
                let element = new ObjectID(item.id)
                user.projects.push(element);
            }
        }
        const result = await this.userService.update(user);
        getSocket().emit('refresh-project-list');
        return new Response(ResponseCode.OK, '')
    }
    @Authorize()
    @Get('/users')
    public async getUsers() {
        const users = await this.userService.getAll();
        return new Response(ResponseCode.OK, '', users);
    }
    @Get('/user/:user')
    public async getUsersbyId(@Param('user') user_id: string) {
        const users = await this.userService.getById(user_id);

        let projectList = [];
        for (const item of users.projects) {
            let project = await this.projectService.getById(item)
            if (project) {
                projectList.push(project);
            }
        }
        users.projects = projectList;
        return new Response(ResponseCode.OK, '', users);
    }
    @Delete('/user/:user')
    public async deleteUser(@Param('user') user_id: string) {
        const user = await this.userService.delete(user_id);
        return new Response(ResponseCode.OK, '', '');
    }

    private async addProjectUser(projectId: any, email: string) {
        let user = await this.userService.get(email);
        if (!user.projects) {
            user.projects = new Array();
        }
        user.projects.push(new ObjectID(projectId.id));
        let retorno = await this.userService.update(user);

    }
}