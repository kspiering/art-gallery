"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LogoutButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // Asynchrone Funktion für den Logout-Prozess
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.status === 200) {
        signOut();
        router.push("/");
      } else {
        toast.error("Fehler beim Abmelden. Bitte versuche es erneut.");
      }
    } catch (error) {
      toast.error("Ein unerwarteter Fehler ist aufgetreten.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-red-400 hover:bg-red-500 text-white shadow h-10 px-8"
    >
      Logout
    </button>
  );
};
