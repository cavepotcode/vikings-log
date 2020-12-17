
import { getRepository } from '../datastore';
import { Log } from '../datastore/entities';
import { ObjectID } from 'mongodb';
import { ObjectID as ObjectIDType, Like} from 'typeorm'
import { LogIn, LogListIn, LogListOut } from '../models/log.models';

export class LogService {
  async create(body: LogIn, level: string, project_id: ObjectIDType){
    const log = new Log()
    log.date = new Date();
    log.level = level;
    log.message = body.message;
    log.project = project_id;
    log.type = body.type;
    log.info = body.info;
    log.exception = body.exception;
    const projRepository = await getRepository(Log);
    return await projRepository.insert(log);
  }

  async list(body: LogListIn, project_id: string){
    const projRepository = await getRepository(Log);
    const offset = (parseInt(body.page)-1) * parseInt(body.size);
    const condition = { 
      take: parseInt(body.size),
      skip: offset,
      order: { date: "DESC" },
      where: { 
        project: new ObjectID(project_id),
        message: new RegExp(body.text)
      }
    };

    if(body.level){
      condition.where['level'] = body.level;
    }
    const [items, total] = await projRepository.findAndCount(condition);
    const result = new LogListOut();
    result.items = items;
    result.total = total;
    return result;
  }
  
}