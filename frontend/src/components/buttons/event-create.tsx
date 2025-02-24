"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function EventCreate() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [longDescription, setLongDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreateEvent = async () => {
    try {
      if (
        !content ||
        !title ||
        !date ||
        !place ||
        !time ||
        !location ||
        !address ||
        !longDescription
      ) {
        toast.error("Alle Felder müssen ausgefüllt werden", {
          position: "bottom-center",
        });
        return;
      }

      // Validierung des Datums
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        toast.error("Bitte geben Sie das Datum im Format YYYY-MM-DD ein", {
          position: "bottom-center",
        });
        return;
      }

      // Validierung der Zeit
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(time)) {
        toast.error("Bitte geben Sie die Zeit im Format HH:MM ein", {
          position: "bottom-center",
        });
        return;
      }

      const formattedDate = new Date(date);
      if (isNaN(formattedDate.getTime())) {
        toast.error("Ungültiges Datum", {
          position: "bottom-center",
        });
        return;
      }

      // Überprüfung, ob das Datum in der Zukunft liegt
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (formattedDate < today) {
        toast.error("Das Datum muss in der Zukunft liegen", {
          position: "bottom-center",
        });
        return;
      }

      const payload = {
        title: title.trim(),
        content: content.trim(),
        longDescription: longDescription.trim(),
        date: date,
        time: time.trim(),
        location: place.trim(),
        address: address.trim(),
      };

      console.log("Sending payload:", payload);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        throw new Error("Backend-URL ist nicht konfiguriert");
      }

      if (!session?.accessToken) {
        throw new Error("Nicht authentifiziert");
      }

      const response = await fetch(`${backendUrl}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const responseText = await response.text();
        console.error("Raw response:", responseText);

        let errorData;
        try {
          errorData = responseText ? JSON.parse(responseText) : null;
        } catch (e) {
          console.error("Failed to parse error response:", e);
        }

        console.error("Parsed error data:", errorData);

        throw new Error(
          errorData?.message ||
            `Server-Fehler (${response.status}): ${
              errorData?.error ||
              responseText ||
              "Keine weiteren Details verfügbar"
            }`
        );
      }

      const successData = await response.json();
      console.log("Success response:", successData);

      toast.success("Event wurde erfolgreich erstellt", {
        position: "bottom-center",
      });
      router.push("/events");
    } catch (error) {
      console.error("Detaillierter Fehler:", {
        error,
        message: error instanceof Error ? error.message : "Unbekannter Fehler",
        stack: error instanceof Error ? error.stack : undefined,
      });

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Event konnte nicht erstellt werden";

      toast.error(errorMessage, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="w-full mx-auto px-2 sm:p-4">
      <div className="rounded-xl border border-purple-400 bg-card text-card-foreground shadow-sm p-3 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Titel
          </label>
          <Input
            id="title"
            placeholder="Titel"
            className="border-purple-400 text-sm sm:text-base"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Kurzbeschreibung
          </label>
          <Input
            id="content"
            placeholder="Mind. 4 Wörter"
            className="border-purple-400 text-sm sm:text-base"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label
            htmlFor="longDescription"
            className="block text-sm font-medium mb-1"
          >
            Ausführliche Beschreibung
          </label>
          <textarea
            id="longDescription"
            placeholder="Max. 500 Zeichen"
            className="bg-transparent w-full min-h-[100px] p-2 rounded-md border border-purple-400 text-sm sm:text-base resize-y focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Datum
          </label>
          <Input
            id="date"
            placeholder="Datum (YYYY-MM-DD)"
            className="border-purple-400 text-sm sm:text-base"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label htmlFor="time" className="block text-sm font-medium mb-1">
            Zeit
          </label>
          <Input
            id="time"
            placeholder="Zeit (HH:MM)"
            className="border-purple-400 text-sm sm:text-base"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label htmlFor="place" className="block text-sm font-medium mb-1">
            Ort
          </label>
          <Input
            id="place"
            placeholder="Kunsthaus Zürich"
            className="border-purple-400 text-sm sm:text-base"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Adresse
          </label>
          <Input
            id="address"
            placeholder="Strasse 12, 1234 Ort"
            className="border-purple-400 text-sm sm:text-base"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <Button
          onClick={handleCreateEvent}
          className="w-full bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm sm:text-base py-2 sm:py-3 transition-colors"
        >
          Erstellen
        </Button>
      </div>
    </div>
  );
}
