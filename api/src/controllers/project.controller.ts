import { JsonController, Get, Post, Body, Authorize, Put, Delete, Param } from 'kiwi-server';
import { ProjectService } from '../services/project.service';
import { Log } from '../sdk/logs';
import { Response } from '../sdk/response';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { ResponseCode, StatusConstants, StatusLog, StatusProject } from '../sdk/constants';
import { Project } from '../datastore/entities';
import { v4 as uuidv4 } from 'uuid';
import { constants } from 'os';

@JsonController('/project')
export class ProjectController {

    constructor(private projectService: ProjectService, private userService: UserService) {}

    @Authorize()
    @Get('/')
    public async projects() {
        try {
            const projects = await this.projectService.getAll();
            return new Response(ResponseCode.OK, '', projects);
        } catch (err) {
            Log.error(`user/projects`, err);
            return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
        }
    }
    @Authorize()
    @Get('/:id')
    public async projectsById(@Param('id') id: string) {
        try {
            const projects = await this.projectService.getById(id);
            return new Response(ResponseCode.OK, '', projects);
        } catch (err) {
            Log.error(`user/projects`, err);
            return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
        }
    }

    @Authorize()
    @Post('/projects')
    public async create(request: any) {
        try {
            const projectModel = new Project();
            projectModel.name = request.project.title;
            projectModel.type = request.project.type;
            projectModel.apiKey = request.project.apikey;
            projectModel.urls = request.project.urls;
            request.project.typeLogStatus.push(StatusLog.ACTIVE);
            projectModel.typeLogStatus = request.project.typeLogStatus
            
            const project = await this.projectService.add(projectModel)
            
            return new Response(ResponseCode.OK, '', project);
        } catch (err) {
            Log.error(`/projects`, err);
            return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
        }
    }

    @Authorize()
    @Delete('/:project')
    public async delete (@Param('project') project_id: string){
        try{
            const project = await this.projectService.delete(project_id);
            return new Response(ResponseCode.OK,'','');

        }catch(err){
            Log.error(`/projects`,err);
            return new Response(ResponseCode.ERROR,environment.common.genericErrorMessage);
        }
    }
}