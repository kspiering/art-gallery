<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController
{

  // Benutzerinformationen
  public function index(Request $request)
  {
    return response()->json(Auth::user(), 200);
  }

  // Benutzer erstellen
  public function create(Request $request)
  {
    // Validierung für die Eingabedaten
    $payload = User::validate($request);

    // Benutzer erstellen
    $user = User::create($payload);

    return response()->json($user, 201);
  }

  // Benutzer aktualisieren
  public function update(Request $request)
  {
    $user = Auth::user();
    if (!$user) {
      return response()->json(['error' => 'Benutzer nicht authentifiziert'], 401);
    }

    // Validierung
    $payload = User::validate($request);

    try {
      // Alle erforderlichen Felder aktualisieren
      if ($request->has('firstname')) {
        $user->firstname = $payload['firstname'];
      }
      if ($request->has('lastname')) {
        $user->lastname = $payload['lastname'];
      }
      if ($request->has('email')) {
        $user->email = $payload['email'];
      }
      if ($request->has('password')) {
        // Überprüft, ob Passwortbestätigung übereinstimmt
        if ($request->password !== $request->password_confirmation) {
          return response()->json([
            'error' => 'Die Passwortbestätigung stimmt nicht überein'
          ], 422);
        }
        $user->password = $payload['password'];
      }

      $user->save();

      return response()->json($user, 200);
    } catch (\Exception $e) {
      return response()->json(['error' => 'Benutzer konnte nicht aktualisiert werden: ' . $e->getMessage()], 400);
    }
  }

  // Benutzer löschen
  public function delete(Request $request)
  {
    $user = Auth::user();
    if (!$user) {
      return response()->json(['error' => 'Benutzer nicht authentifiziert'], 401);
    }

    try {
      $user->delete();
      return response()->json(['message' => 'Benutzer wurde erfolgreich gelöscht'], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => 'Benutzer konnte nicht gelöscht werden: ' . $e->getMessage()], 400);
    }
  }

  // Registrierte Events des Benutzers anzeigen
  public function getRegisteredEvents(Request $request)
  {
    $user = Auth::user();
    if (!$user) {
      return response()->json(['error' => 'Benutzer nicht authentifiziert'], 401);
    }

    try {
      $registeredEvents = $user->registeredEvents()->with(['location'])->get();
      return response()->json($registeredEvents, 200);
    } catch (\Exception $e) {
      return response()->json(['error' => 'Events konnten nicht abgerufen werden: ' . $e->getMessage()], 400);
    }
  }
}
