<?php

namespace JamesWildDev\ReactNativeAppHelpers;

/**
 * Implemented by Models which can be synced.
 * @property string $uuid The UUID of this Model.
 */
interface SyncableModel
{
  /**
   * Calculates a number or string which can be used by the client to determine
   * whether their version of a record is out of date and needs to be pulled
   * again.
   * @return float|string The number or string which can be used by the client
   * to determine whether their version of a record is out of date and needs to
   * be pulled again.
   */
  function getVersionForSync(): float | string;
}
