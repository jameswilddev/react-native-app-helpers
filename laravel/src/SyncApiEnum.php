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

  function withCollection(
    string $modelClass,
    string $scopeName,
    ?string $resourceClass,
    ?string $controllerClass,
  ): SyncApiCollection {
    return $this
      ->syncApi
      ->withCollection(
        $modelClass,
        $scopeName,
        $resourceClass,
        $controllerClass,
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
