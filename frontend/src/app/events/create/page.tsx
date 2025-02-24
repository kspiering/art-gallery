"use client";

import React from "react";
import EventCreate from "@/components/buttons/event-create";
import { PencilLine } from "lucide-react";

export default function CreateEventPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-6">
          <div>
            <h1 className="flex items-center gap-2 flex-row sm:text-3xl text-center sm:text-left">
              Event erstellen <PencilLine className="w-5 h-5 md:w-8 md:h-8" />
            </h1>
            <h2 className="text-xl">Deine Ausstellungen zum Leben erwecken</h2>
          </div>
        </div>
        {/* Event Erstellen */}
        <EventCreate />
      </div>
    </div>
  );
}
