<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;

/**
 * Represents a sync API as a whole.  Use this to configure your API once, then
 * invoke its methods to generate routes, etc.
 */
class SyncApi implements SyncApiInterface
{
  private array $enums = [];
  private array $collections = [];

  public function withEnum(
    string $enumClass,
    string $resourceClass,
  ): SyncApiEnum {
    $syncApiEnum = new SyncApiEnum(
      $this,
      $enumClass,
      $resourceClass,
    );

    $this->enums[] = $syncApiEnum;

    return $syncApiEnum;
  }

  public function withCollection(
    string $modelClass,
    string $scopeName,
    ?string $resourceClass,
    ?string $controllerClass,
  ): SyncApiCollection {
    $syncApiCollection = new SyncApiCollection(
      $this,
      $modelClass,
      $scopeName,
      $resourceClass,
      $controllerClass,
    );

    $this->collections[] = $syncApiCollection;

    return $syncApiCollection;
  }

  public function generateRoutes(): void
  {
    Route::get('preflight', function () {
      $collections = [];

      foreach ($this->collections as $collection) {
        $json = $collection->generatePreflightCollection();

        if ($json !== null) {
          $collections[$collection->generateCamelCasedName()] = $json;
        }
      }

      return compact('collections');
    });

    foreach ($this->enums as $enum) {
      $enum->generateEnumRoutes();
    }

    foreach ($this->collections as $collection) {
      $collection->generateCollectionRoutes();
    }
  }
}
