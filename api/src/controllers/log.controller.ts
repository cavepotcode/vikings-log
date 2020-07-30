import { JsonController, HeaderParam, Post, Get, Body, Param} from 'kiwi-server';
import { ProjectService } from '../services/project.service';
import { Log } from '../sdk/logs';
import { Response } from '../sdk/response';
import { ResponseCode, levels } from '../sdk/constants';
import { environment } from '../../environments/environment';
import { LogService } from '../services/log.service';

@JsonController('/log')
export class LogController {

  constructor(private projectSvc: ProjectService, private logSvc: LogService) {}

  @Post('/:level')
  public async log_info(@Body() body: any, @HeaderParam('apikey') apikey: string, @Param('level') level:string){
    try {
      if(!levels.includes(level)){
        return new Response(ResponseCode.ERROR, `Level ${level} is incorrect`);
      }
      const project = await this.projectSvc.get(apikey);
      if(!project){
        return new Response(ResponseCode.ERROR, `Project with ${apikey} apiKey doesnt exists`);
      }
      const log = await this.logSvc.create(body, level, project.id.toString());
      return new Response(ResponseCode.OK, '');
    } catch (err) {
      Log.error(`log/${level}`, err);
      return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
    }
  }
 
}