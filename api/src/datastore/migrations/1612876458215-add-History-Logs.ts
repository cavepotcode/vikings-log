import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class addHistoryLogs1612876458215 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        queryRunner.updateMany('logs', {}, { $set: { history:[] } });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
