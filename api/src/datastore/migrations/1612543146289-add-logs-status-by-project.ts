import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { statuslogs } from "../../sdk/constants";

export class addLogsStatusByProject1612543146289 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        queryRunner.updateMany('projects', {}, { $set: { typeLogStatus: statuslogs } });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
