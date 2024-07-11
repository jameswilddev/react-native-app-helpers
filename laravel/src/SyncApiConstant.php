<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

/**
 * Represents a constant within a sync API.  Create instances using
 * SyncApi::withConstant().
 */
class SyncApiConstant implements SyncApiConstantInterface
{
  private SyncApi $syncApi;

  private string $name;
  public $valueFactory;

  public function __construct(
    SyncApi $syncApi,
    string $name,
    callable $valueFactory,
  ) {
    $this->syncApi = $syncApi;
    $this->name = $name;
    $this->valueFactory = $valueFactory;
  }

  function withMe(
    string $modelClass,
    string $resourceClass,
  ): SyncApiMe {
    return $this
      ->syncApi
      ->withMe(
        $modelClass,
        $resourceClass,
      );
  }

  function withEnum(
    string $enumClass,
    string $resourceClass,
  ): SyncApiEnum {
    return $this
      ->syncApi
      ->withEnum(
        $enumClass,
        $resourceClass,
      );
  }

  function withConstant(
    string $name,
    callable $valueFactory,
  ): SyncApiConstant {
    return $this
      ->syncApi
      ->withConstant(
        $name,
        $valueFactory,
      );
  }

  function withCollection(
    string $modelClass,
    string $scopeName,
    ?string $resourceClass = null,
    ?string $controllerClass = null,
    ?string $routeFragment = null,
  ): SyncApiCollection {
    return $this
      ->syncApi
      ->withCollection(
        $modelClass,
        $scopeName,
        $resourceClass,
        $controllerClass,
        $routeFragment,
      );
  }

  public function generateCamelCasedName(): string
  {
    return Str::camel($this->name);
  }

  public function generateKebabCasedName(): string
  {
    return Str::kebab($this->name);
  }

  public function hashData(array $data): string
  {
    ksort($data);

    return hash('sha1', json_encode($data));
  }

  public function getCachedValue()
  {
    return Cache::remember(
      'sync-api-constant-' . $this->generateKebabCasedName(),
      3600,
      function () {
        $data = ($this->valueFactory)();

        return [
          'data' => $data,
          'version' => hash('sha1', json_encode($data)),
        ];
      }
    );
  }

  public function generateConstantRoutes(): void
  {
    Route::get(
      $this->generateKebabCasedName(),
      function () {
        return $this->getCachedValue();
      },
    );
  }

  public function generateRoutes(): void
  {
    $this->syncApi->generateRoutes();
  }
}
