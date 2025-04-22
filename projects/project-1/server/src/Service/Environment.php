<?php

namespace App\Service;

use Composer\Factory;
use RuntimeException;

final class Environment
{
    public function getDocumentRoot(): string 
    {
        return __DIR__ . '/../../../';
    }

    public function getManifestPath(): string
    {
        return $this->getDocumentRoot() . '/public/dist/manifest.json';
    }

    public function getViewsDir(): string 
    {
        return $this->getDocumentRoot() . '/server/views';
    }

    public function getEntitiesDir(): string 
    {
        return $this->getDocumentRoot() . '/server/src/Entity';
    }

    public function isViewCache(): bool
    {
        $value = $this->getEnv('ENVIRONMENT_IS_VIEW_CACHE');

        return $value === 'true';
    }

    public function isDevelopment(): bool 
    {
        return $this->getEnv('ENVIRONMENT_NAME') === 'development';
    }

    public function getDatabaseName(): string
    {
        return $this->getEnv('ENVIRONMENT_DATABASE_NAME');
    }

    public function getDatabaseUser(): string 
    {
        return $this->getEnv('ENVIRONMENT_DATABASE_USER');
    }

    public function getDatabasePassword(): string 
    {
        return $this->getEnv('ENVIRONMENT_DATABASE_PASSWORD');
    }

    public function getDatabaseHost(): string 
    {
        return $this->getEnv('ENVIRONMENT_DATABASE_HOST');
    }
    
    public function getDatabaseDriver(): string 
    {
        return $this->getEnv('ENVIRONMENT_DATABASE_DRIVER');
    }

    public function getDatabaseCharset(): string 
    {
        return $this->getEnv('ENVIRONMENT_DATABASE_CHARSET');
    }

    private function getEnv(string $key): string 
    {
        /**
         * @var string|false $value given a key it can only return a string or false
         */
        $value = getenv($key);

        if ($value === false) {
            throw new RuntimeException("Environment variable for '" . $key . "' not set");
        }

        if (empty(trim($value))) {
            throw new RuntimeException("Environment variable for '" . $key . "' is empty");
        }

        return $value;
    }
}