<?php

function getLogger()
{
    try {
        $objLoggerHelper = new App\Helpers\LoggerHelper;
        $objLogger = $objLoggerHelper->init();
        return $objLogger;
    } catch (\Exception $e) {
        return false;
    }
}

function funExceptionHandler($objException): void
{
    $settingsJson = json_decode(file_get_contents(ROOT . 'src' . DS . 'Configs' . DS . 'appSettings.json'));


    $strJsonResponse = App\Handlers\ResponseHandler::response('json', 1, 'error_exception', null);
    @http_response_code(500);
    // json ajax response
    echo $strJsonResponse;

    // Registro de logs
    @ob_start();

    if (method_exists($objException, 'getMessage')) {
        $strMessage = $objException->getMessage();
    }
    if (method_exists($objException, 'getFile')) {
        $strFile = $objException->getFile();
    }
    if (method_exists($objException, 'getLine')) {
        $strLine = $objException->getLine();
    }
    if (method_exists($objException, 'getCode')) {
        $strCode = $objException->getCode();
    }

    $arrError = array(
        'strCode' => $strCode,
        'strMessage' => $strMessage,
        'strFile' => $strFile,
        'strLine' => $strLine,
    );

    $data = array(
        "message" => $strMessage,
        "type" => $settingsJson->logs->type,
        "exception" => array(
            "code" => $strCode,
            "message" => $strMessage,
            "stack" => $strFile . " line " . $strLine,
        )
    );

    $url = $settingsJson->logs->url . 'error';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    // curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type:application/json',
        'apikey:' . $settingsJson->logs->apiKey
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch);
    curl_close($ch);
    $objLogger = getLogger();
    if (!empty($objLogger)) {
        $objLogger->error('error_exception', $arrError);
    }

    @ob_end_clean();
    exit(1);
}
