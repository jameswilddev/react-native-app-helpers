<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use finfo;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/**
 * Represents a media collection within a collection of a sync API.  Create
 * instances using SyncApiCollection::withMediaCollection().
 */
class SyncApiCollectionMediaCollection implements SyncApiCollectionMediaCollectionInterface
{
  private SyncApiCollection $syncApiCollection;

  private string $name;

  private int $syncCapabilities;

  private string $routeFragment;

  private function getMediaUuidField(): string
  {
    if (config('react-native-sync')) {
      if (config('react-native-sync.uuid-fields')) {
        if (config('react-native-sync.uuid-fields.media')) {
          return config('react-native-sync.uuid-fields.media');
        }
        if (config('react-native-sync.uuid-fields.default')) {
          return config('react-native-sync.uuid-fields.default');
        }
      }
    }
    return "uuid";
  }

  private function getModelUuidField(string $modelName): string
  {
    if (config('react-native-sync')) {
      if (config('react-native-sync.uuid-fields')) {
        if (config('react-native-sync.uuid-fields.models.' . $modelName)) {
          return config('react-native-sync.uuid-fields.models.' . $modelName);
        }
        if (config('react-native-sync.uuid-fields.default')) {
          return config('react-native-sync.uuid-fields.default');
        }
      }
    }
    return "uuid";
  }

  public function __construct(
    SyncApiCollection $syncApiCollection,
    string $name,
    int $syncCapabilities,
    ?string $routeFragment,
  ) {
    $this->syncApiCollection = $syncApiCollection;
    $this->name = $name;
    $this->syncCapabilities = $syncCapabilities;
    $this->routeFragment = $routeFragment ?? Str::kebab(Str::pluralStudly(class_basename($this->syncApiCollection->modelClass)));
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

  function withMe(
    string $modelClass,
    string $resourceClass,
  ): SyncApiMe {
    return $this
      ->syncApiCollection
      ->withMe(
        $modelClass,
        $resourceClass,
      );
  }

  function withEnum(
    string $enumClass,
    string $resourceClass,
  ): SyncApiEnum {
    return $this->syncApiCollection->withEnum(
      $enumClass,
      $resourceClass
    );
  }

  function withConstant(
    string $name,
    array $value,
  ): SyncApiConstant {
    return $this
      ->syncApiCollection
      ->withConstant(
        $name,
        $value,
      );
  }

  public function withCollection(
    string $modelClass,
    string $scopeName,
    ?string $resourceClass = null,
    ?string $controllerClass = null,
    ?string $routeFragment = null,
  ): SyncApiCollection {
    return $this->syncApiCollection->withCollection(
      $modelClass,
      $scopeName,
      $resourceClass,
      $controllerClass,
      $routeFragment,
    );
  }

  public function generateKebabCasedMediaCollectionName(): string
  {
    return Str::kebab(Str::pluralStudly(preg_replace('/.*:/', '', $this->name)));
  }

  public function generateCollectionMediaCollectionRoutes(): void
  {
    if ($this->syncCapabilities & SyncCapability::READ) {
      Route::get(
        $this->routeFragment . '/{modelUuid}/' . $this->generateKebabCasedMediaCollectionName() . '/{mediaUuid}',
        function (string $modelUuid, string $mediaUuid) {
          $scopeName = $this->syncApiCollection->scopeName;

          $model = $this
            ->syncApiCollection
            ->modelClass::$scopeName()
            ->where($this->getModelUuidField($this->syncApiCollection->modelClass), $modelUuid)
            ->first();

          if ($model) {
            $media = $model
              ->getMedia($this->name)
              ->where($this->getMediaUuidField(), $mediaUuid)
              ->first();

            if ($media === null) {
              // TODO why isn't this propagating
              throw new ModelNotFoundException();
            } else {
              if ($media->getDiskDriverName() == "s3") {
                return redirect()->to($media->getTemporaryUrl(now()->addHour()));
              } else {

                return redirect()->to($media->getFullUrl());
              }
            }
          } else {
            throw new ModelNotFoundException();
          }
        }
      );
    }

    if ($this->syncCapabilities & SyncCapability::UPSERT) {
      $route = $this->routeFragment . '/{modelUuid}/' . $this->generateKebabCasedMediaCollectionName() . '/{mediaUuid}';

      $implementation = function (string $modelUuid, string $mediaUuid) {
        $scopeName = $this->syncApiCollection->scopeName;
        // TODO transaction
        $model = $this
          ->syncApiCollection
          ->modelClass::$scopeName()
          ->where($this->getModelUuidField($this->syncApiCollection->modelClass), $modelUuid)
          ->first();

        if ($model) {
          $media = $model
            ->getMedia($this->name)
            ->where($this->getMediaUuidField(), $mediaUuid)
            ->first();

          if ($media === null) {
            $data = request()->getContent();

            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->buffer($data);

            if ($mimeType) {
              if (preg_match('/^[^\/]+\/([a-z]{3,4})$/', $mimeType, $matches)) {
                $extension = '.' . $matches[1];
              } else {
                $extension = '';
              }
            } else {
              $extension = '';
            }

            $model
              ->addMediaFromString($data)
              ->usingName($mediaUuid . $extension)
              ->withProperties(['uuid' => $mediaUuid])
              ->toMediaCollection($this->name);
          }
        } else {
          throw new ModelNotFoundException();
        }
      };

      // Include both POST and PUT as a workaround for https://github.com/expo/expo/issues/14881.
      Route::put($route, $implementation);
      Route::post($route, $implementation);
    }

    if ($this->syncCapabilities & SyncCapability::DELETE) {
      // TODO transaction
      Route::delete(
        $this->routeFragment . '/{modelUuid}/' . $this->generateKebabCasedMediaCollectionName() . '/{mediaUuid}',
        function (string $modelUuid, string $mediaUuid) {
          $scopeName = $this->syncApiCollection->scopeName;

          $model = $this
            ->syncApiCollection
            ->modelClass::$scopeName()
            ->where($this->getModelUuidField($this->syncApiCollection->modelClass), $modelUuid)
            ->first();

          if ($model) {
            $media = $model
              ->getMedia($this->name)
              ->where($this->getMediaUuidField(), $mediaUuid)
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
    $this->syncApiCollection->generateRoutes();
  }
}
