import {MigrationInterface, QueryRunner, getMongoManager} from "typeorm";
import { User } from "../entities/user";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class init1595883784580 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const user = new User();
        user.email = 'info@cavepot.com';
        user.password = '12345678';
        await queryRunner.insertOne('users', user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
