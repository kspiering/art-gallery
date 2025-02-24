import dataFetch, { dataFetchWithToken } from "@/lib/data-fetch";
import { EventDetail } from "@/components/event-detail/event-detail";
import { EventData } from "@/app/ausstellungen/page";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

async function getEventDetail(id: number) {
  return await dataFetch(`http://localhost:8000/api/events?id=${id}`);
}

async function getCurrentUser() {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return null;
  }

  return await dataFetchWithToken(
    `http://localhost:8000/api/user`,
    session.accessToken
  );
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const data: EventData = await getEventDetail(id);

  const user = await getCurrentUser();

  return (
    <div>
      <EventDetail data={data} userId={user?.id} />
    </div>
  );
}
