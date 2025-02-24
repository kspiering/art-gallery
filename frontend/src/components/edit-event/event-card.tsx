"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EditButton } from "@/components/buttons/events-edit-button";
import { DeleteEvent } from "@/components/buttons/events-delete-button";
import { Event } from "@/types/enums/event";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LinkButton } from "@/components/buttons/link-button";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { data: session } = useSession();

  return (
    <Card className="p-6 w-full mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
        <div className="flex flex-col p-0">
          <CardContent className="font-semibold p-0">{event.title}</CardContent>
          <CardContent className="text-sm text-gray-600 p-0">
            {event.content}
          </CardContent>
          <CardContent className="text-sm text-gray-500 p-0">
            {new Date(event.date).toLocaleDateString()}
          </CardContent>
          <CardContent className="text-sm text-gray-500 p-0"></CardContent>
        </div>

        <div className="flex flex-col md:flex-row gap-2 items-center md:items-start">
          <LinkButton
            href={`/teilnehmer/${event.id}`}
            className="inline-flex items-center justify-center w-28 h-10 md:w-32 md:h-10 px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors"
          >
            Teilnehmer
          </LinkButton>
          <EditButton event={event} />
          <DeleteEvent eventId={event.id} />
        </div>
      </div>
    </Card>
  );
}
