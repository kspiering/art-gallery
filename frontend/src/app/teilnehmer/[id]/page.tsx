import { authConfig } from "@/auth";
import { EventListSkeleton } from "@/components/skeletons/event-list-skeleton";
import Teilnehmer from "@/components/teilnehmer/teilnehmer";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

const getParticipants = async ({
  eventId,
  token,
}: {
  eventId: string;
  token: string;
}) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/event-participants`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        event_id: eventId,
      }),
    }
  );

  return response.json();
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const session = await getServerSession(authConfig);
  if (!session) return;
  const token = session.accessToken;

  const eventParticipants = await getParticipants({
    eventId: id,
    token: token,
  });

  return (
    <div className="p-4 md:p-6">
      <h1 className="sm:text-3xl text-center sm:text-left">Teilnehmer</h1>
      <h2 className="sm:text-2xl text-center sm:text-left">
        Liste der angemeldeten Teilnehmer
      </h2>
      <Suspense fallback={<EventListSkeleton />}>
        <Teilnehmer participants={eventParticipants.data} />
      </Suspense>
    </div>
  );
}
