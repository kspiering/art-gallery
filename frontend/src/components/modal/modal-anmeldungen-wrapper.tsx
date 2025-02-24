"use client";

import { Modal } from "./modal";
import { useState } from "react";

interface EventRegistrations {
  id: number;
  userId: number;
  userName: string;
  eventId: number;
  status: string;
  createdAt: string;
}

interface ModalAnmeldungenWrapperProps {
  anmeldungen: EventRegistrations[];
}

export const ModalAnmeldungenWrapper = ({
  anmeldungen,
}: ModalAnmeldungenWrapperProps) => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <Modal
      title="Anmeldungen"
      openModal={openModal}
      setOpenModal={setOpenModal}
      contentClassName="w-4/5 max-w-3xl max-h-[600px] sm:max-h-[800px] overflow-y-auto"
    >
      <div className="p-6">
        <div className="anmeldungen-list space-y-4">
          {anmeldungen.length === 0 ? (
            <p>Noch keine Anmeldungen vorhanden</p>
          ) : (
            anmeldungen.map((anmeldung) => (
              <div key={anmeldung.id} className="p-4 border rounded">
                <p className="font-semibold">{anmeldung.userName}</p>
                <p className="text-sm text-gray-600">
                  Status: {anmeldung.status}
                </p>
                <p className="text-sm text-gray-500">
                  Angemeldet am:{" "}
                  {new Date(anmeldung.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
        <p className="mt-4 text-gray-700">
          Gesamt: {anmeldungen.length} Anmeldung(en)
        </p>
      </div>
    </Modal>
  );
};
