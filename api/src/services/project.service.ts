
import { getRepository } from '../datastore';
import { Project, Log } from '../datastore/entities';
import { ObjectID as ObjectIDType} from 'typeorm'
import { ObjectID } from 'mongodb';

export class ProjectService {

  async get(apikey: string): Promise<Project> {
    const projRepository = await getRepository(Project);
    const condition = { where: { apiKey: apikey } }
    return await projRepository.findOne(condition);
  }

  async getById(id: string): Promise<Project> {
    const projRepository = await getRepository(Project);
    const condition = { _id: new ObjectID(id) }
    return await projRepository.findOne(condition);
  }

  async list(project_ids: Array<ObjectIDType>){
    const projRepository = await getRepository(Project);
    const condition =  { _id: { $in: project_ids} }
    return await projRepository.find(condition);
  }
}