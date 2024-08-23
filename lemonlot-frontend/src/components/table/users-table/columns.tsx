import { ColumnDef } from "@tanstack/react-table";
import UserActions from "./UserActions";

export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      // Pass the user and the onDelete function to UserActions
      return (
        <UserActions
          user={user}
          onDelete={(userToDelete) => console.log("Delete user:", userToDelete)}
        />
      );
    },
  },
];
