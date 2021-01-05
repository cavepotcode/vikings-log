<?php
namespace App\Handlers;

class ResponseHandler
{
    private static function jsonResponse($mixDatos): string
    {
        @header("Content-Type: application/json");
        $strJson = json_encode($mixDatos);
        if ($strJson === false) {
            //$json = json_encode(array("jsonError", json_last_error_msg()));
            $strJson = '{"code": "1", "msj": "fatal_error_json", "data": ""}';
            @http_response_code(500);
        }
        return $strJson;
    }
    public static function response(string $strFormat, int $intFlagError, string $strMensaje, $mixDatos)
    {
        $arrResponse = array('code'=> $intFlagError, 'msj'=>$strMensaje, 'data'=>$mixDatos);
        if ($strFormat == 'array') {
            return $arrResponse;
        }
        return self::jsonResponse($arrResponse);
    }
}
