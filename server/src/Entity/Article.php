<?php

namespace App\Entity;

use App\Entity\Trait\Id;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'articles')]
#[ORM\HasLifecycleCallbacks]
class Article
{
    use Id;

    public function __construct(
        string $title,
    )
    {
        $this->title = $title;
    }

    #[ORM\Column(type: 'string')]
    public string $title {
        get => $this->title;
    }
}