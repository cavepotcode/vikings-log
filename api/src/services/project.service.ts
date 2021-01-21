
import { getRepository } from '../datastore';
import { Project, Log } from '../datastore/entities';
import { ObjectID as ObjectIDType } from 'typeorm'
import { ObjectID } from 'mongodb';
import { StatusProject } from '../sdk/constants';

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

    async list(project_ids: Array<ObjectIDType>, text: string) {
        const projRepository = await getRepository(Project);
        const condition =
        {
            where:
            {
                _id: { $in: project_ids },
                status: StatusProject.ENABLED,
                name: new RegExp(text),
            }
        }
        return await projRepository.find(condition);
    }

    async add(project: Project) {
        const projRepository = await getRepository(Project);
        return await projRepository.insert(project);
    }

    async delete(id: string) {
        const projRepository = await getRepository(Project);
        return await projRepository.findOneAndUpdate({ _id: new ObjectID(id) }, { $set: { status: StatusProject.DISABLED } });
    }
}
