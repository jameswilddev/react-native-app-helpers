<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/**
 * Represents an "about me" endpoint within a sync API.  Create instances using
 * SyncApi::withMe().
 */
class SyncApiMe implements SyncApiMeInterface
{
  private SyncApi $syncApi;

  private string $modelClass;

  private string $resourceClass;

  public function __construct(
    SyncApi $syncApi,
    string $modelClass,
    string $resourceClass,
  ) {
    $this->syncApi = $syncApi;
    $this->modelClass = $modelClass;
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
    return Str::camel(class_basename($this->modelClass));
  }

  public function generateKebabCasedName(): string
  {
    return Str::kebab(class_basename($this->modelClass));
  }

  public function generateData(): array
  {
    return (new $this->resourceClass(auth()->user()))->toArray(request());
  }

  public function hashData(array $data): string
  {
    ksort($data);

    return hash('sha1', json_encode($data));
  }

  public function generateMeRoutes(): void
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
