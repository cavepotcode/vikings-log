
import { getRepository } from '../datastore';
import { Log } from '../datastore/entities';
import { ObjectID } from 'mongodb';
import { ObjectID as ObjectIDType, Like} from 'typeorm'
import { LogIn, LogListIn, LogListOut } from '../models/log.models';

export class LogService {
  async create(body: LogIn, level: string, project_id: ObjectIDType){
    body.date = new Date();
    const projRepository = await getRepository(Log);
    return await projRepository.insert(body)
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