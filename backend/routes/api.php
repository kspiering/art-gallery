<?php
// User
use App\Controllers\UserController;
use App\Controllers\AuthController;
// Events
use App\Controllers\EventsController;
// Event Registration
use App\Controllers\EventRegistrationController;

use Illuminate\Support\Facades\Route;

// Öffentliche Routen (keine Authentifizierung erforderlich)
Route::post('/user', [UserController::class, 'create']); // Benutzer erstellen (Registrierung)
Route::post('/auth/login', [AuthController::class, 'login']); // Login
Route::get('/events', [EventsController::class, 'index']); // Liste der Events anzeigen
Route::get('/eventRegistrations', [EventRegistrationController::class, 'index']); // Liste der Event-Registrierungen
// Route::post('/eventRegistrations', [EventRegistrationController::class, 'create']); // Anmelden für ein Event 

// Geschützte Routen (nur mit Authentifizierung über Sanctum zugänglich)
Route::middleware(['auth:sanctum'])->group(function () {

  // Benutzeraktionen
  Route::get('/user', [UserController::class, 'index']); // Benutzerinformationen anzeigen
  Route::patch('/user', [UserController::class, 'update']); // Benutzerinformationen aktualisieren
  Route::delete('/user', [UserController::class, 'delete']); // Benutzer löschen

  // Authentifizierung
  Route::post('/auth/logout', [AuthController::class, 'logout']); // Logout
  // Auth routes
  Route::get('/auth/status', [AuthController::class, 'checkLoginStatus']);
  // Nur für Admins
  Route::post('/auth/force-logout', [AuthController::class, 'forceLogout'])->middleware('admin');

  // Events erstellen
  Route::post('/events', [EventsController::class, 'create']); // Event erstellen
  Route::patch('/events', [EventsController::class, 'update']); // Event aktualisieren
  Route::delete('/events', [EventsController::class, 'destroy']); // Event löschen

  // Event Registration
  Route::get('/eventRegistrations', [EventRegistrationController::class, 'index']); // Liste der Registrierungen für ein Event
  Route::post('/eventRegistrations', [EventRegistrationController::class, 'create']); // Anmelden für ein Event 
  Route::delete('/eventRegistrations', [EventRegistrationController::class, 'destroy']); // Registrierung löschen

  // Ansicht für alle Events wo der User registriert ist
  Route::get('/user-events', [EventRegistrationController::class, 'getUserEvents']);

  // Anzahl Teilnehmer für Event
  Route::get('/participant-count', [EventRegistrationController::class, 'getParticipantCount']);

  // Teilnehmerliste für Event
  Route::post('/event-participants', [EventRegistrationController::class, 'getEventParticipants']);

  // Registrierte Events des Users
  Route::get('/user-registered-events', [EventRegistrationController::class, 'getUserRegisteredEvents']);
});
