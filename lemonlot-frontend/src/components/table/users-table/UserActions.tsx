import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { User } from "./columns"; // Adjust the import path as needed
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { getSub } from "@/lib/authUtil";
import { useLocalStorage } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserActionsProps {
  user: User;
  onDelete: (user: User) => void;
}

const UserActions: React.FC<UserActionsProps> = ({ user, onDelete }) => {
  const navigate = useNavigate();
  const [token] = useLocalStorage("auth_token", "");
  const [showDialog, setShowDialog] = useState(false);

  const handleEdit = () => {
    navigate(`/edit-user/${user.id}`);
  };

  const handleDeleteClick = () => {
    const userId = user.id.toString(); // Convert user.id to a string
    const sub = getSub(token);

    if (sub !== null && userId === sub) {
      toast({
        title: "Error",
        description: "You cannot delete your own account.",
        variant: "destructive",
      });
      return;
    }

    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${user.id}`);
      onDelete(user); // Callback function to handle post-deletion logic
      toast({
        title: "Success",
        description: "User deleted successfully.",
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
              Are you sure you want to delete this user? This action cannot be
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

export default UserActions;
