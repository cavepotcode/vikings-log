import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Project } from "../entities/project";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../entities";

export class init1595883784580 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        let project = new Project();
        project.name = 'test';
        project.apiKey = uuidv4();
        const result_proj = await queryRunner.insertOne('projects', project);

        project = new Project();
        project.name = 'test2';
        project.apiKey = uuidv4();
        const result_proj2 = await queryRunner.insertOne('projects', project);


        const user = new User();
        user.email = 'info@cavepot.com';
        user.username = 'cavepot';
        user.projects = [result_proj.insertedId, result_proj2.insertedId];
        user.password = "491fea714a65b155ded773a63623fecb71321cded7586d7916d205e078743325" ;
        await queryRunner.insertOne('users', user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
