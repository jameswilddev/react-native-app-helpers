<?php

namespace JamesWildDev\ReactNativeAppHelpers;

/**
 * Bit mask enum specifying what a user can do with sync of a particular entity.
 */
final class SyncCapability
{
  /**
   * The user can read existing instances of this.
   */
  const READ = 1;

  /**
   * The user can create or update new instances of this.
   */
  const UPSERT = 2;

  /**
   * The user can delete existing instances of this.
   */
  const DELETE = 4;
}
