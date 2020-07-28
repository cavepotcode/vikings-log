
import { getRepository } from '../datastore';
import { Project } from '../datastore/entities';

export class ProjectService {
  async get(apikey: string) {
    const projRepository = await getRepository(Project);
    const condition =  { apiKey: apikey }
    return await projRepository.find(condition);
  }
}