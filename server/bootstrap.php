<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;

$app = AppFactory::create();

$twig = Twig::create(__DIR__ . '/views', ['cache' => false]);
$app->add(TwigMiddleware::create($app, $twig));

$app->get('/', function (ServerRequestInterface $request, ResponseInterface $response) use ($twig) {
    $manifestPath = __DIR__ . '/../public/dist/manifest.json';

    $jsSrc = '';

    if (file_exists($manifestPath)) {
        $manifest = json_decode(file_get_contents($manifestPath), true);
        if (isset($manifest['main.js'])) {
            $jsSrc = $manifest['main.js'];
        }
    }

    return $twig->render($response, 'index.twig', [
        'jsSrc' => $jsSrc
    ]);
});

$app->run();