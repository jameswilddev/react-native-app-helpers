<?php

namespace JamesWildDev\DBMLParser\Tests;

use Illuminate\Http\Resources\Json\JsonResource;

final class ExampleSingletonB extends JsonResource
{
  public function toArray($request)
  {
    return [
      'result' => [
        'of' => [
          'example' => [
            'singleton',
            'b'
          ]
        ]
      ]
    ];
  }
}
