
import { getRepository } from '../datastore';
import { Log } from '../datastore/entities';
import { ObjectID } from 'typeorm';

export class LogService {
  async create(body: any, level: string, project_id: ObjectID){
    const log = new Log();
    log.date = new Date();
    log.level = level;
    log.message = body.message;
    log.project = project_id;
    log.stackTrace = body.stackTrace;
    const projRepository = await getRepository(Log);
    return await projRepository.insert(log)
  }
}