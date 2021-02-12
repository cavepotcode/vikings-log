import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class addCrossDomainField1613160233825 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        queryRunner.updateMany('projects', {}, { $set: { crossDomain:[] } });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
