
import { getRepository } from '../datastore';
import { Log } from '../datastore/entities';
import { ObjectID } from 'mongodb';
import { ObjectID as ObjectIDType } from 'typeorm'
import { LogIn, LogListIn, LogListOut, LogUpdate } from '../models/log.models';
import { StatusLog } from '../sdk/constants';

export class LogService {
    async create(body: LogIn, level: string, project_id: ObjectIDType) {
        const log = new Log()
        log.date = new Date();
        log.level = level;
        log.message = body.message.toLowerCase();
        log.project = project_id;
        log.info = body.info;
        log.exception = body.exception;
        log.status = StatusLog.ACTIVE;
        log.history = [];
        const projRepository = await getRepository(Log);
        return await projRepository.insert(log);
    }

    async list(body: LogListIn, project_id: string) {
        const projRepository = await getRepository(Log);
        const offset = (parseInt(body.page) - 1) * parseInt(body.size);

        var myDate = new Date();
        myDate.setDate(myDate.getDate() - 20);

        var myDate2 = new Date();
        myDate2.setDate(myDate.getDate() + 10);

        const condition = {
            take: parseInt(body.size),
            skip: offset,
            order: { date: "DESC" },
            where: {
                project: new ObjectID(project_id),
                message: new RegExp(body.text),
            },
        };

        if (body.level) {
            condition.where['level'] = body.level;
        }
        if (body.status) {
            condition.where['status'] = body.status;
        }
        if (body.dateFrom && body.dateTo) {
            condition.where['date'] = { $gte: new Date(body.dateFrom), $lt: new Date(body.dateTo) }
        }
        const [items, total] = await projRepository.findAndCount(condition);
        const result = new LogListOut();
        result.items = items;
        result.total = total;
        return result;
    }

    async getById(id: string): Promise<Log> {
        const projRepository = await getRepository(Log);
        const condition = { _id: new ObjectID(id) }
        return await projRepository.findOne(condition);
    }

    async updateStatus(body: LogUpdate) {
        const projRepository = await getRepository(Log);
        return await projRepository.findOneAndUpdate({ _id: new ObjectID(body.id) }, { $set: { status: body.status,history:body.history }});
    }

    async countLogsByProjectId(id:string){
        const projRepository = await getRepository(Log);
        const condition = { project: new ObjectID(id) }
        return  await projRepository.count(condition);
    }

}
