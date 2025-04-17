<?php

namespace App;

use Closure;
use Pimple\Container as PimpleContainer;
use Psr\Container\ContainerInterface;

final class Container implements ContainerInterface
{
    function __construct(
        private readonly \ArrayAccess $arrayAccessContainer = new PimpleContainer(),
    ) {
    }

    public function get(string $id): mixed
    {
        return $this->arrayAccessContainer[$id];
    }

    public function has(string $id): bool
    {
        return isset($this->arrayAccessContainer[$id]);
    }

    public function set(string $id, Closure $callback): void
    {
        $this->arrayAccessContainer[$id] = function () use ($callback) {
            return $callback($this);
        };
    }
}