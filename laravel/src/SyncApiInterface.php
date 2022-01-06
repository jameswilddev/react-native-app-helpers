<?php

namespace JamesWildDev\ReactNativeAppHelpers;

/**
 * Represents a sync API as a whole.  Use this to configure your API once, then
 * invoke its methods to generate routes, etc.
 */
interface SyncApiInterface
{
  /**
   * Adds a new collection of Models to this sync API.
   * @param string $modelClass       The Laravel Model class of which this is a
   *                                 collection.
   * @param string $scopeName        The name of the scope used to filter Models
   *                                 down to only those the user is to be able
   *                                 to access, e.g. "exampleTest" ->
   *                                 "function scopeExampleTest()".
   * @param ?string $resourceClass   The Laravel JsonResource class used to
   *                                 generate JSON to return to the client on
   *                                 pull.  When null, it is NOT possible to
   *                                 pull and this collection will NOT be listed
   *                                 in preflight responses.
   * @param ?string $controllerClass The Laravel Controller class used to
   *                                 manipulate instances of the Model.  This
   *                                 will be scanned for methods, and generate
   *                                 appropriate routes:
   *                                 - "upsert": Given the UUID of a record to
   *                                             insert or update.  It is up to
   *                                             your controller to ensure that
   *                                             the user is authorized to
   *                                             insert or update this
   *                                             particular Model (it is
   *                                             suggested that you use the same
   *                                             scope as specified in
   *                                             $scopeName), and up to your
   *                                             FormRequest (which should match
   *                                             $resourceClass when non-null)
   *                                             to ensure that the structure is
   *                                             valid.  You do not need to
   *                                             return anything from this
   *                                             method.
   *                                 - "destroy": Given an existing record to
   *                                              delete.  It is up to your
   *                                              controller to ensure that the
   *                                              user is authorized to delete
   *                                              this particular Model (it is
   *                                              suggested that you use the
   *                                              same scope as specified in
   *                                              $scopeName), and up to your
   *                                              FormRequest (which should
   *                                              match $resourceClass when
   *                                              non-null) to ensure that the
   *                                              structure is valid.  You do
   *                                              not need to return anything
   *                                              from this method.
   *                                 When null, none of these routes will be
   *                                 generated.
   * @return SyncApiCollection       The created SyncApiCollection.
   */
  function withCollection(
    string $modelClass,
    string $scopeName,
    string $resourceClass,
    string $controllerClass,
  ): SyncApiCollection;
}
