"use client";

import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const DeleteButton = () => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Accounts");
      }

      toast.success("Account wurde erfolgreich gelöscht", {
        position: "bottom-center",
      });
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Fehler:", error);
      toast.error("Es gab einen Fehler beim Löschen des Accounts", {
        position: "bottom-center",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center w-28 h-10 md:w-32 md:h-10 px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors">
          Löschen
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#fffbf1] rounded-lg shadow w-[90%] sm:w-[500px] max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Account löschen</DialogTitle>
          <DialogDescription>
            Bist du sicher, dass du deinen Account löschen möchtest? Diese
            Aktion kann nicht rückgängig gemacht werden.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Abbrechen
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors"
          >
            Ja, löschen
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
