<?php

namespace App\RequestHandler;

use App\Service\Environment;
use App\Service\ViewInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class IndexRequestHandler implements RequestHandlerInterface
{
    public function __construct(
        private readonly ViewInterface $view,
        private readonly Environment $environment,
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $manifestPath = $this->environment->getManifestPath();
    
        $jsSrc = '';

        if (file_exists($manifestPath)) {
            
            $manifest = json_decode(file_get_contents($manifestPath), true);

            if (isset($manifest['main.js'])) {
                $jsSrc = $manifest['main.js'];
            }
        }
    
        return $this->view->render('index.twig', [
            'jsSrc' => $jsSrc,
        ]);
    }
}