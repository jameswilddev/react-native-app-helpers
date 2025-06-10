<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/**
 * Represents an enum within a sync API.  Create instances using
 * SyncApi::withEnum().
 */
class SyncApiEnum implements SyncApiEnumInterface
{
  private SyncApi $syncApi;

  private string $enumClass;

  private string $resourceClass;

  public function __construct(
    SyncApi $syncApi,
    string $enumClass,
    string $resourceClass,
  ) {
    $this->syncApi = $syncApi;
    $this->enumClass = $enumClass;
    $this->resourceClass = $resourceClass;
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
    return Str::camel(Str::pluralStudly(class_basename($this->enumClass)));
  }

  public function generateKebabCasedName(): string
  {
    return Str::kebab(Str::pluralStudly(class_basename($this->enumClass)));
  }

  public function generateData(): array
  {
    return array_combine(
      $this->enumClass::getValues(),
      array_map(
        fn ($instance) => new $this->resourceClass($instance),
        $this->enumClass::getInstances()
      )
    );
  }

  public function hashData(array $data): string
  {
    ksort($data);

    return hash('sha1', json_encode($data));
  }

  public function generateEnumRoutes(): void
  {
    Route::get(
      $this->generateKebabCasedName(),
      function () {
        $data = $this->generateData();

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
