<?php
namespace App\Helpers;

class LoggerHelper
{
    private static $objLogger = null;

    public function init()
    {
        try {
            if (!empty(self::$objLogger) && self::$objLogger instanceof \Monolog\Logger) {
                return self::$objLogger;
            }
            // load setting
            $arrSettings = require __DIR__ . '/../settings.php'; // never require_once

            if (!isset($arrSettings['settings'])) {
                return false;
            } elseif (!isset($arrSettings['settings']['logger'])) {
                return false;
            } elseif (!isset($arrSettings['settings']['logger']['path'])) {
                return false;
            } elseif (!isset($arrSettings['settings']['logger']['level'])) {
                return false;
            }
            $strLoggerName = $arrSettings['settings']['logger']['name'];
            $strLoggerPath = $arrSettings['settings']['logger']['path'];
            $strLoggerLevel = $arrSettings['settings']['logger']['level'];
            $strLoggerTokenLoggly = '';
            if (isset($arrSettings['settings']['logger']['token_loggly'])) {
                $strLoggerTokenLoggly = $arrSettings['settings']['logger']['token_loggly'];
            }
            unset($arrSettings);

            self::$objLogger = new \Monolog\Logger($strLoggerName);
            // $logger->setFormatter(new LogglyFormatter());
            // Agrega informacion extra par el debug
            self::$objLogger->pushProcessor(new \Monolog\Processor\UidProcessor());
            // Log en Archivo
            self::$objLogger->pushHandler(new \Monolog\Handler\StreamHandler($strLoggerPath, $strLoggerLevel));
            // Log en loggly.com
            if (!empty($strLoggerTokenLoggly)) {
                self::$objLogger->pushHandler(new \Monolog\Handler\LogglyHandler($strLoggerTokenLoggly, $strLoggerLevel));
            }
            return self::$objLogger;
        } catch (\Exception $e) {
            return false;
        }
        return false;
    }
}
