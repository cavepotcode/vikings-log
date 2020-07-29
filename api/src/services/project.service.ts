
import { getRepository } from '../datastore';
import { Project, Log } from '../datastore/entities';

export class ProjectService {
  async get(apikey: string): Promise<Project> {
    const projRepository = await getRepository(Project);
    const condition = { where: { apiKey: apikey } }
    return await projRepository.findOne(condition);
  }
}