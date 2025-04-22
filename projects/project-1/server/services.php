<?php

use App\Container\Container;
use App\RequestHandler\Article\GetArticlesRequestHandler;
use App\RequestHandler\IndexRequestHandler;
use App\Service\EntityManagerService;
use App\Service\Environment;
use App\Service\File;
use App\Service\FileInterface;
use App\Service\Repository\ArticleRepository;
use App\Service\Repository\ArticleRepositoryInterface;
use App\Service\View;
use App\Service\ViewInterface;
use Doctrine\ORM\EntityManager;
use Slim\Views\Twig;

return [

    ArticleRepositoryInterface::class => function (Container $container) {
        return new ArticleRepository(
            $container->serviceEntityManager,
        );
    },

    EntityManager::class => function (Container $container) {
        return new EntityManagerService()->createEntityManager();
    },
    
    Environment::class => function (Container $container) {
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

    GetArticlesRequestHandler::class => function (Container $container) {
        return new GetArticlesRequestHandler(
            $container->articleRepository,
        );
    },

    ViewInterface::class => function (Container $container) {
        $environment = $container->serviceEnvironment;

        return new View(
            Twig::create(
                $environment->getViewsDir(),
                [
                    'cache' => $environment->isViewCache(),
                ],
            )
        );
    },

];