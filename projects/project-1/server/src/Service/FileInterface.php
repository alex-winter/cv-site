<?php

namespace App\Service;

interface FileInterface
{
    public function readJson(string $path);
}