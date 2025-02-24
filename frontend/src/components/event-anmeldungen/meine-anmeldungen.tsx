"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RegisteredEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
}

export default function MeineAnmeldungen() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<RegisteredEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      fetchRegisteredEvents();
    }
  }, [session]);

  const fetchRegisteredEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/user-registered-events",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Laden der Events");
      }

      const responseData = await response.json();

      if (responseData && responseData.data) {
        const transformedEvents = responseData.data.map((item: any) => ({
          id: item.event.id,
          title: item.event.title,
          date: item.event.date,
          time: item.event.time,
          location: item.event.location,
          address: item.event.address,
        }));
        setEvents(transformedEvents);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Fehler:", error);
      toast.error("Es gab einen Fehler beim Laden der Events", {
        position: "bottom-center",
      });
      setEvents([]);
    }
  };

  const handleUnregister = async (eventId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/eventRegistrations`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            email: session?.user?.email,
            event_id: eventId,
          }),
        }
      );

      if (response.ok) {
        toast.success("Erfolgreich abgemeldet", {
          position: "bottom-center",
        });
        await fetchRegisteredEvents();
        setOpen(false);
      } else {
        throw new Error("Fehler beim Abmelden");
      }
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
      toast.error("Fehler beim Abmelden vom Event");
    }
  };

  return (
    <div className="p-4">
      {events.length === 0 ? (
        <p>Sie sind derzeit für keine Events angemeldet.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="w-full">
              <div className="p-6 w-full border border-purple-400 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                  <div className="flex flex-col p-0">
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      Datum: {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Zeit: {event.time} Uhr
                    </div>
                    <div className="text-sm text-gray-500">
                      Ort: {event.location}
                    </div>
                    <div className="text-sm text-gray-500">
                      Adresse: {event.address}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setSelectedEventId(event.id)}
                          className="inline-flex items-center justify-center w-28 h-10 md:w-32 md:h-10 px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors"
                        >
                          Abmelden
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#fffbf1] rounded-lg shadow w-[90%] sm:w-[500px] max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Von Event abmelden</DialogTitle>
                          <DialogDescription>
                            Bist du sicher, dass du dich von diesem Event
                            abmelden möchtest?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-4 mt-4">
                          <button
                            onClick={() => setOpen(false)}
                            className="px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors cursor-pointer"
                          >
                            Abbrechen
                          </button>
                          <button
                            onClick={() =>
                              selectedEventId &&
                              handleUnregister(selectedEventId)
                            }
                            className="px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251]  text-white rounded-full text-sm transition-colors"
                          >
                            Ja, abmelden
                          </button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
