<?php

namespace App;

use App\Entity\Article;
use App\RequestHandler\Article\GetArticlesRequestHandler;
use App\RequestHandler\IndexRequestHandler;
use Laminas\Diactoros\Response;
use Laminas\Diactoros\Response\JsonResponse;
use Slim\App;

final class Routes 
{
    public static function load(App $app): void 
    {
        $container = $app->getContainer();

        $app->get('/', IndexRequestHandler::class);

        $app->get('/start-project', function () {
            // Kill any buffering
            while (ob_get_level()) ob_end_flush();
            ob_implicit_flush(true);

            // Set headers
            header('Content-Type: text/plain');
            header('Cache-Control: no-cache');
            header('X-Accel-Buffering: no');
            echo "Starting build...\n";
            flush();

            // Command to run
            $cmd = 'cd ../ && bash ./start.sh 2>&1';
            $process = popen($cmd, 'r');

            if (!$process) {
                echo "Failed to open process.\n";
                flush();
                return;
            }

            // Stream output
            while (!feof($process)) {
                echo fread($process, 4096);
                flush();
            }

            pclose($process);
            echo "\nDone.";

            return new Response();
        });

        $app->get('/article/{uuid}', function () {});
        $app->post('/article/{uuid}', function () {});
        $app->patch('/article/{uuid}', function () {});
        $app->delete('/article/{uuid}', function () {});

        $app->get('/articles', GetArticlesRequestHandler::class);
    }
}

