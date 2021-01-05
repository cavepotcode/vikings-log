<?php

namespace App\Controllers;

use App\Helpers\Constants as Constant;
use App\Helpers\LogHelper;
use App\Models\Log;
use App\Models\LogException;

class MainController
{

    private $logHelper;

    public function __construct(LogHelper $logHelper)
    {
        $this->logHelper = $logHelper;
    }

    public function info($request, $response)
    {
        $text = "important information";


        $body =  new Log();
        $body->message = "register info";
        $body->type = "php";
        $body->info = (object) "ImportantInfo = {$text}";
        $body->exception = new LogException();

        $response->getBody()->write($this->logHelper->callLog(Constant::info, $body));
        return $response;
    }

    public function warning($request, $response)
    {
        $text = "important warning";


        $body =  new Log();
        $body->message = "register warning";
       
        $body->info = (object) "ImportantInfo = {$text}";
        $body->exception = new LogException();

        $response->getBody()->write($this->logHelper->callLog(Constant::warning, $body));

        return $response;
    }

    public function error($request, $response)
    {
        $text = "important information: unhandled exception";


        $body =  new Log();
        
        $body->message = "unhandled error";
        $body->type = "php";
        $body->info = (object) "ImportantInfo = {$text}";

        $body->exception = new LogException();
        $body->exception->code = 500;
        $body->exception->message = "String or binary data would be truncated. The statement has been terminated.";
        $body->exception->stack = "at System.Data.SqlClient.SqlConnection.OnError(SqlException exception, Boolean breakConnection, Action`1 wrapCloseInAction) at System.Data.SqlClient.SqlInternalConnection.OnError(SqlException exception, Boolean breakConnection, Action`1 wrapCloseInAction) at System.Data.SqlClient.TdsParser.ThrowExceptionAndWarning(TdsParserStateObject stateObj, Boolean callerHasConnectionLock, Boolean asyncClose) at System.Data.SqlClient.TdsParser.TryRun(RunBehavior runBehavior, SqlCommand cmdHandler, SqlDataReader dataStream, BulkCopySimpleResultSet bulkCopyHandler, TdsParserStateObject stateObj, Boolean& dataReady) at System.Data.SqlClient.SqlDataReader.TryConsumeMetaData() at System.Data.SqlClient.SqlDataReader.get_MetaData() at System.Data.SqlClient.SqlCommand.FinishExecuteReader(SqlDataReader ds, RunBehavior runBehavior, String resetOptionsString) at System.Data.SqlClient.SqlCommand.RunExecuteReaderTds(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, Boolean async, Int32 timeout, Task& task, Boolean asyncWrite, SqlDataReader ds) at System.Data.SqlClient.SqlCommand.RunExecuteReader(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, TaskCompletionSource`1 completion, Int32 timeout, Task& task, Boolean asyncWrite, String method) at System.Data.SqlClient.SqlCommand.ExecuteReader(CommandBehavior behavior) at System.Data.SqlClient.SqlCommand.ExecuteReader() at eClinicas.AccesoDatos.AtencionesAccesoDatos.CrearAtencion(AtencionDataInfo data, CacheUsuario cacheUsuario) in C:\CavePot\eClinica\api\eClinicas.AccesoDatos\AtencionesAccesoDatos.cs:line 498 at eClinicas.Negocio.Negocio.AtencionesNegocio.CrearAtencion(AtencionDataInfo data, CacheUsuario cacheUsuario) in C:\CavePot\eClinica\api\eClinicas.Negocio\Negocio\AtencionesNegocio.cs:line 923 at eClinicas.API.Controllers.AtencionesController.CrearAtencion(AtencionDataInfo request) in C:\CavePot\eClinica\api\eClinicasAPI\Controllers\AtencionesController.cs:line 114";


        $response->getBody()->write($this->logHelper->callLog(Constant::error, $body));
        return $response;
    }
}
