import { MigrationInterface, QueryRunner } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class addingTypeToProjects1600728030226 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<any> {
        return queryRunner.updateMany('projects', {}, { $set: { type: 'test' } });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
