"use client";

import { EventDetail } from "@/app/event/[id]/event-detail";
import { useRouter } from "next/navigation";
import { Modal } from "./modal";
import { EventData } from "@/app/page";
import { useState, useEffect } from "react";

interface ModalEventWrapperProps {
  data: EventData;
  userId?: number;
}

export const ModalEventWrapper = ({ data, userId }: ModalEventWrapperProps) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    router.back();
  };

  return (
    <Modal
      key={data.id}
      title={data.title}
      openModal={openModal}
      setOpenModal={handleCloseModal}
      contentClassName="w-2/3 max-w-3xl max-h-[400px] sm:max-h-[700px] overflow-y-auto bg-[#fffbf1]"
    >
      <div className="p-4">
        <div className="mb-4">
          <p className="font-semibold">Datum:</p>
          <p>
            {new Date(data.date).toLocaleDateString("de-DE")} | {data.time} Uhr
          </p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Ort:</p>
          <p>{data.location}</p>
          <p>{data.address}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Beschreibung:</p>
          <p className="whitespace-pre-wrap break-words">
            {data.longDescription}
          </p>
        </div>
        <EventDetail data={data} userId={userId} setOpenModal={setOpenModal} />
      </div>
    </Modal>
  );
};
