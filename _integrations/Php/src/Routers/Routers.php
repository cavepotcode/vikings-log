<?php
declare(strict_types=1);


use App\Controllers\MainController;


$app->post('/main/info', MainController::class . ':info');
$app->post('/main/warning', MainController::class . ':warning');
$app->post('/main/error', MainController::class . ':error');

