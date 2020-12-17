import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Project, Log } from "../entities";
import { LevelsCode } from "../../sdk/constants";

export class createLogs1596571671005 implements MigrationInterface {

    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const result_proj = await queryRunner.connection.getMongoRepository(Project).findOne({name: 'test'});
        console.log(result_proj);
        let log = new Log();
        log.project = result_proj.id;
        log.date = new Date();
        log.level = LevelsCode.ERROR;
        log.message = 'Broke everything';
        // log.stackTrace = `ConsoleApplication1.MyCustomException: some message .... ---> System.Exception: Oh noes!
        //                     at ConsoleApplication1.SomeObject.OtherMethod() in C:\ConsoleApplication1\SomeObject.cs:line 24
        //                     at ConsoleApplication1.SomeObject..ctor() in C:\ConsoleApplication1\SomeObject.cs:line 14
        //                     --- End of inner exception stack trace ---
        //                     at ConsoleApplication1.SomeObject..ctor() in C:\ConsoleApplication1\SomeObject.cs:line 18
        //                     at ConsoleApplication1.Program.DoSomething() in C:\ConsoleApplication1\Program.cs:line 23
        //                     at ConsoleApplication1.Program.Main(String[] args) in C:\ConsoleApplication1\Program.cs:line 13`

        
        await queryRunner.insertOne('logs', log);
        
        log = new Log();
        log.date = new Date();
        log.project = result_proj.id;
        log.level = LevelsCode.INFO;
        log.message = 'Ok';
        await queryRunner.insertOne('logs', log);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
