<?php

$container = $app->getContainer();

$container->set('LogHelper', function(){
    $obj = new \App\Helpers\LogHelper();
    return $obj;
});



