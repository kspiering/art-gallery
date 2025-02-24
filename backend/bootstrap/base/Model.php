<?php

namespace Bootstrap\Base;

use Illuminate\Database\Eloquent\Model as BaseModel;
use Laravel\Sanctum\HasApiTokens;
use ReflectionClass;

/**
 * @mixin \Eloquent
 */
class Model extends BaseModel {
  use HasApiTokens;

  #[Column]
  public int $id;

  #[Column]
  public string $created_at;

  #[Column]
  public string $updated_at;

  protected static $unguarded = true;
  protected $hidden = ['password'];

  public function __construct(array $attributes = []) {
    parent::__construct($attributes);

    // unset column properties, so laravel's __get/__set magic methods work correctly
    $reflection = new ReflectionClass($this);
    foreach ($reflection->getProperties() as $property) {
      $attributes = $property->getAttributes(Column::class);
      if (!empty($attributes)) unset($this->{$property->getName()});
    }
  }
}
