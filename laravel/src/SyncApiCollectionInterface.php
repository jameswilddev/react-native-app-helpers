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
   * @param ?string $routeFragment When specified and non-null, the route fragment to use within the URL, otherwise auto-generated (e.g. SomeClassName = some-class-names).
   */
  function withMediaCollection(
    string $name,
    int $syncCapabilities,
    ?string $routeFragment
  ): SyncApiCollectionMediaCollection;
}
