<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Service\EntityManagerService;

return new EntityManagerService()->createConnection();