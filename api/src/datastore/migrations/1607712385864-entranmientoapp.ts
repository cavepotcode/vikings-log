import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Project } from "../entities/project";
import { v4 as uuidv4 } from 'uuid';

export class entranmientoapp1607712385864 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        let project = new Project();
        project.name = 'App Entrenamineto Test';
        project.apiKey = uuidv4();
        await queryRunner.insertOne('projects', project);

        project = new Project();
        project.name = 'App Entrenamineto';
        project.apiKey = uuidv4();
        await queryRunner.insertOne('projects', project);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
