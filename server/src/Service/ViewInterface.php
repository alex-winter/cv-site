<?php

namespace App\Service;

use Psr\Http\Message\ResponseInterface;

interface ViewInterface
{
    public function render(string $template, array $data): ResponseInterface;
}