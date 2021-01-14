const logs = require('../helpers/logs');

exports.info = async function (req,res) {

    let data = {
        message : 'info from node',
        type :'nodejs',
        info : {
            message: "Important message"
        },
        exception : {
            code : '',
            message : '',
            stack : ''
        }
    }
    let response = await logs.registerlog(data,'info');
    res.statusCode = 200;
    res.setHeader('contant-Type','Application/json');
    res.end(response);
}

exports.warning = async function (req,res) {
    let data = {
        message : 'warning from node',
        type :'nodejs',
        info : {
            message: "Important warning"
        },
        exception : {
            code : '',
            message : '',
            stack : ''
        }
    }
    let response = await logs.registerlog(data,'warning');
    res.statusCode = 200;
    res.setHeader('contant-Type','Application/json');
    res.end(response);
}

exports.error = async function (req,res) {
    let data = {
        message : 'unhandled nodejs error',
        type :'nodejs',
        info : {
            message: "important information: unhandled exception"
        },
        exception : {
            code : '500',
            message : 'String or binary data would be truncated. The statement has been terminated.',
            stack : 'at System.Data.SqlClient.SqlConnection.OnError(SqlException exception, Boolean breakConnection, Action`1 wrapCloseInAction) at System.Data.SqlClient.SqlInternalConnection.OnError(SqlException exception, Boolean breakConnection, Action`1 wrapCloseInAction) at System.Data.SqlClient.TdsParser.ThrowExceptionAndWarning(TdsParserStateObject stateObj, Boolean callerHasConnectionLock, Boolean asyncClose) at System.Data.SqlClient.TdsParser.TryRun(RunBehavior runBehavior, SqlCommand cmdHandler, SqlDataReader dataStream, BulkCopySimpleResultSet bulkCopyHandler, TdsParserStateObject stateObj, Boolean& dataReady) at System.Data.SqlClient.SqlDataReader.TryConsumeMetaData() at System.Data.SqlClient.SqlDataReader.get_MetaData() at System.Data.SqlClient.SqlCommand.FinishExecuteReader(SqlDataReader ds, RunBehavior runBehavior, String resetOptionsString) at System.Data.SqlClient.SqlCommand.RunExecuteReaderTds(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, Boolean async, Int32 timeout, Task& task, Boolean asyncWrite, SqlDataReader ds) at System.Data.SqlClient.SqlCommand.RunExecuteReader(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, TaskCompletionSource`1 completion, Int32 timeout, Task& task, Boolean asyncWrite, String method) at System.Data.SqlClient.SqlCommand.ExecuteReader(CommandBehavior behavior) at System.Data.SqlClient.SqlCommand.ExecuteReader() at eClinicas.AccesoDatos.AtencionesAccesoDatos.CrearAtencion(AtencionDataInfo data, CacheUsuario cacheUsuario) in C:\CavePot\eClinica\api\eClinicas.AccesoDatos\AtencionesAccesoDatos.cs:line 498 at eClinicas.Negocio.Negocio.AtencionesNegocio.CrearAtencion(AtencionDataInfo data, CacheUsuario cacheUsuario) in C:\CavePot\eClinica\api\eClinicas.Negocio\Negocio\AtencionesNegocio.cs:line 923 at eClinicas.API.Controllers.AtencionesController.CrearAtencion(AtencionDataInfo request) in C:\CavePot\eClinica\api\eClinicasAPI\Controllers\AtencionesController.cs:line 114'
        }
    }
    let response = await logs.registerlog(data,'error');
    res.statusCode = 200;
    res.setHeader('contant-Type','Application/json');
    res.end(response);
}
