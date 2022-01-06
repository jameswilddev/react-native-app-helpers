<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/**
 * Represents a sync API as a whole.  Use this to configure your API once, then
 * invoke its methods to generate routes, etc.
 */
class SyncApi implements SyncApiInterface
{
  private array $collections = [];

  public function withCollection(
    string $modelClass,
    string $scopeName,
    string $resourceClass,
    string $controllerClass,
  ): SyncApiCollection {
    $syncApiCollection = new SyncApiCollection(
      $this,
      $modelClass,
      $scopeName,
      $resourceClass,
      $controllerClass
    );

    $this->collections[] = $syncApiCollection;

    return $syncApiCollection;
  }

  /**
   * Invoke this method in a routes file to generate routes for all singletons
   * and collections as well as a "preflight" route which can be used to query
   * for changes to sync.
   *
   * This must be called in a context in which the request would be authorized!
   */
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

    // foreach ($this->collections as $collection) {
    //   $modelClass = $collection['modelClass'];
    //   $controllerClass = $collection['controllerClass'];

    //   Route::get(Str::kebab(Str::pluralStudly(class_basename($modelClass))) . '/{' . Str::camel(class_basename($modelClass)) . ':uuid}', [$controllerClass, 'show']);
    //   Route::put(Str::kebab(Str::pluralStudly(class_basename($modelClass))) . '/{' . Str::camel(class_basename($modelClass)) . ':uuid}', [$controllerClass, 'update']);
    // }
  }
}
