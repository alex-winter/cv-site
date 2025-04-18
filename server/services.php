<?php

use App\Container\Container;
use App\RequestHandler\IndexRequestHandler;
use App\Service\EntityManagerService;
use App\Service\Environment;
use App\Service\File;
use App\Service\FileInterface;
use App\Service\View;
use App\Service\ViewInterface;
use Doctrine\ORM\EntityManager;
use Slim\Views\Twig;

return [

    EntityManager::class => function (Container $container) {
        return new EntityManagerService()->createEntityManager();
    },
    
    Environment::class => function () {
        return new Environment();
    },

    FileInterface::class => function (Container $container) {
        return new File();
    },

    IndexRequestHandler::class => function (Container $container) {
        return new IndexRequestHandler(
            $container->serviceView,
            $container->serviceEnvironment,
            $container->serviceFile,
        );
    },

    ViewInterface::class => function (Container $container) {
        $environment = $container->serviceEnvironment;

        return new View(
            Twig::create(
                $environment->getViewsDir(),
                [
                    'cache' => $environment->isViewCache(),
                ]
            )
        );
    },

];