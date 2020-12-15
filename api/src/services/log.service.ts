
import { getRepository } from '../datastore';
import { Log } from '../datastore/entities';
import { ObjectID } from 'mongodb';
import { ObjectID as ObjectIDType} from 'typeorm'
import { LogIn, LogListIn } from '../models/log.models';

export class LogService {
  async create(body: LogIn, level: string, project_id: ObjectIDType){
    body.date = new Date();
    const projRepository = await getRepository(Log);
    return await projRepository.insert(body)
  }

  async list(body: LogListIn, project_id: string){
    const projRepository = await getRepository(Log);
    const condition = { project: new ObjectID(project_id) };
    return await projRepository.find(condition);
  }
  
}