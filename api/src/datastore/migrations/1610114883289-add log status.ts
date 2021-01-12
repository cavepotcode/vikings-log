import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { StatusLog } from "../../sdk/constants";

export class addLogStatus1610114883289 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        queryRunner.updateMany('logs', {}, { $set: { status: StatusLog.ACTIVE } });
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
