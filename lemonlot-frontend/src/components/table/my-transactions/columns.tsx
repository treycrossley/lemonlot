import { ColumnDef } from "@tanstack/react-table";
import TransactionActions from "./TransactionActions"; // Adjust the import path as needed

export type Transaction = {
  transactionId: number;
  userId: number;
  salespersonId: number;
  carId: number;
  date: string; // ISO string representation of LocalDate
  amount: number;
  status: string;
  payment_method: string;
  offerAmount?: number;
  comments: string;
  createdAt: string; // ISO string representation of LocalDateTime
  updatedAt: string; // ISO string representation of LocalDateTime
};

// Function to get columns dynamically
export const getColumns = (
  includeActions: boolean,
  currentUserId: number,
  onCancel?: (transaction: Transaction) => void,
  onAccept?: (transaction: Transaction) => void,
  onReject?: (transaction: Transaction) => void
): ColumnDef<Transaction>[] => {
  const baseColumns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "transactionId",
      header: "Transaction ID",
    },
    {
      accessorKey: "userId",
      header: "User ID",
    },
    {
      accessorKey: "salespersonId",
      header: "Salesperson ID",
    },
    {
      accessorKey: "carId",
      header: "Car ID",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return new Date(value).toLocaleDateString();
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return `$${value.toFixed(2)}`;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "comments",
      header: "Comments",
    },
  ];

  if (includeActions) {
    baseColumns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <TransactionActions
          transaction={row.original}
          currentUserId={currentUserId}
          onAccept={onAccept || (() => {})}
          onReject={onReject || (() => {})}
          onCancel={onCancel || (() => {})} // Pass the handleCancel function
        />
      ),
    });
  }

  return baseColumns;
};

