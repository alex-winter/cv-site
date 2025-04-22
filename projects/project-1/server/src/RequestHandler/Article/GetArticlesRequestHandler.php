<?php

namespace App\RequestHandler\Article;

use App\Service\Repository\ArticleRepository;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class GetArticlesRequestHandler implements RequestHandlerInterface
{
    public function __construct(
        private readonly ArticleRepository $articleRepository,
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        return new JsonResponse([
            'data' => $this->articleRepository->getAll(),
        ]);
    }
}