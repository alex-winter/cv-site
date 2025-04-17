<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Container;
use App\RequestHandler\IndexRequestHandler;
use App\Service\Environment;
use App\Service\View;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Factory\AppFactory;
use Slim\Views\Twig;

$container = new Container();

$app = AppFactory::create(container: $container);

$container->set('service-environment', fn () => new Environment());

$container->set('service-view', function (Container $container) {
    $environment = $container->get('service-environment');

    return new View(
        Twig::create(
            $environment->getViewsDir(), 
            ['cache' => $environment->isViewCache()],
        )
    );
});

$container->set('request-handler-index', fn () => new IndexRequestHandler(
    $container->get('service-view'),
    $container->get('service-environment'),
));

$app->get('/', function (ServerRequestInterface $request) use ($container) {
    $handler = $container->get('request-handler-index');

    return $handler->handle($request);
});


$app->get('/article/{uuid}', function () {});
$app->post('/article/{uuid}', function () {});
$app->patch('/article/{uuid}', function () {});
$app->delete('/article/{uuid}', function () {});

$app->get('/articles', function () {});

$app->run();