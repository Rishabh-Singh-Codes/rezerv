import { DeleteHotelModal } from "@/components/modals/DeleteHotelModal";
import React, { useContext, useState } from "react";
import { HotelType } from "../../../server/src/shared/types";

type ModalType = "deleteHotel" | "addHotel";

type ModalData = HotelType | null;

type ModalContext = {
  type: ModalType | null;
  data?: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
};

const ModalContext = React.createContext<ModalContext | undefined>(undefined);

type ModalContextProviderProps = {
  children: React.ReactNode;
};

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [type, setType] = useState<ModalType | null>(null);
  const [data, setData] = useState<ModalData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const handleOpen = (type: ModalType, data?: ModalData) => {
    setIsOpen(true);
    setType(type);
    setData(data);
  };

  const handleClose = () => {
    setIsOpen(false);
    setType(null);
    setData(null);
  };

  return (
    <ModalContext.Provider
      value={{
        type,
        data,
        isOpen,
        onOpen: (type, data) => handleOpen(type, data),
        onClose: () => handleClose(),
      }}
    >
        <DeleteHotelModal />
      {children}
    </ModalContext.Provider>
  );
};


export const useModalContext = () => {
    const context = useContext(ModalContext);
    return context as ModalContext;
}