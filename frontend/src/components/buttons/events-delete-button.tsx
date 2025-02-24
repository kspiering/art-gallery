"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const DeleteEvent = ({ eventId }: { eventId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleEventDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/events`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          id: eventId,
        }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Events");
      }

      toast.success("Event wurde erfolgreich gelöscht.", {
        position: "bottom-center",
      });

      router.refresh();
      router.push("/events");
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      toast.error("Fehler beim Löschen des Events", {
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
          <DialogTitle>Event löschen</DialogTitle>
          <DialogDescription>
            Bist du sicher, dass du dieses Event löschen möchtest? Diese Aktion
            kann nicht rückgängig gemacht werden.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors cursor-pointer"
          >
            Abbrechen
          </button>
          <button
            onClick={() => {
              handleEventDelete();
              setOpen(false);
            }}
            className="px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors"
          >
            Ja, löschen
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
