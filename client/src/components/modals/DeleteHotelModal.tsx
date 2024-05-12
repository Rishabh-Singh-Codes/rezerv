import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalContext } from "@/contexts/ModalContext";
import { useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

export function DeleteHotelModal() {
  const [confimMessage, setConfimMessage] = useState<string>("");
  const { isOpen, onClose, type, data: hotel } = useModalContext();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const isModalOpen = isOpen && type === "deleteHotel";
  const isBtnDisabled = confimMessage !== `Delete ${hotel?.name}`;

  const { mutate, isLoading } = useMutation(apiClient.deleteMyHotelById, {
    onSuccess: () => {
      showToast({ type: "SUCCESS", message: "Hotel deleted successfully" });
      onClose();
      navigate("/my-hotels");
    },
    onError: () => {
      showToast({ type: "ERROR", message: "Error deleting hotel" });
    },
  });

  const handleDelete = () => {
    mutate(hotel?._id || "");
  };

  const handleClose = () => {
    setConfimMessage("");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Delete Hotel</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete his hotel? If yes, please type "
            <span className="font-bold">Delete {hotel?.name}</span>" in the box
            below.
          </DialogDescription>
        </DialogHeader>
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          onChange={(e) => setConfimMessage(e.target.value)}
        />
        <button
          disabled={isLoading || isBtnDisabled}
          className="disabled:bg-gray-400 bg-red-500 text-white p-2 font-bold h-full hover:bg-red-400 text-base rounded-md disabled:cursor-default cursor-pointer transition w-full"
          onClick={handleDelete}
        >
          {isLoading ? "Deleting ..." : "Delete"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
