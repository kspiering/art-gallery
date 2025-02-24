<?php

namespace App\Controllers;

use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventRegistrationController
{
  // Alle Registrierungen für einen Event anzeigen
  function index(Request $request)
  {
    $query = EventRegistration::query();

    $userId = $request->input('user_id');
    if ($userId) $query->where('user_id', $userId);

    $eventId = $request->input('event_id');
    if ($eventId) {
      return $query->where('event_id', $eventId)->count();
    }

    $firstname = $request->input('firstname');
    if ($firstname) {
      return $query->where('firstname', $firstname)->count();
    }

    $lastname = $request->input('lastname');
    if ($lastname) {
      return $query->where('lastname', $lastname)->count();
    }

    $query->orderBy('created_at', 'desc');

    return $query->get();
  }

  // Anmeldung für einen Event

  function create(Request $request)
  {
    // Validierung der Anfrage
    $payload = $request->validate([
      'event_id' => ['required', 'exists:events,id'],
      'email' => ['required', 'email', 'exists:users,email'],
      'firstname' => ['required', 'string', 'max:255'],
      'lastname' => ['required', 'string', 'max:255']
    ]);

    // Aktuelle Teilnehmeranzahl max. 20 Personen
    $currentParticipants = EventRegistration::where('event_id', $payload['event_id'])->count();

    if ($currentParticipants >= 20) {
      return response()->json([
        'error' => 'Dieses Event hat bereits die maximale Teilnehmerzahl erreicht.'
      ], 400);
    }

    // Überprüft, ob Benutzer sich bereits diesen Event registriert hat
    $existingRegistration = EventRegistration::where('event_id', $payload['event_id'])
      ->where('email', $payload['email'])
      ->first();

    if ($existingRegistration) {
      return response()->json([
        'error' => 'Sie sind bereits für dieses Event registriert.'
      ], 400);
    }

    // Registrierung erstellen
    $eventRegistration = EventRegistration::create($payload);

    return $eventRegistration;
  }

  // Abmelden vom Event

  function destroy(Request $request)
  {

    $payload = $request->validate([
      'event_id' => ['required', 'exists:events,id'],
      'email' => ['required', 'email']
    ]);

    $eventId = $payload['event_id'];
    $email = $payload['email'];

    // Anmeldung finden mittles ID
    $registration = EventRegistration::where('event_id', $eventId)
      ->where('email', $email)
      ->first();

    if (!$registration) {
      return response()->json(['error' => 'Registration not found'], 404);
    }

    // Anmeldung löschen
    $registration->delete();

    return response()->json(['message' => 'Registration deleted successfully'], 200);
  }

  // Anzahl der Teilnehmer für Event
  public function getParticipantCount(Request $request)
  {
    $eventId = $request->input('event_id');

    if (!$eventId) {
      return response()->json(['error' => 'Event ID ist erforderlich'], 400);
    }

    $count = EventRegistration::where('event_id', $eventId)->count();
    return response()->json(['count' => $count]);
  }

  // Event für den ich mich angemeldet habe
  public function getUserRegisteredEvents(Request $request)
  {
    try {
      $user = Auth::user();

      $registeredEvents = EventRegistration::where('email', $user->email)
        ->with('event')
        ->get()
        ->map(function ($registration) {
          return [
            'event' => [
              'id' => $registration->event->id,
              'title' => $registration->event->title,
              'date' => $registration->event->date,
              'time' => $registration->event->time,
              'location' => $registration->event->location,
              'address' => $registration->event->address
            ],
            'registration_date' => $registration->created_at,
            'registration_id' => $registration->id,
            'email' => $registration->email
          ];
        });

      return response()->json([
        'success' => true,
        'message' => 'Events erfolgreich abgerufen',
        'data' => $registeredEvents
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'message' => 'Fehler beim Abrufen der registrierten Events',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  // Teilnehmerliste für Event

  public function getEventParticipants(Request $request)
  {
    try {
      // Validierung der Event-ID
      $eventId = $request->validate([
        'event_id' => ['required', 'exists:events,id']
      ])['event_id'];

      // Abrufen aller Registrierungen für Event
      $participants = EventRegistration::where('event_id', $eventId)
        ->select('firstname', 'lastname', 'email', 'created_at')
        ->orderBy('lastname')
        ->get();

      return response()->json([
        'success' => true,
        'message' => 'Teilnehmerliste erfolgreich abgerufen',
        'data' => $participants
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Fehler beim Abrufen der Teilnehmerliste',
        'error' => $e->getMessage()
      ], 500);
    }
  }
}
