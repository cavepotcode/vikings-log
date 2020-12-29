import { getRepository } from "../datastore";
import { ProjectType } from "../datastore/entities";

export class ProjectTypeService{
    async get(): Promise<ProjectType> {
        const projRepository = await getRepository(ProjectType);
        return await projRepository.find();
      }
}