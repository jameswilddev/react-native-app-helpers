<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/**
 * Represents a sync API as a whole.  Use this to configure your API once, then
 * invoke its methods to generate routes, etc.
 */
class SyncApi
{
  private array $singletons = [];
  private array $collections = [];

  /**
   * Adds a new singleton to this sync API.
   * @param string $name              The name of the singleton, e.g. "Units of
   *                                  Measure".
   * @param string $jsonResourceClass A Laravel JsonResource class which
   *                                  generates the value to be provided to the
   *                                  mobile application.  This must be stable;
   *                                  that is, its result must be identical
   *                                  unless the data really has changed,
   *                                  including ordering of associative arrays.
   */
  public function addSingleton(
    string $name,
    string $jsonResourceClass,
  ): self {
    $this->singletons[] = compact('name', 'jsonResourceClass');

    return $this;
  }

  /**
   * Adds a new collection of Models to this sync API.
   * @param string $modelClass      The Laravel Model class of which the
   *                                collection is composed.
   * @param string $controllerClass The Laravel Controller class which includes
   *                                both "show" (to retrieve a single Model) and
   *                                "update" to (create or update a single
   *                                Model), where the Resource returned by
   *                                "show" and the FormRequest accepted by
   *                                "update" are compatible.
   */
  public function addCollection(
    string $modelClass,
    string $controllerClass,
  ): self {
    $this->collections[] = compact('modelClass', 'controllerClass');

    return $this;
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
    });

    foreach ($this->singletons as $singleton) {
      $name = $singleton['name'];
      $jsonResourceClass = $singleton['jsonResourceClass'];

      Route::get(Str::kebab($name), fn () => new $jsonResourceClass());
    }

    foreach ($this->collections as $collection) {
      $modelClass = $collection['modelClass'];
      $controllerClass = $collection['controllerClass'];

      Route::get(Str::kebab(Str::pluralStudly(class_basename($modelClass))) . '/{' . Str::camel(class_basename($modelClass)) . ':uuid}', [$controllerClass, 'show']);
      Route::put(Str::kebab(Str::pluralStudly(class_basename($modelClass))) . '/{' . Str::camel(class_basename($modelClass)) . ':uuid}', [$controllerClass, 'update']);
    }
  }
}
