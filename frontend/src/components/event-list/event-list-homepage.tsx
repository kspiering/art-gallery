"use client";
import { useState } from "react";
import dataFetch from "@/lib/data-fetch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { EventData } from "@/app/page";
import { EventRegistrationForm } from "../ui/event-registration-form";
import React from "react";
import Link from "next/link";
import { Palette } from "lucide-react";

// Verbindung zu Backend API
async function getEvents() {
  try {
    const response = await dataFetch("http://127.0.0.1:8000/api/events");

    // Info fü Debugging
    console.log("API Antwort:", response);

    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Fehler beim Abrufen der Events:", error);
    return [];
  }
}

export default function EventListHomepage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // Events beim ersten Render laden
  React.useEffect(() => {
    getEvents().then((fetchedEvents) => {
      // Sortiere Events nach Datum (neueste zuerst)
      const sortedEvents = fetchedEvents.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      // Beschränke auf die ersten 3 Events
      const limitedEvents = sortedEvents.slice(0, 3);
      setEvents(limitedEvents);
    });
  }, []);

  // Überprüfung
  if (!events || !Array.isArray(events)) {
    console.error("Events ist kein Array:", events);
    return <div>Keine Events verfügbar</div>;
  }

  // Keine Events vorhanden
  if (events.length === 0) {
    return <div>Keine Events gefunden</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-4">
        {events.map((event: EventData) => (
          <Card key={event.id}>
            <Link href={`/event/${event.id}`}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {event.title}
                  <Palette className="ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{event.content}</p>
                <br />
                <div className="flex flex-col gap-2 mb-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>
                      {new Date(event.date).toLocaleDateString("de-DE")},{" "}
                      {event.time} Uhr
                    </span>
                    |<span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
            </Link>
            <CardFooter className="flex justify-start">
              <Button
                className="px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Event ID selected:", event.id);
                  setSelectedEventId(event.id);
                }}
              >
                Anmelden
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Formular für Event Anmeldung */}
      <EventRegistrationForm
        eventId={selectedEventId || 0}
        isOpen={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />
    </>
  );
}
