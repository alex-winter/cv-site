<?php

namespace App\Entity;

use App\Entity\Trait\CreatedAt;
use App\Entity\Trait\Id;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'articles')]
#[ORM\HasLifecycleCallbacks]
class Article
{
    use Id;
    use CreatedAt;

    public function __construct(
        string $title,
        DateTimeImmutable $createdAt,
    ) {
        $this->title = $title;
        $this->createdAt = $createdAt;
    }

    #[ORM\Column(type: 'string')]
    public string $title {
        get => $this->title;
    }
}