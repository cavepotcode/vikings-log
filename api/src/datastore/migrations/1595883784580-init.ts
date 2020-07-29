import {MigrationInterface, QueryRunner, getMongoManager} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Project } from "../entities/project";
import { v4 as uuidv4 } from 'uuid';

export class init1595883784580 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const project = new Project();
        project.name = 'test';
        project.apiKey = uuidv4();
        await queryRunner.insertOne('projects', project);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
