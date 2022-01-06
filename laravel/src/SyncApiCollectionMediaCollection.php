<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Support\Facades\Route;

/**
 * Represents a media collection within a collection of a sync API.  Create
 * instances using SyncApiCollection::withMediaCollection().
 */
class SyncApiCollectionMediaCollection implements SyncApiCollectionMediaCollectionInterface
{
  private SyncApiCollection $syncApiCollection;

  private string $name;

  private int $syncCapabilities;

  public function __construct(
    SyncApiCollection $syncApiCollection,
    string $name,
    int $syncCapabilities,
  ) {
    $this->syncApiCollection = $syncApiCollection;
    $this->name = $name;
    $this->syncCapabilities = $syncCapabilities;
  }

  public function withMediaCollection(
    string $name,
    int $syncCapabilities,
  ): SyncApiCollectionMediaCollection {
    return $this->syncApiCollection->withMediaCollection(
      $name,
      $syncCapabilities,
    );
  }

  public function withCollection(
    string $modelClass,
    string $scopeName,
    string $resourceClass,
    string $controllerClass,
  ): SyncApiCollection {
    return $this->syncApiCollection->withCollection(
      $modelClass,
      $scopeName,
      $resourceClass,
      $controllerClass
    );
  }

  public function generateCollectionMediaCollectionRoutes(): void
  {
    if ($this->syncCapabilities & SyncCapability::READ) {
      Route::get(
        $this->generateKebabCasedName() . '/{modelUuid}/{mediaUuid}',
        function (string $modelUuid, string $mediaUuid) {
          $scopeFunctionName = $this->generateScopeFunctionName();

          $model = $this
            ->modelClass::$scopeFunctionName()
            ->where('uuid', $modelUuid)
            ->first();

          if ($model) {
            $media = $model
              ->getMedia($this->name)
              ->where('name', $mediaUuid)
              ->first();

            if ($media === null) {
              throw new ModelNotFoundException();
            } else {
              return redirect()->to($media->getTemporaryUrl(now()->addHour()));
            }
          } else {
            throw new ModelNotFoundException();
          }
        }
      );
    }

    if ($this->syncCapabilities & SyncCapability::UPSERT) {
      Route::put(
        $this->generateKebabCasedName() . '/{modelUuid}/{mediaUuid}',
        function (string $modelUuid, string $mediaUuid) {
          $scopeFunctionName = $this->generateScopeFunctionName();

          $model = $this
            ->modelClass::$scopeFunctionName()
            ->where('uuid', $modelUuid)
            ->first();

          if ($model) {
            $media = $model
              ->getMedia($this->name)
              ->where('name', $mediaUuid)
              ->first();

            if ($media === null) {
              $model
                ->addMediaFromString(request()->getContent())
                ->usingName($mediaUuid)
                ->toMediaCollection($this->name);
            }
          } else {
            throw new ModelNotFoundException();
          }
        }
      );
    }

    if ($this->syncCapabilities & SyncCapability::DELETE) {
      Route::get(
        $this->generateKebabCasedName() . '/{modelUuid}/{mediaUuid}',
        function (string $modelUuid, string $mediaUuid) {
          $scopeFunctionName = $this->generateScopeFunctionName();

          $model = $this
            ->modelClass::$scopeFunctionName()
            ->where('uuid', $modelUuid)
            ->first();

          if ($model) {
            $media = $model
              ->getMedia($this->name)
              ->where('name', $mediaUuid)
              ->first();

            if ($media !== null) {
              $media->delete();
            }
          } else {
            throw new ModelNotFoundException();
          }
        }
      );
    }
  }

  public function generateRoutes(): void
  {
    $this->syncApi->generateRoutes();
  }
}
