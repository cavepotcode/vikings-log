import { JsonController, HeaderParam, Post, Param, Body} from 'kiwi-server';
import { ProjectService } from '../services/project.service';
import { Log } from '../sdk/logs';
import { Response } from '../sdk/response';
import { ResponseCode } from '../sdk/constants';
import { environment } from '../../environments/environment';

@JsonController('/log')
export class LogController {

  constructor(private projectSvc: ProjectService) {}

  @Post('/info')
  public async post(@Body() body: any, @HeaderParam('apikey') apikey: string){
    try {
      const projects = await this.projectSvc.get(apikey);
      return new Response(ResponseCode.OK, '', projects);
    } catch (err) {
      Log.logError('project/all', err);
      return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
    }
  }
}