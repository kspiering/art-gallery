import { EventListSkeleton } from "@/components/skeletons/event-list-skeleton";
import UserData from "@/components/user-profile/user-profile";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="sm:text-3xl text-center sm:text-left">
        Willkommen zurück!
      </h1>
      <h2 className="sm:text-2xl text-center sm:text-left">
        Hier deine Accountdaten
      </h2>
      <Suspense fallback={<EventListSkeleton />}>
        <UserData />
      </Suspense>
    </div>
  );
}
