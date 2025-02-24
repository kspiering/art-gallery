<?php

namespace App\Models;

use Bootstrap\Base\Column;
use Bootstrap\Base\Model;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class Events extends Model
{
  // Spalten der Tabelle 'events'
  #[Column]
  public string $location;

  #[Column]
  public string $address;

  #[Column]
  public string $date;

  #[Column]
  public string $time;

  #[Column]
  public string $title;

  #[Column]
  public string $content;

  #[Column]
  public string $longDescription;

  #[Column]
  public int $user_id;

  #[Column]
  public string $created_at;

  #[Column]
  public string $updated_at;

  #[Column]
  public string $delete;


  protected $fillable = [
    'title',
    'content',
    'longDescription',
    'location',
    'address',
    'date',
    'time',
    'user_id'
  ];


  // Validierung der Event-Daten

  public static function validate(Request $request, $eventId = null)
  {
    $isPost = $request->isMethod('post');

    return $request->validate([
      'title' => [
        $isPost ? 'required' : 'sometimes',
        'string',
        'min:1',
        'max:50',
        // Eigene Regel für Titel Datum Location
        Rule::unique('events')->where(function ($query) use ($request) {
          return $query->where('title', $request->title)
            ->where('date', $request->date)
            ->where('time', $request->time)
            ->where('location', $request->location);
        })->ignore($eventId),
      ],
      'content' => [
        $isPost ? 'required' : 'sometimes',
        'string',
        'min:1',
        'max:200'
      ],
      'longDescription' => [
        $isPost ? 'required' : 'sometimes',
        'string',
        'min:1',
        'max:500'
      ],
      'location' => [
        'required',
        'string',
        'max:50'
      ],
      'address' => [
        'required',
        'string',
        'max:50'
      ],
      'date' => [
        'required',
        'date',
        'after:today',
        'date_format:Y-m-d'
      ],
      'time' => [
        'required',
        'string'
      ]
    ]);
  }

  // Prüft ob Duplikat
  public static function isDuplicate($title, $date, $time, $location): bool
  {
    return static::query()
      ->where('title', $title)
      ->where('date', $date)
      ->where('time', $time)
      ->where('location', $location)
      ->exists();
  }

  // Beziehung zu User
  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
