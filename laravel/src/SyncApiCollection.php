<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/**
 * Represents a collection within a sync API.  Create instances using
 * SyncApi::withCollection().
 */
class SyncApiCollection implements SyncApiCollectionInterface
{
  private SyncApi $syncApi;

  public string $modelClass;

  public string $scopeName;

  private ?string $resourceClass;

  private ?string $controllerClass;

  private array $syncApiCollectionMediaCollections = [];

  public function __construct(
    SyncApi $syncApi,
    string $modelClass,
    string $scopeName,
    ?string $resourceClass,
    ?string $controllerClass,
  ) {
    $this->syncApi = $syncApi;
    $this->modelClass = $modelClass;
    $this->scopeName = $scopeName;
    $this->resourceClass = $resourceClass;
    $this->controllerClass = $controllerClass;
  }

  /**
   * Adds a new media collection to this collection.
   * @param string $name                      The name of the media collection.
   * @param int $syncCapabilities             The actions available to API
   *                                          consumers.
   * @return SyncApiCollectionMediaCollection The created media collection.
   */
  public function withMediaCollection(
    string $name,
    int $syncCapabilities,
  ): SyncApiCollectionMediaCollection {
    $syncApiCollectionMediaCollection = new SyncApiCollectionMediaCollection(
      $this,
      $name,
      $syncCapabilities,
    );

    $this->syncApiCollectionMediaCollections[] = $syncApiCollectionMediaCollection;

    return $syncApiCollectionMediaCollection;
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

  public function withEnum(
    string $enumClass,
    string $resourceClass,
  ): SyncApiEnum {
    return $this->syncApi->withEnum(
      $enumClass,
      $resourceClass,
    );
  }

  public function withCollection(
    string $modelClass,
    string $scopeName,
    ?string $resourceClass,
    ?string $controllerClass,
  ): SyncApiCollection {
    return $this->syncApi->withCollection(
      $modelClass,
      $scopeName,
      $resourceClass,
      $controllerClass
    );
  }

  public function generateCamelCasedName(): string
  {
    return Str::camel(Str::pluralStudly(class_basename($this->modelClass)));
  }

  public function generateKebabCasedName(): string
  {
    return Str::kebab(Str::pluralStudly(class_basename($this->modelClass)));
  }

  public function generatePreflightCollection(): ?array
  {
    if ($this->resourceClass === null) {
      return null;
    } else {
      $scopeName = $this->scopeName;

      return $this
        ->modelClass::$scopeName()
        ->get()
        ->mapWithKeys(fn (SyncableModel $item) => [
          $item->uuid => [
            'version' => $item->getVersionForSync(),
          ],
        ])
        ->all();
    }
  }

  public function generateCollectionRoutes(): void
  {
    if ($this->resourceClass !== null) {
      Route::get(
        $this->generateKebabCasedName() . '/{uuid}',
        function (string $uuid) {
          $scopeName = $this->scopeName;

          $model = $this
            ->modelClass::$scopeName()
            ->where('uuid', $uuid)
            ->first();

          if ($model) {
            return [
              'version' => $model->getVersionForSync(),
              'data' => new $this->resourceClass($model),
            ];
          } else {
            throw new ModelNotFoundException();
          }
        }
      );
    }

    if ($this->controllerClass !== null) {
      if (method_exists($this->controllerClass, 'upsert')) {
        Route::put(
          $this->generateKebabCasedName() . '/{uuid}',
          [$this->controllerClass, 'upsert']
        );
      }

      if (method_exists($this->controllerClass, 'destroy')) {
        Route::delete(
          $this->generateKebabCasedName() . '/{uuid}',
          [$this->controllerClass, 'destroy']
        );
      }
    }

    foreach ($this->syncApiCollectionMediaCollections as $syncApiCollectionMediaCollection) {
      $syncApiCollectionMediaCollection->generateCollectionMediaCollectionRoutes();
    }
  }

  public function generateRoutes(): void
  {
    $this->syncApi->generateRoutes();
  }
}
