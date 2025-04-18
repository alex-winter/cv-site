<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Container;
use App\RequestHandler\IndexRequestHandler;
use App\Service\Environment;
use App\Service\File;
use App\Service\FileInterface;
use App\Service\View;
use App\Service\ViewInterface;
use Doctrine\ORM\EntityManager;
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
    $config = require_once __DIR__ . '/config.php';
            
    $paths = [__DIR__.'/../src/Entity'];
    
    $isDevMode = true;

    $ORMConfig = ORMSetup::createAttributeMetadataConfiguration($paths, $isDevMode);

    $ORMConfig->setNamingStrategy(new UnderscoreNamingStrategy());

    $connection = DriverManager::getConnection($config['database']);

    return new EntityManager($connection, $ORMConfig);
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

$app->get('/articles', function () {});

$app->run();