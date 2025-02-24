import dataFetch, { dataFetchWithToken } from "@/lib/data-fetch";
import { EventData } from "@/app/page";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { ModalEventWrapper } from "@/components/modal/modal-event-wrapper";

// Event Detail
async function getEventDetail(id: number) {
  // Fetch vom Backend
  return await dataFetch(`${process.env.BACKEND_URL}/api/events?id=${id}`);
}

// Aktueller Benutzer
async function getCurrentUser() {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return null;
  }

  return await dataFetchWithToken(
    `${process.env.BACKEND_URL}/api/user`,
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

  return <ModalEventWrapper data={data} userId={user?.id} />;
}
