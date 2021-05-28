import { MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { getConnection } from "typeorm";
import { ObjectID } from 'mongodb';
import { Project } from "../entities/index"

export class changeProjectTypes1613746600359 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const conn = await getConnection();
        if (!conn) throw new Error('Connection to db not available');
        const projRepository = await conn.getMongoRepository(Project);
        const projects = await projRepository.find()
        projects.forEach(proj => {
            projRepository.findOneAndUpdate({ _id: new ObjectID(proj.id.toString()) }, { $set: { "type": [proj.type] } });
        });
        queryRunner.updateMany('logs', {}, { $unset: { type:1 } })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
