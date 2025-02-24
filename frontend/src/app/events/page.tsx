import { authConfig } from "@/auth";
import dataFetch, { dataFetchWithToken } from "@/lib/data-fetch";
import { getServerSession } from "next-auth";
import { PlusIcon } from "lucide-react";
import { LinkButton } from "@/components/buttons/link-button";
import { EventCard } from "@/components/edit-event/event-card";
import { Event } from "@/types/enums/event";

async function getUserEvents() {
  const session = await getServerSession(authConfig);
  if (!session?.accessToken) return null;

  const user = await dataFetchWithToken(
    `${process.env.BACKEND_URL}/api/user`,
    session.accessToken
  );
  return await dataFetch(
    `${process.env.BACKEND_URL}/api/events?user_id=${user.id}`
  );
}

export default async function EventsPage() {
  const data: Event[] = (await getUserEvents()) || [];

  return (
    <>
      <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="sm:text-3xl text-center sm:text-left">Meine Events</h1>
          <h2 className="sm:text-2xl text-center sm:text-left">
            Maximal 5 Events pro Account
          </h2>
        </div>

        <LinkButton
          href={"/events/create"}
          className="font-semibold px-4 py-2 sm:px-5 sm:py-2.5 text-base sm:text-lg text-center flex items-center justify-center gap-1"
        >
          Event
          <PlusIcon className="ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        </LinkButton>
      </div>

      <div className="w-full p-4">
        {data?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <LinkButton
        href={"/events/create"}
        className="font-semibold px-4 py-2 sm:px-5 sm:py-2.5 text-base sm:text-lg text-center flex items-center justify-center gap-1"
      >
        Event
        <PlusIcon className="ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      </LinkButton>
    </>
  );
}
