<?php

namespace App\Helpers;

class LogHelper
{
    function callLog($endpoint, $body)
    {
        $settingsJson = json_decode(file_get_contents(ROOT . 'src' . DS . 'Configs' . DS . 'appSettings.json'));
        $body->type = $settingsJson->logs->type;
        $url = $settingsJson->logs->logurl . $endpoint;
        $payload = json_encode($body);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type:application/json',
            'apikey:' . $settingsJson->logs->apiKey
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }
}
