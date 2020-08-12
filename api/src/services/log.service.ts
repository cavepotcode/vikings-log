
import { getRepository } from '../datastore';
import { Log } from '../datastore/entities';
import { ObjectID } from 'mongodb';
import { ObjectID as ObjectIDType} from 'typeorm'
import { LogListIn } from '../models/log.models';

export class LogService {
  async create(body: any, level: string, project_id: ObjectIDType){
    const log = new Log();
    log.date = new Date();
    log.level = level;
    log.message = body.message;
    log.project = project_id;
    log.stackTrace = body.stackTrace;
    const projRepository = await getRepository(Log);
    return await projRepository.insert(log)
  }

  async list(body: LogListIn, project_id: string){
    const projRepository = await getRepository(Log);
    const condition = { project: new ObjectID(project_id) };
    return await projRepository.find(condition);
  }
  
}