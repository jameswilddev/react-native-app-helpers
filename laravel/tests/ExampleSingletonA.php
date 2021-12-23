<?php

namespace JamesWildDev\DBMLParser\Tests;

use Illuminate\Http\Resources\Json\JsonResource;

final class ExampleSingletonA extends JsonResource
{
  public function toArray($request)
  {
    return [
      'result' => [
        'of' => [
          'example' => [
            'singleton',
            'a'
          ]
        ]
      ]
    ];
  }
}
