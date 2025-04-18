<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Container\Container;
use App\Entity\Article;
use App\RequestHandler\IndexRequestHandler;
use App\Service\EntityManagerService;
use App\Service\Environment;
use App\Service\File;
use App\Service\FileInterface;
use App\Service\View;
use App\Service\ViewInterface;
use Doctrine\ORM\EntityManager;
use Laminas\Diactoros\Response\JsonResponse;
use Slim\Factory\AppFactory;
use Slim\Views\Twig;

$container = new Container();

$app = AppFactory::create(container: $container);

$container->set(Environment::class, function () {
    return new Environment();
});

$container->set(FileInterface::class, function (Container $container) {
    return new File();
});

$container->set(EntityManager::class, function (Container $container) {
    return new EntityManagerService()->createEntityManager();
});

$container->set(ViewInterface::class, function (Container $container) {
    $environment = $container->serviceEnvironment;

    return new View(
        Twig::create(
            $environment->getViewsDir(), 
            [
                'cache' => $environment->isViewCache(),
            ],
        )
    );
});

$container->set(IndexRequestHandler::class, function (Container $container) {
    return new IndexRequestHandler(
        $container->serviceView,
        $container->serviceEnvironment,
        $container->serviceFile,
    );
});

$app->get('/', $container->requestHandlerIndex);

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