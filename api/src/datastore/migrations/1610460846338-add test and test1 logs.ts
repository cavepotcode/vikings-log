import { info } from "console";
import { constants } from "os";
import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Exception } from "../../models/log.models";
import { LevelsCode } from "../../sdk/constants";
import { Log, Project } from "../entities";

export class addTestAndTest1Logs1610460846338 implements MigrationInterface {
    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const info = {
            request: {
                e: "bWFyY29zaXNlZkBob3RtYWlsLmNvbQ==",
                p: "dGVzdDEyMzQ="
            },
            response: {
                status: "error",
                data: null,
                message: "Error xyz has occurred"
            },
            url: "/loginTipoUsuario",
            http_code: 500
        }
        const exception: Exception = {
            code : 500,
            message: "La consulta con parámetros '(@IdPersona nvarchar(36),@TipoDocumento int,@Documento nvarchar(' espera el parámetro '@Nombres', que no se ha proporcionado.",
            stack : "en System.Data.SqlClient.SqlConnection.OnError(SqlException exception, Boolean breakConnection, Action`1 wrapCloseInAction) en System.Data.SqlClient.SqlInternalConnection.OnError(SqlException exception, Boolean breakConnection, Action`1 wrapCloseInAction) en System.Data.SqlClient.TdsParser.ThrowExceptionAndWarning(TdsParserStateObject stateObj, Boolean callerHasConnectionLock, Boolean asyncClose) en System.Data.SqlClient.TdsParser.TryRun(RunBehavior runBehavior, SqlCommand cmdHandler, SqlDataReader dataStream, BulkCopySimpleResultSet bulkCopyHandler, TdsParserStateObject stateObj, Boolean& dataReady) en System.Data.SqlClient.SqlCommand.FinishExecuteReader(SqlDataReader ds, RunBehavior runBehavior, String resetOptionsString) en System.Data.SqlClient.SqlCommand.RunExecuteReaderTds(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, Boolean async, Int32 timeout, Task& task, Boolean asyncWrite, SqlDataReader ds, Boolean describeParameterEncryptionRequest) en System.Data.SqlClient.SqlCommand.RunExecuteReader(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, String method, TaskCompletionSource`1 completion, Int32 timeout, Task& task, Boolean asyncWrite) en System.Data.SqlClient.SqlCommand.InternalExecuteNonQuery(TaskCompletionSource`1 completion, String methodName, Boolean sendToPipe, Int32 timeout"
        }
        
        const result_proj = await queryRunner.connection.getMongoRepository(Project).findOne({name: 'test'});

        let log = new Log();
        log.date = new Date();
        log.level = LevelsCode.ERROR;
        log.type ='asp'
        log.message = "string or binary data would be truncated. The statement has been terminated."
        log.project = result_proj.id;
        log.info = info;
        log.exception = exception;
        log.status = 'active'

        await queryRunner.insertOne('logs', log);

        log = new Log();
        log.date = new Date();
        log.level = LevelsCode.INFO;
        log.type ='asp'
        log.message = "info message"
        log.project = result_proj.id;
        log.info = {message: "dummy message text"};
        log.exception = {};
        log.status = 'active'

        await queryRunner.insertOne('logs', log);

        log = new Log();
        log.date = new Date();
        log.level = LevelsCode.WARNING;
        log.type ='asp'
        log.message = "warning message"
        log.project = result_proj.id;
        log.info = {message: "dummy message text"};
        log.exception = {};
        log.status = 'active'

        await queryRunner.insertOne('logs', log);

        const result_proj_test2 = await queryRunner.connection.getMongoRepository(Project).findOne({name: 'test2'});

        log = new Log();
        log.date = new Date();
        log.level = LevelsCode.ERROR;
        log.type ='php'
        log.message = "string or binary data would be truncated. The statement has been terminated."
        log.project = result_proj_test2.id;
        log.info = info;
        log.exception = exception;
        log.status = 'active'

        await queryRunner.insertOne('logs', log);

        log = new Log();
        log.date = new Date();
        log.level = LevelsCode.INFO;
        log.message = "info message"
        log.type ='php'
        log.project = result_proj_test2.id;
        log.info = {message: "dummy message text"};
        log.exception = {};
        log.status = 'active'

        await queryRunner.insertOne('logs', log);

        log = new Log();
        log.date = new Date();
        log.level = LevelsCode.WARNING;
        log.type ='php'
        log.message = "warning message"
        log.project = result_proj_test2.id;
        log.info = {message: "dummy message text"};
        log.exception = {};
        log.status = 'active'

        await queryRunner.insertOne('logs', log);

    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
