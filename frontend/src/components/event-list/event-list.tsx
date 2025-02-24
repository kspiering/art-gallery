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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Palette } from "lucide-react";

// Verbindung zu Backend API
async function getEvents() {
  try {
    const response = await dataFetch("http://127.0.0.1:8000/api/events");

    // Info für Debugging
    console.log("API Antwort:", response);

    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Fehler beim Abrufen der Events:", error);
    return [];
  }
}

export default function EventList() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  // Events beim ersten Render laden
  React.useEffect(() => {
    getEvents().then((fetchedEvents) => {
      // Sortiere Events nach Datum (neueste zuerst)
      const sortedEvents = fetchedEvents.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setEvents(sortedEvents);
    });
  }, []);

  // Berechne die aktuelle Seite
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

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
        {currentEvents.map((event: EventData) => (
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

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="hover:bg-purple-100 hover:text-purple-700 cursor-pointer"
                />
              </PaginationItem>
            )}

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                  className={
                    currentPage === index + 1
                      ? "bg-purple-400 text-white hover:bg-purple-500"
                      : "hover:bg-purple-100 hover:text-purple-700"
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="hover:bg-purple-100 hover:text-purple-700 cursor-pointer"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
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
