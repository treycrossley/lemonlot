import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { Car } from "./columns"; // Adjust the import path as needed
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CarActionsProps {
  car: Car;
  onDelete: (car: Car) => void;
}

const CarActions: React.FC<CarActionsProps> = ({ car, onDelete }) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const handleEdit = () => {
    navigate(`/edit-car/${car.id}`);
  };

  const handleDeleteClick = () => {
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${car.id}`);
      onDelete(car); // Callback function to handle post-deletion logic
      toast({
        title: "Success",
        description: "Car deleted successfully.",
      });
      setShowDialog(false);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "An unknown error occurred";

      toast({
        title: "Delete Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setShowDialog(false);
    }
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <button onClick={handleEdit} className="p-2 text-blue-500">
        <Pencil className="w-5 h-5" />
      </button>
      <button onClick={handleDeleteClick} className="p-2 text-red-500">
        <Trash className="w-5 h-5" />
      </button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this car? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarActions;
