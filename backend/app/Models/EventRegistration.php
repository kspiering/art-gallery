<?php

namespace App\Models;

use Bootstrap\Base\Column;
use Bootstrap\Base\Model;
use Illuminate\Http\Request;

class EventRegistration extends Model
{

  protected $table = 'registration';

  // Felder die verändert werden können
  protected $fillable = [
    'event_id',
    'email',
    'firstname',
    'lastname'
  ];


  #[Column]
  public int $id;

  #[Column]
  public int $event_id;

  #[Column]
  public string $email;

  #[Column]
  public string $firstname;

  #[Column]
  public string $lastname;


  // Validierung
  public static function validate(Request $request)
  {
    return $request->validate([
      'event_id' => ['required', 'exists:events,id'],
      'email' => ['required', 'email'],
    ]);
  }

  // Beziehung zu Event
  public function event()
  {
    return $this->belongsTo(Events::class, 'event_id');
  }
}
