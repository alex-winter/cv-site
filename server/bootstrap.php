<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Container\Container;
use App\Routes;
use Slim\Factory\AppFactory;

$services = require_once __DIR__ . '/services.php';

$container = new Container();

$app = AppFactory::create(container: $container);

foreach ($services as $key => $service) {
    $container->set($key, $service);
}

Routes::load($app);

$app->run();