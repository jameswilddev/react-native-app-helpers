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

  public array $value;

  public function __construct(
    SyncApi $syncApi,
    array $value,
  ) {
    $this->syncApi = $syncApi;
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
    array $value,
  ): SyncApiConstant {
    return $this
      ->syncApi
      ->withConstant(
        $value,
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
