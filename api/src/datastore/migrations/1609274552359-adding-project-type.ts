import {MigrationInterface, QueryRunner} from "typeorm";
import { ProjectType } from "../entities";
import { v4 as uuidv4 } from 'uuid';
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class addingProjectType1609274552359 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        let projectype = new ProjectType();
        projectype.name = ".net";
        projectype.id =  uuidv4();
        await queryRunner.insertOne('projectType', projectype);
        
        projectype = new ProjectType();
        projectype.name = "php";
        projectype.id =  uuidv4();
        await queryRunner.insertOne('projectType', projectype);
        
        projectype = new ProjectType();
        projectype.name = "node";
        projectype.id =  uuidv4();
        await queryRunner.insertOne('projectType', projectype);
        
        projectype = new ProjectType();
        projectype.name = "angular";
        projectype.id =  uuidv4();
        await queryRunner.insertOne('projectType', projectype);
        
        projectype = new ProjectType();
        projectype.name = "react";
        projectype.id =  uuidv4();
        await queryRunner.insertOne('projectType', projectype);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
