<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/**
 * Represents a constant within a sync API.  Create instances using
 * SyncApi::withConstant().
 */
class SyncApiConstant implements SyncApiConstantInterface
{
  private SyncApi $syncApi;

  private string $name;
  public array $value;

  public function __construct(
    SyncApi $syncApi,
    string $name,
    array $value,
  ) {
    $this->syncApi = $syncApi;
    $this->name = $name;
    $this->value = $value;
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
    array $value,
  ): SyncApiConstant {
    return $this
      ->syncApi
      ->withConstant(
        $name,
        $value,
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

  public function generateConstantRoutes(): void
  {
    Route::get(
      $this->generateKebabCasedName(),
      function () {
        $data = $this->value;

        return [
          'version' => $this->hashData($data),
          'data' => $data,
        ];
      },
    );
  }

  public function generateRoutes(): void
  {
    $this->syncApi->generateRoutes();
  }
}
