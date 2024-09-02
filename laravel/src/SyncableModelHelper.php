<?php

namespace JamesWildDev\ReactNativeAppHelpers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\Access\AuthorizationException;

/**
 * Helpers for working with syncable models.
 */
final class SyncableModelHelper
{
  /**
   * Retrieves a model by its UUID, executing a callback on successful
   * retrieval.
   * @param string $modelClass      The Laravel Model class which is to be
   *                                retrieved.
   * @param string $scopeName       The name of the scope which will be used to
   *                                filter the Models (e.g. "exampleTest" ->
   *                                "function scopeExampleTest()").
   * @param string $uuid            The UUID of the model to retrieve.
   * @return SyncableModel          The retrieved model.
   * @throws ModelNotFoundException When no such model exists.
   */
  static function update(
    string $modelClass,
    string $scopeName,
    string $uuid,
  ): SyncableModel {
    $model = self::upsert($modelClass, $scopeName, $uuid);

    if ($model === null) {
      throw new ModelNotFoundException();
    } else {
      return $model;
    }
  }

  /**
   * Retrieves a model by its UUID if it exists.
   * @param string $modelClass     The Laravel Model class which is to be
   *                               retrieved.
   * @param string $scopeName      The name of the scope which will be used to
   *                               filter the Models (e.g. "exampleTest" ->
   *                               "function scopeExampleTest()").
   * @param string $uuid           The UUID of the model to retrieve.
   * @return ?SyncableModel        When the model exists, the model, otherwise,
   *                               null.
   * @throws UnauthorizedException When the model exists, but access is blocked
   *                               by the scope.
   */
  static function upsert(
    string $modelClass,
    string $scopeName,
    string $uuid,
  ): ?SyncableModel {
    $hasSoftDeletes = in_array(SoftDeletes::class, class_uses_recursive($modelClass));

    $model = $modelClass::query();

    if ($hasSoftDeletes) {
      $model = $model->withTrashed();
    }

    $model = $model
      ->$scopeName()
      ->where('uuid', $uuid)
      ->first();

    if ($model === null) {
      $query = $modelClass::query();

      if ($hasSoftDeletes) {
        $query = $query->withTrashed();
      }



      if ($query->where('uuid', $uuid)->exists()) {
        throw new AuthorizationException();
      } else {
        return null;
      }
    } else {
      return $model;
    }
  }
}
