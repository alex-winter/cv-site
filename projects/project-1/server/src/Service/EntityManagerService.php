<?php

namespace App\Service;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\UnderscoreNamingStrategy;
use Doctrine\ORM\ORMSetup;

final class EntityManagerService 
{
    public function __construct(private readonly Environment $env = new Environment())
    {
    }

    public function createConnection(): Connection 
    {
        return DriverManager::getConnection([
            'dbname' => $this->env->getDatabaseName(),
            'user' => $this->env->getDatabaseUser(),
            'password' => $this->env->getDatabasePassword(),
            'host' => $this->env->getDatabaseHost(),
            'driver' => $this->env->getDatabaseDriver(),
            'charset' => $this->env->getDatabaseCharset(),
        ]);
    }

    public function createEntityManager(): EntityManagerInterface
    {
        $ORMConfig = ORMSetup::createAttributeMetadataConfiguration(
            [$this->env->getEntitiesDir()],
            $this->env->isDevelopment(),
        );

        $ORMConfig->setNamingStrategy(new UnderscoreNamingStrategy());

        return new EntityManager(
            $this->createConnection(), 
            $ORMConfig,
        );
    }
}