<?php

namespace JamesWildDev\DBMLParser\Tests;

use Illuminate\Support\Facades\Route;
use JamesWildDev\ReactNativeAppHelpers\SyncApi;
use PHPUnit\Framework\TestCase;
use Mockery;
use Hamcrest\Matchers;

final class SyncApiTest extends TestCase
{
  public function setUp(): void
  {
    parent::setUp();

    Route::spy();
  }

  public function testGenerateRoutes(): void
  {
    $syncApi = (new SyncApi())
      ->addSingleton('Example Singleton A', ExampleSingletonA::class)
      ->addSingleton('Example Singleton B', ExampleSingletonB::class)
      ->addCollection(ExampleCollectionAModel::class, ExampleCollectionAController::class)
      ->addCollection(ExampleCollectionBModel::class, ExampleCollectionBController::class);

    $syncApi->generateRoutes();

    Route::shouldHaveReceived('get')
      ->with('preflight', Matchers::callableValue())
      ->once();

    var_dump(Route::mockery_findExpectation('preflight', [Matchers::callableValue()]));

    // TODO assert preflight response.

    Route::shouldHaveReceived('get')
      ->with('example-singleton-a', Matchers::callableValue())
      ->once();

    // TODO assert singleton responses.

    Route::shouldHaveReceived('get')
      ->with('example-singleton-b', Matchers::callableValue())
      ->once();

    Route::shouldHaveReceived('get')
      ->with(
        'example-collection-a-models/{exampleCollectionAModel:uuid}',
        [ExampleCollectionAController::class, 'show']
      )
      ->once();

    Route::shouldHaveReceived('put')
      ->with(
        'example-collection-a-models/{exampleCollectionAModel:uuid}',
        [ExampleCollectionAController::class, 'update']
      )
      ->once();

    Route::shouldHaveReceived('get')
      ->with(
        'example-collection-b-models/{exampleCollectionBModel:uuid}',
        [ExampleCollectionBController::class, 'show']
      )
      ->once();

    Route::shouldHaveReceived('put')
      ->with(
        'example-collection-b-models/{exampleCollectionBModel:uuid}',
        [ExampleCollectionBController::class, 'update']
      )
      ->once();

    Route::shouldHaveReceived('get')
      ->times(5);

    Route::shouldHaveReceived('put')
      ->times(2);

    Route::shouldNotReceive([
      'post',
      'patch',
      'delete',
      'options',
      'match',
      'any',
      'redirect',
      'permanentRedirect',
      'view',
      'pattern',
      'middleware',
      'group',
      'domain',
      'prefix',
      'name',
      'scopeBindings',
      'bind',
      'fallback',
      'current',
      'currentRouteName',
      'currentRouteAction',
    ]);
  }

  public function tearDown(): void
  {
    parent::tearDown();

    if ($container = Mockery::getContainer()) {
      $this->addToAssertionCount($container->mockery_getExpectationCount());
    }

    Mockery::close();
  }
}
