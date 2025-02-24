import EventList from "@/components/event-list/event-list";
import { EventListSkeleton } from "@/components/skeletons/event-list-skeleton";
import { Breadcrumbs } from "@/components/breadcrumbs/breadcrumbs";
import { Suspense } from "react";

export interface EventData {
  id: number;
  title: string;
  content: string;
  longDescription: string;
  location: string;
  date: string;
  time: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

// Zeigt alle erstellten Events an
export default async function Home() {
  return (
    <div>
      <Breadcrumbs />
      <h1 className="sm:text-3xl text-center sm:text-left">Ausstellungen</h1>
      <h2 className="sm:text-2xl text-center sm:text-left">Aktuell</h2>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<EventListSkeleton />}>
          <EventList />
        </Suspense>
      </div>
    </div>
  );
}
