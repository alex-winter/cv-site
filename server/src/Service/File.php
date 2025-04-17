<?php

namespace App\Service;

use App\Service\FileInterface;

final class File implements FileInterface
{
    public function readJson(string $path): array
    {
        if (file_exists($path)) {
            $contents = file_get_contents($path);

            return json_decode($contents, true);
        }

        return [];
    }
}