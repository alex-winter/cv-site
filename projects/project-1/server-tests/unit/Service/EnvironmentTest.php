<?php

namespace AppTests\Unit\Service;

use App\Service\Environment;
use Generator;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use RuntimeException;

final class EnvironmentTest extends TestCase
{
    public function testCorrectlySettingAndGettingStringEnvironmentVariables(): void
    {
        // Given - I have all values set correctly
        putenv('ENVIRONMENT_DATABASE_NAME=name');
        putenv('ENVIRONMENT_DATABASE_USER=user');
        putenv('ENVIRONMENT_DATABASE_PASSWORD=password');
        putenv('ENVIRONMENT_DATABASE_HOST=host');
        putenv('ENVIRONMENT_DATABASE_DRIVER=driver');
        putenv('ENVIRONMENT_DATABASE_CHARSET=charset');
    
        $sut = new Environment();
    
        // When - I get all of the values
        $name = $sut->getDatabaseName();
        $user = $sut->getDatabaseUser();
        $password = $sut->getDatabasePassword();
        $host = $sut->getDatabaseHost();
        $driver = $sut->getDatabaseDriver();
        $charset = $sut->getDatabaseCharset();
    
        // Then - I should get back the correct values
        $this->assertSame('name', $name);
        $this->assertSame('user', $user);
        $this->assertSame('password', $password);
        $this->assertSame('host', $host);
        $this->assertSame('driver', $driver);
        $this->assertSame('charset', $charset);
    }

    public function testUnsetAndGettingStringEnvironmentVariables(): void
    {
        // Given - One of the values is not set 
        putenv('ENVIRONMENT_DATABASE_HOST');
        
        $sut = new Environment();
    
        // Then - An exception will be thrown as follows
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("Environment variable for 'ENVIRONMENT_DATABASE_HOST' not set");

        // When - I get the value
        $sut->getDatabaseHost();
    }

    public function testEmptyAndGettingStringEnvironmentVariables(): void
    {
        // Given - One of the values is not set 
        putenv('ENVIRONMENT_DATABASE_HOST=');

        $sut = new Environment();
    
        // Then - An exception will be thrown as follows
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage("Environment variable for 'ENVIRONMENT_DATABASE_HOST' is empty");

        // When - I get the value
        $sut->getDatabaseHost();
    }

    #[DataProvider('provideBoolEnvScenarios')]
    public function testIsViewCacheNotTrue(string $value): void 
    {
        // Given - the value is in a none true state
        putenv('ENVIRONMENT_IS_VIEW_CACHE=' . $value);

        // When - I ask what the value is
        $sut = new Environment();
        $is = $sut->isViewCache();

        // Then - Because none of the values are exactly "true" all are false
        $this->assertFalse($is);
    }

    public static function provideBoolEnvScenarios(): Generator
    {
        yield 'false' => ['false'];

        yield 'random value' => ['blah blah'];

        yield 'contains true but not true' => ['true please'];
    }

    protected function setUp(): void
    {
        $this->clearEnvironmentVariables();
    }

    private function clearEnvironmentVariables(string $prefix = 'ENVIRONMENT_'): void
    {
        foreach (getenv() as $key => $value) {
            if (str_starts_with($key, $prefix)) {
                putenv($key); // Unset
            }
        }
    }
}