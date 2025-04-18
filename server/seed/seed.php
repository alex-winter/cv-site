<?php

use App\Service\EntityManagerService;
use App\Service\File;

require_once __DIR__ . '/../../vendor/autoload.php';

$entityManager = new EntityManagerService()->createEntityManager();

$sql = new File()->read(__DIR__ . '/articles.sql');

$entityManager->getConnection()->executeStatement($sql);