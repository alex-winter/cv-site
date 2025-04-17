<?php

namespace App\Service;

final class Environment
{
    public function getDocumentRoot(): string 
    {
        return $_SERVER['DOCUMENT_ROOT'] . '/../';
    }

    public function getManifestPath(): string
    {
        return $this->getDocumentRoot() . '/public/dist/manifest.json';
    }

    public function getViewsDir(): string 
    {
        return $this->getDocumentRoot() . '/server/views';
    }

    public function isViewCache(): bool
    {
        return false;
    }
}