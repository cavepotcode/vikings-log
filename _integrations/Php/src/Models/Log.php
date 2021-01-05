<?php

namespace App\Models;

class Log
{
    public $message;
    public $type;
    public $exception;
    public $info;
}

class LogException
{
    public $code;
    public $message;
    public $stack;
}
