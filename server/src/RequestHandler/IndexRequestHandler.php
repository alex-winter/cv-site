<?php

namespace App\RequestHandler;

use App\Service\Environment;
use App\Service\FileInterface;
use App\Service\ViewInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class IndexRequestHandler implements RequestHandlerInterface
{
    public function __construct(
        private readonly ViewInterface $view,
        private readonly Environment $environment,
        private readonly FileInterface $file,
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $manifestPath = $this->environment->getManifestPath();
    
        $jsSrc = '';

        $manifest = $this->file->readJson($manifestPath);

        if (isset($manifest['main.js'])) {
            $jsSrc = $manifest['main.js'];
        }
    
        return $this->view->render('index.twig', [
            'jsSrc' => $jsSrc,
        ]);
    }
}