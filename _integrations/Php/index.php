<?php
define('DS', DIRECTORY_SEPARATOR);
define('ROOT', realpath(dirname(__FILE__)).DS);

use Slim\Factory\AppFactory;
use DI\Container;

require __DIR__ .'/vendor/autoload.php';

// Create Container using PHP-DI
$container = new Container();
// Set container to create App with on AppFactory
AppFactory::setContainer($container);
$app = AppFactory::create();

// $container->set('LogHelper', function(\Psr\Container\ContainerInterface $container){
//     $obj = new \App\Helpers\LogHelper();
//     return $obj;
// });



require_once __DIR__ . '/src/Handlers/ErrorHandler.php';
// TODO::Error?
// set_error_handler('funcErrorHandler');
// set_exception_handler('funcExceptionHandler');

require_once __DIR__ . '/src/Routers/Routers.php';
require_once __DIR__ . '/src/Container/Containers.php';

$app->run();