<?php

require __DIR__ . '/vendor/autoload.php';

use App\Service\EntityManagerService;
use Doctrine\Migrations\Configuration\EntityManager\ExistingEntityManager;
use Doctrine\Migrations\DependencyFactory;
use Doctrine\Migrations\Configuration\Migration\PhpFile;

return DependencyFactory::fromEntityManager(
    new PhpFile('migrations.php'), 
    new ExistingEntityManager(
        new EntityManagerService()->createEntityManager()
    ),
);