import { Authorize, Get, JsonController } from "kiwi-server";
import { Response } from '../sdk/response';
import { ResponseCode, levels } from '../sdk/constants';
import { ProjectTypeService } from "../services/projectType.service";

@Authorize()
@JsonController('/generic')
export class GenericController {

    constructor(private projectTypeService: ProjectTypeService) {}

    @Get('/levelsCode')
    public async levelsCode() {
        return new Response(ResponseCode.OK,'',levels);
    }

    @Get('/projects')
    public async projects(){
        const projects = await this.projectTypeService.get();
        return new Response(ResponseCode.OK,'',projects);
    }
}