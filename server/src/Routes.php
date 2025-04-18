<?php

namespace App;

use App\Entity\Article;
use App\RequestHandler\IndexRequestHandler;
use Laminas\Diactoros\Response\JsonResponse;
use Slim\App;

final class Routes 
{
    public static function load(App $app): void 
    {
        $container = $app->getContainer();

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
    }
}

