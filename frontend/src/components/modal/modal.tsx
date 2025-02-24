"use client";

import { useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  openModal?: boolean;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({
  title,
  description,
  children,
  overlayClassName,
  contentClassName,
  openModal = true,
  setOpenModal,
}: ModalProps) => {
  const router = useRouter();

  const handleOpenChange = () => {
    if (setOpenModal) {
      setOpenModal(false);
    } else {
      router.back();
    }
  };

  return (
    <Dialog
      defaultOpen={openModal}
      open={openModal}
      onOpenChange={handleOpenChange}
    >
      <DialogOverlay className={overlayClassName}>
        <DialogContent className={contentClassName}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
