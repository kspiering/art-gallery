<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController
{
  public function login(Request $request)
  {
    try {
      // Validierung der Eingabe
      $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
      ]);

      // Benutzer finden in der Datenbank
      $user = User::where('email', $credentials['email'])->first();

      if (!$user) {
        return response()->json([
          'status' => 'error',
          'message' => 'Kein Benutzer mit dieser E-Mail gefunden',
        ], 404);
      }

      // Passwort überprüfen
      if (!\Hash::check($credentials['password'], $user->password)) {
        return response()->json([
          'status' => 'error',
          'message' => 'Das Passwort ist falsch',
        ], 401);
      }

      // Prüfen ob aktive Tokens existieren
      if ($user->tokens()->count() > 0) {
        return response()->json([
          'status' => 'error',
          'message' => 'Sie sind bereits eingeloggt. Bitte melden Sie sich zuerst ab.',
          'errorCode' => 'ALREADY_LOGGED_IN'
        ], 403);
      }

      // Neuen Token erstellen
      $token = $user->createToken('bearer', [
        'device' => $request->header('User-Agent'),
        'ip' => $request->ip()
      ]);

      Log::info('Benutzer eingeloggt', [
        'user_id' => $user->id,
        'ip' => $request->ip(),
        'device' => $request->header('User-Agent')
      ]);

      return response()->json([
        'status' => 'success',
        'message' => 'Login war erfolgreich',
        'token' => $token->plainTextToken,
        'user' => $user,
      ], 200);
    } catch (\Exception $e) {
      Log::error('Login-Fehler: ' . $e->getMessage());
      return response()->json([
        'status' => 'error',
        'message' => 'Ein Fehler ist aufgetreten'
      ], 500);
    }
  }

  //logout
  public function logout(Request $request)
  {
    try {
      $user = Auth::user();

      // Alle Tokens des Users löschen
      $user->tokens()->delete();

      Log::info('Benutzer ausgeloggt', [
        'user_id' => $user->id,
        'ip' => $request->ip()
      ]);

      return response()->json([
        'status' => 'success',
        'message' => 'Logout war erfolgreich'
      ], 200);
    } catch (\Exception $e) {
      Log::error('Logout-Fehler: ' . $e->getMessage());
      return response()->json([
        'status' => 'error',
        'message' => 'Ein Fehler ist aufgetreten'
      ], 500);
    }
  }


  // Force Logout - Administratoren können andere User ausloggen

  public function forceLogout(Request $request)
  {
    try {
      $userId = $request->input('user_id');
      $user = User::findOrFail($userId);

      // Alle Tokens des Users löschen
      $user->tokens()->delete();

      Log::info('Force Logout durchgeführt', [
        'admin_id' => Auth::id(),
        'target_user_id' => $userId
      ]);

      return response()->json([
        'status' => 'success',
        'message' => 'Benutzer wurde ausgeloggt'
      ], 200);
    } catch (\Exception $e) {
      Log::error('Force Logout Fehler: ' . $e->getMessage());
      return response()->json([
        'status' => 'error',
        'message' => 'Ein Fehler ist aufgetreten'
      ], 500);
    }
  }


  // Prüft Login-Status des Benutzers

  public function checkLoginStatus(Request $request)
  {
    try {
      $user = Auth::user();
      $token = $request->user()->currentAccessToken();

      return response()->json([
        'status' => 'success',
        'isLoggedIn' => true,
        'user' => $user,
        'sessionInfo' => [
          'created_at' => $token->created_at,
          'last_used' => $token->last_used_at,
          'device' => $request->header('User-Agent'),
          'ip' => $request->ip()
        ]
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'status' => 'error',
        'isLoggedIn' => false,
        'message' => 'Nicht eingeloggt'
      ], 401);
    }
  }
}
