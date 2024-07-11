<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;

/**
 * Represents a sync API as a whole.  Use this to configure your API once, then
 * invoke its methods to generate routes, etc.
 */
class SyncApi implements SyncApiInterface
{
  private array $mes = [];
  private array $enums = [];
  private array $constants = [];
  private array $collections = [];

  public function withMe(
    string $modelClass,
    string $resourceClass,
  ): SyncApiMe {
    $syncApiMe = new SyncApiMe(
      $this,
      $modelClass,
      $resourceClass,
    );

    $this->mes[] = $syncApiMe;

    return $syncApiMe;
  }

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

  public function withConstant(
    string $name,
    callable $valueFactory,
  ): SyncApiConstant {
    $syncApiConstant = new SyncApiConstant(
      $this,
      $name,
      $valueFactory,
    );

    $this->constants[] = $syncApiConstant;

    return $syncApiConstant;
  }

  public function withCollection(
    string $modelClass,
    string $scopeName,
    ?string $resourceClass = null,
    ?string $controllerClass = null,
    ?string $routeFragment = null,
  ): SyncApiCollection {
    $syncApiCollection = new SyncApiCollection(
      $this,
      $modelClass,
      $scopeName,
      $resourceClass,
      $controllerClass,
      $routeFragment,
    );

    $this->collections[] = $syncApiCollection;

    return $syncApiCollection;
  }

  public function generateRoutes(): void
  {
    Route::get('preflight', function () {
      $singletons = [];

      foreach ($this->mes as $me) {
        $key = $me->generateCamelCasedName();

        $data = $me->generateData();
        $version = $me->hashData($data);

        $singletons[$key] = compact('version');
      }

      foreach ($this->enums as $enum) {
        $key = $enum->generateCamelCasedName();

        $data = $enum->generateData();
        $version = $enum->hashData($data);

        $singletons[$key] = compact('version');
      }

      foreach ($this->constants as $constant) {
        $key = $constant->generateCamelCasedName();

        $data = $constant->value;
        ksort($data);
        $version = hash('sha1', json_encode($data));

        $singletons[$key] = compact('version');
      }

      $collections = [];

      foreach ($this->collections as $collection) {
        $json = $collection->generatePreflightCollection();

        if ($json !== null) {
          $collections[$collection->generateCamelCasedName()] = $json;
        }
      }

      return compact('singletons', 'collections');
    });

    foreach ($this->mes as $me) {
      $me->generateMeRoutes();
    }

    foreach ($this->enums as $enum) {
      $enum->generateEnumRoutes();
    }

    foreach ($this->constants as $constant) {
      $constant->generateConstantRoutes();
    }

    foreach ($this->collections as $collection) {
      $collection->generateCollectionRoutes();
    }
  }
}
