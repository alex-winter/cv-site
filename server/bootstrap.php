<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Container\Container;
use App\Entity\Article;
use App\RequestHandler\IndexRequestHandler;
use Laminas\Diactoros\Response\JsonResponse;
use Slim\Factory\AppFactory;

$container = new Container();

$app = AppFactory::create(container: $container);

$services = require_once __DIR__ . '/services.php';

foreach ($services as $key => $service) {
    $container->set($key, $service);
}

$app->get('/', IndexRequestHandler::class);

$app->get('/article/{uuid}', function () {});
$app->post('/article/{uuid}', function () {});
$app->patch('/article/{uuid}', function () {});
$app->delete('/article/{uuid}', function () {});

$app->get('/articles', function () use ($container) {
    $data = $container->serviceEntityManager->getRepository(Article::class)->findAll();

    return new JsonResponse([
        'data' => $data,
    ]);
});

$app->run();