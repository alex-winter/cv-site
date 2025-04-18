<?php

namespace AppTests\Unit\Service;

use App\Service\File;
use PHPUnit\Framework\TestCase;

/**
 * @covers File
 */
final class FileTest extends TestCase
{
    public function testCanReadJson(): void 
    {
        $sut = new File();

        $data = $sut->readJson(__DIR__ . '/test-file-service.json');

        $this->assertEquals(
            [
                "test" => [1, 2, 3],
            ],
            $data,
        );
    }

    public function testFileDoesNotExist(): void
    {
        $sut = new File();

        $data = $sut->readJson(__DIR__ . '/does-not-exist.json');

        $this->assertEmpty($data);
    }
}