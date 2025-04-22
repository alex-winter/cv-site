<?php

namespace App\Service\Repository;

use App\Entity\Article;
use Doctrine\ORM\EntityManager;

final class ArticleRepository 
{
    public function __construct(
        private readonly EntityManager $entityManager,
    ) {
    }

    /**
     * @return Article
     */
    public function getAll(): array
    {
        return $this->entityManager->getRepository(Article::class)->findAll();
    }
}