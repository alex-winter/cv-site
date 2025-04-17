<?php

namespace App;

use App\RequestHandler\IndexRequestHandler;
use App\Service\Environment;
use App\Service\ViewInterface;
use Closure;
use Pimple\Container as PimpleContainer;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class Container implements ContainerInterface
{
    public Environment $serviceEnvironment {
        get => $this->get(Environment::class);
    }

    public ViewInterface $serviceView {
        get => $this->get(ViewInterface::class);
    }

    public Closure $requestHandlerIndex {
        get => $this->getRequestHandler(IndexRequestHandler::class);
    }

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

    public function getRequestHandler(string $id): Closure 
    {
        return function (ServerRequestInterface $request) use ($id) : ResponseInterface {
            return $this->get($id)->handle($request);
        };
    }
}