"use client";
import Link from "next/link";
import { LogoutButton } from "../buttons/logout-button";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { CircleUserRound } from "lucide-react";

export const HeaderAvatar = () => {
  const { data: session, status } = useSession();

  // Wenn die Session geladen wird, ein Skeleton angezeigt
  if (status === "loading") {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }

  // Login Button zeigen
  return session === null ? (
    <Link
      href={"/session"}
      className="text-white font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
      [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#8EAD84] hover:bg-[#5C8251] text-white shadow h-10 w-32 px-8"
    >
      Login
    </Link>
  ) : (
    // Bei Anmeldung Navigation anzeigen
    <>
      <div className="text-[#272626] hidden md:flex items-center gap-6">
        <Link
          href={"/events"}
          className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
        >
          Event Übersicht
        </Link>
        <Link
          href={"/event-anmeldungen"}
          className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
        >
          Meine Anmeldungen
        </Link>
        <Link href={"/profile"} className="text-purple-400 relative group">
          <CircleUserRound />
          <span className="absolute hidden group-hover:block bg-purple-400 text-white text-sm px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            Profil
          </span>
        </Link>
        <LogoutButton />
      </div>

      {/* Mobile Navigation */}
      <div className="text-[#272626] flex md:hidden flex-col gap-4">
        <Link
          href={"/events"}
          className="text-black relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
        >
          Event Übersicht
        </Link>
        <Link
          href={"/event-anmeldungen"}
          className="text-black relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
        >
          Meine Anmeldungen
        </Link>
        <Link href={"/profile"} className="text-purple-400 relative group">
          <CircleUserRound />
          <span className="absolute hidden bg-purple-400 text-white text-sm px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            Profil
          </span>
        </Link>
        <LogoutButton />
      </div>
    </>
  );
};
