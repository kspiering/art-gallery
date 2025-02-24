<?php

namespace App\Models;

use Bootstrap\Base\Column;
use Bootstrap\Base\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class User extends Model
{
  #[Column] public int $id;

  #[Column] public string $firstname;

  #[Column] public string $lastname;

  #[Column] public string $email;

  #[Column] public string $password;

  // Beziehungen zu anderen Modellen
  public function events(): HasMany
  {
    return $this->hasMany(Events::class);
  }

  public function registrations(): HasMany
  {
    return $this->hasMany(EventRegistration::class);
  }

  //  Beziehung für registrierte Events
  public function registeredEvents()
  {
    return $this->belongsToMany(Events::class, 'event_registrations', 'user_id', 'event_id');
  }

  // Validierung für Benutzerdaten
  public static function validate(Request $request)
  {
    return $request->validate([
      'firstname' => ['required'],
      'lastname' => ['required'],
      'email' => ['required', 'email', 'unique:users,email,' . $request->user()?->id],
      'password' => ['sometimes', 'min:8', 'confirmed'],
    ]);
  }

  // Automatisches Hashing des Passworts
  protected static function booted()
  {
    self::saving(function (User $user) {
      if ($user->isDirty('password')) {
        $user->password = Hash::make($user->password);
      }
    });
  }
}
