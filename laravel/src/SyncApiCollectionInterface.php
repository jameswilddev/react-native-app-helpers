<?php

namespace JamesWildDev\ReactNativeAppHelpers;

/**
 * Represents a collection within a sync API.  Create instances using
 * SyncApi::withCollection().
 */
interface SyncApiCollectionInterface extends SyncApiInterface
{
  /**
   * Adds a new media collection to this collection.
   * @param string $name           The name of the media collection.
   * @param int $syncCapabilities  The actions available to API consumers.
   * @param callable $onUpsertOrDelete        Invoked when media is upserted or
   *                                          deleted.
   */
  function withMediaCollection(
    string $name,
    int $syncCapabilities,
    ?callable $onUpsertOrDelete,
  ): SyncApiCollectionMediaCollection;
}
