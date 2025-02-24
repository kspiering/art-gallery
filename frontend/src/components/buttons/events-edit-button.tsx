"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Event } from "@/types/enums/event";
import { toast } from "sonner";

interface EditButtonProps {
  event: Event;
}

export const EditButton = ({ event }: EditButtonProps) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [formData, setFormData] = useState({
    id: event.id,
    title: event.title,
    content: event.content,
    longDescription: event.longDescription,
    date: event.date,
    time: event.time,
    location: event.location,
    address: event.address,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title" && e.target.value.length > 50) {
      setTitleError("Der Titel darf maximal 50 Zeichen lang sein");
      return;
    }
    if (e.target.name === "title") {
      setTitleError("");
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      id: parseInt(formData.id),
      title: formData.title,
      content: formData.content,
      longDescription: formData.longDescription,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      address: formData.address,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/events`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Fehler beim Aktualisieren des Events"
        );
      }

      setIsEditing(false);
      toast.success("Event erfolgreich aktualisiert!", {
        position: "bottom-center",
      });
      window.location.reload();
    } catch (error) {
      console.error("Fehler:", error);
      toast.error("Es gab einen Fehler beim Aktualisieren des Events", {
        position: "bottom-center",
      });
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center justify-center w-28 h-10 md:w-32 md:h-10 px-4 py-1.5 bg-blue-400 hover:bg-blue-500 text-white rounded-full text-sm transition-colors"
      >
        Bearbeiten
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 mt-16 sm:mt-0"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="fixed inset-0" onClick={() => setIsEditing(false)} />

      <form
        onSubmit={handleUpdate}
        onClick={(e) => e.stopPropagation()}
        className="space-y-4 p-4 bg-[#fffbf1] rounded-lg shadow w-full max-w-[500px] max-h-[80vh] overflow-y-auto relative"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Titel
          </label>
          <Input
            id="title"
            name="title"
            placeholder="Titel"
            className={`border-purple-400 ${
              titleError ? "border-red-500" : ""
            }`}
            value={formData.title}
            onChange={handleInputChange}
            maxLength={50}
          />
          {titleError && (
            <p className="text-red-500 text-sm mt-1">{titleError}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kurzbeschreibung
          </label>
          <Input
            id="content"
            name="content"
            placeholder="Kurzbeschreibung"
            className="border-purple-400"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="longDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Inhalt
          </label>
          <textarea
            id="longDescription"
            placeholder="Max. 500 Zeichen"
            className="bg-transparent w-full min-h-[80px] sm:min-h-[100px] p-2 rounded-md border border-purple-400 text-sm sm:text-base resize-y focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
            value={formData.longDescription}
            onChange={(e) =>
              setFormData({ ...formData, longDescription: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Datum
          </label>
          <Input
            id="date"
            name="date"
            placeholder="Datum (YYYY-MM-DD)"
            className="border-purple-400"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Zeit
          </label>
          <Input
            id="time"
            name="time"
            placeholder="Zeit (HH:MM)"
            className="border-purple-400"
            value={formData.time}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Adresse
          </label>
          <Input
            id="address"
            name="address"
            placeholder="Adresse"
            className="border-purple-400"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ort
          </label>
          <Input
            id="location"
            name="location"
            placeholder="Ort"
            className="border-purple-400"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251]  text-white rounded-full text-sm transition-colors"
          >
            Speichern
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="w-full sm:w-auto px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors cursor-pointer"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
};
