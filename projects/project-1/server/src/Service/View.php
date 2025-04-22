<?php

namespace App\Service;

use Laminas\Diactoros\Response;
use Psr\Http\Message\ResponseInterface;
use Slim\Views\Twig;

final class View implements ViewInterface 
{
    public function __construct(
        private readonly Twig $twig,
    ) {
    }

    public function render(
        string $template,
        array $data = [],
    ): ResponseInterface
    {
        return $this->twig->render(
            new Response(),
            $template,
            $data,
        );
    }
}