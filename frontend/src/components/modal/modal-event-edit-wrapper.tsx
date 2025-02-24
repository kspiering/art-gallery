"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Event } from "@/types/enums/event";
import { toast } from "sonner";
import { EventDetail } from "@/app/event/[id]/event-detail";
import { useRouter } from "next/navigation";
import { Modal } from "./modal";
import { EventData } from "@/app/page";

interface ModalEventEditWrapperProps {
  data: EventData;
  userId?: number;
  returnPath?: string;
}

export const ModalEventEditWrapper = ({
  data,
  userId,
  returnPath,
}: ModalEventEditWrapperProps) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: data.title,
    content: data.content,
    longDescription: data.longDescription,
    date: data.date,
    time: data.time,
    location: data.location,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/events/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Event wurde erfolgreich aktualisiert");
        setIsEditing(false);
        router.refresh();
      } else {
        toast.error("Fehler beim Aktualisieren des Events");
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Events:", error);
      toast.error("Fehler beim Aktualisieren des Events");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (returnPath) {
      router.push(returnPath);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="w-24 h-8 px-4 py-1.5 bg-blue-400 hover:bg-blue-500 text-white rounded-full text-sm transition-colors flex items-center justify-center"
      >
        Bearbeiten
      </button>

      <Modal
        key={data.id}
        title={data.title}
        openModal={openModal}
        setOpenModal={handleCloseModal}
        contentClassName="w-2/3 max-w-3xl max-h-[500px] sm:max-h-[700px] overflow-y-auto bg-[#fffbf1]"
      >
        {isEditing ? (
          <div
            className="fixed inset-0 bg-black/60 z-10 flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              className="fixed inset-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(false);
              }}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleUpdate(e);
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="space-y-4 p-4 bg-[#fffbf1 ] rounded-lg shadow w-[500px] relative"
            >
              <Input
                name="title"
                placeholder="Titel"
                className="border-gray-600 mb-4"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Input
                name="content"
                placeholder="Kurzbeschreibung"
                className="border-gray-600 mb-4"
                value={formData.content}
                onChange={handleInputChange}
              />
              <Input
                name="longDescription"
                placeholder="Inhalt"
                className="border-gray-600 mb-4"
                value={formData.longDescription}
                onChange={handleInputChange}
              />
              <Input
                name="date"
                placeholder="Datum (YYYY-MM-DD)"
                className="border-gray-600 mb-4"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.date}
                onChange={handleInputChange}
              />
              <Input
                name="time"
                placeholder="Zeit (HH:MM)"
                className="border-gray-600 mb-4"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
              />
              <Input
                name="location"
                placeholder="Ort"
                className="border-gray-600 mb-4"
                value={formData.location}
                onChange={handleInputChange}
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors"
                >
                  Speichern
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditing(false);
                  }}
                  className="px-4 py-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full text-sm transition-colors cursor-pointer"
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-4">
            <EventDetail data={data} userId={userId} />
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors"
            >
              Bearbeiten
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};
