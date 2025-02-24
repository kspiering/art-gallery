<?php

namespace App\Controllers;

use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EventsController
{
  // Alle Events
  public function index(Request $request)
  {
    try {

      $query = Events::query();

      // Filter nach ID
      $id = $request->input('id');
      if ($id) {
        return $query->where('id', $id)->firstOrFail();
      }

      // Filter nach User-ID
      $userId = $request->input('user_id');
      if ($userId) {
        $query->where('user_id', $userId);
      }

      // Filter nach Titel
      $title = $request->input('title');
      if ($title) {
        $query->where('title', 'like', "%$title%");
      }

      // Sortierung
      $orderBy = $request->input('order_by', 'created_at');
      $orderDir = $request->input('order_dir', 'asc');
      $query->orderBy($orderBy, $orderDir);

      // Paginierung
      $limit = $request->input('limit');
      $offset = $request->input('offset');
      if ($limit) {
        $query->limit($limit);
      }
      if ($offset) {
        $query->offset($offset);
      }

      return $query->get();
    } catch (\Exception $e) {
      Log::error('Fehler beim Abrufen der Events: ' . $e->getMessage());
      return response()->json(['error' => 'Fehler beim Abrufen der Events'], 500);
    }
  }

  // Event erstellen

  public function create(Request $request)
  {
    if (!Auth::check()) {
      return response()->json(['error' => 'Nicht authentifiziert'], 401);
    }

    try {
      // Prüft Anzahl der bestehenden Events des Users max. 5 Events pro User
      $user = Auth::user();
      $eventCount = $user->events()->count();

      if ($eventCount >= 5) {
        return response()->json([
          'error' => 'Sie können maximal 5 Events erstellen'
        ], 422);
      }

      // Prüfet ob Duplikat
      if (Events::isDuplicate($request->title, $request->date, $request->location, $request->time)) {
        return response()->json([
          'error' => 'Ein Event mit diesem Titel, Datum und Ort existiert bereits'
        ], 422);
      }

      // Validieren der Daten
      $payload = Events::validate($request);

      // Event erstellen
      $user = Auth::user();
      $event = $user->events()->create($payload);

      Log::info('Neues Event erstellt', [
        'event_id' => $event->id,
        'user_id' => $user->id,
        'title' => $event->title
      ]);

      return response()->json($event, 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      Log::error('Fehler beim Erstellen des Events: ' . $e->getMessage());
      return response()->json(['error' => 'Fehler beim Erstellen des Events'], 500);
    }
  }

  // Event aktualisieren
  public function update(Request $request)
  {
    if (!Auth::check()) {
      return response()->json(['error' => 'Nicht authentifiziert'], 401);
    }

    try {
      $id = $request->input('id');
      $user = Auth::user();
      $event = $user->events()->findOrFail($id);

      // Prüft ob Update ein Duplikat erzeugen würde
      if (Events::isDuplicate($request->title, $request->date, $request->location, $request->time)) {
        $existingEvent = Events::where('title', $request->title)
          ->where('date', $request->date)

          ->where('location', $request->location)
          ->first();

        if ($existingEvent && $existingEvent->id !== $event->id) {
          return response()->json([
            'error' => 'Ein Event mit diesen Details existiert bereits'
          ], 422);
        }
      }

      // Validieren mit Ausnahme des aktuellen Events
      $payload = Events::validate($request, $id);

      $event->update($payload);

      Log::info('Event aktualisiert', [
        'event_id' => $event->id,
        'user_id' => $user->id
      ]);

      return response()->json($event);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
      return response()->json(['error' => 'Event nicht gefunden'], 404);
    } catch (\Exception $e) {
      Log::error('Fehler beim Aktualisieren des Events: ' . $e->getMessage());
      return response()->json(['error' => 'Fehler beim Aktualisieren des Events'], 500);
    }
  }

  // Event löschen

  public function destroy(Request $request)
  {
    if (!Auth::check()) {
      return response()->json(['error' => 'Nicht authentifiziert'], 401);
    }

    try {
      $id = $request->input('id');
      if (!$id) {
        return response()->json(['error' => 'Keine Event-ID angegeben'], 400);
      }

      $user = Auth::user();
      $event = $user->events()->findOrFail($id);

      // Debug-Logging hinzufügen
      Log::debug('Versuche Event zu löschen', [
        'event_id' => $id,
        'user_id' => $user->id
      ]);



      $event->delete();



      Log::info('Event gelöscht', [
        'event_id' => $id,
        'user_id' => $user->id
      ]);

      return response()->json(['message' => 'Event erfolgreich gelöscht']);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
      return response()->json(['error' => 'Event nicht gefunden'], 404);
    } catch (\Exception $e) {
      Log::error('Fehler beim Löschen des Events: ' . $e->getMessage());
      return response()->json(['error' => 'Fehler beim Löschen des Events'], 500);
    }
  }
}
