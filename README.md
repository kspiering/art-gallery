# The Art Gallery

The Art Gallery ist eine Web-App, die es Künstlern und Kunstliebhabern in der Schweiz ermöglicht, ihre Kunstwerke zu teilen und zu präsentieren in dem sie ihre Ausstellungen auf der Web-App bekannt geben.

## Anmeldung

Registriere dich und melde dich anschliessend an.

# Lokale Installation

Diese Anleitung hilft dir dabei, das Projekt lokal auf deinem Rechner zum Laufen zu bringen.

## Voraussetzungen

- Node.js (Version 16 oder höher)
- Tailwind CSS
- npm
- Laravel
- Next.js
- NextAuth.js
- Shadcn UI

## Installation

### 1. Dependencies installieren

Öffne zwei separate Terminal-Fenster und installiere die notwendigen Dependencies:

#### Terminal 1 (Backend):

```bash
cd backend
npm install
```

#### Terminal 2 (Frontend):

```bash
cd frontend
npm install
```

### 2. Backend und Frontend starten

Öffne zwei separate Terminal-Fenster:

#### Terminal 1 (Backend):

```bash
cd backend
npm run serve
```

#### Terminal 2 (Frontend):

```bash
cd frontend
npm run dev
```

### 3. Frontend aufrufen

Frontend: Die Anwendung ist nun unter `http://localhost:3000` im Webbrowser erreichbar.

Backend: Das Backend läuft auf `http://localhost:8000`.

## Problembehebung

Falls Probleme auftreten:

1. Stelle sicher, dass alle Dependencies korrekt installiert sind
2. Lösche den `.next` Ordner und node_modules
3. Führe erneut `npm install` aus
4. Starte Backend (`npm run serve`) und Frontend (`npm run dev`) neu

## Durchführung der Tests

### User anmelden

1. Öffne die Anwendung unter `http://localhost:3000`
2. Klicke auf den grünen Button "Login"
3. Gib die Zugangsdaten deines Accounts ein

4. Klicke auf den Button "Anmelden"
5. Du solltest nun erfolgreich angemeldet sein

### Event erstellen

1. Klicke auf den Button "Anmelden"
2. Klicke auf den Navigationspunkt "Event Übersicht"
3. Klicke auf den Button "Event +"
4. Fülle alle Felder aus und klicke auf den Button "Erstellen"
5. Klicke auf den Navigationspunkt "Event Übersicht", hier kannst du den erstellten Event sehen (auch sollte er beim Navigationspunkt "Ausstellungen" zu sehen sein)
6. Bei der Event Übersicht kannst du den Event löschen, indem du auf den Button "Löschen" klickst
7. Bei der Event Übersicht kannst du den Event bearbeiten, indem du auf den Button "Bearbeiten" klickst
8. Bei der Event Übersicht kannst du die Anmeldungen sehen, indem du auf den Button "Teilnehmer" klickst

### Event anmelden

1. Klicke auf den Navigationspunkt "Ausstellungen", hier kannst du alle Events sehen
2. Klicke auf den Button "Anmelden", beim Event für welchen du dich anmelden möchtest
3. Die Daten für die Anmeldung werden automatisch ausgefüllt, klicke auf den Button "Anmelden"
4. Du solltest nun erfolgreich angemeldet sein

### Event abmelden

1. Klicke auf den Navigationspunkt "Meine Anmeldungen", hier kannst du alle Events sehen, bei denen du dich angemeldet hast
2. Klicke auf den Button "Abmelden", beim Event für welchen du dich abmelden möchtest
3. Du solltest nun erfolgreich abgemeldet sein

### User Daten bearbeiten

1. Klicke auf den Navigationspunkt "Profil", hier kannst du deine Daten sehen (das Profil wird mit einem Icon in Lila dargestellt)
2. Klicke auf den Button "Bearbeiten", hier kannst du deine Daten bearbeiten
3. Du solltest nun erfolgreich deine Daten bearbeitet haben

### User löschen

1. Klicke auf den Navigationspunkt "Profil", hier kannst du deine Daten sehen
2. Klicke auf den Button "Löschen", hier kannst du deinen Account löschen
3. Du solltest nun erfolgreich deinen Account gelöscht haben und alle von dir erstellten Events

### User abmelden

1. Klicke auf den Button "Logout", hier kannst du dich abmelden
2. Du solltest nun erfolgreich abgemeldet sein
