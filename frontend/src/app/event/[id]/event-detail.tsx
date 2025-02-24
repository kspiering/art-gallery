"use client";

import { EventData } from "@/app/page";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface EventDataProps {
  data: EventData;
  userId?: number;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

export function EventDetail({ data, userId, setOpenModal }: EventDataProps) {
  const router = useRouter();

  return (
    <>
      {/* <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
      {userId === data.user_id && ( */}
      {/* 
      <Button
        className="max-w-[200px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm transition-colors"
        onClick={() => {
          router.push(`/events/edit/${data.id}`);
          if (setOpenModal) setOpenModal(false);
        }}
      >
        Anmelden
      </Button> */}
      {/* // )} */}

      {/* <TipTapViewer content={data.content} /> */}
    </>
  );
}
