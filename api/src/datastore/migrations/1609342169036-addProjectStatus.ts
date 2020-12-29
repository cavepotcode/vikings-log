import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { StatusProject } from "../../sdk/constants";

export class addProjectStatus1609342169036 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        queryRunner.updateMany('projects', {}, { $set: { status: StatusProject.ENABLED } });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
