import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "./columns";

type TransactionActionsProps = {
  transaction: Transaction;
  currentUserId: number;
  onAccept: (transaction: Transaction) => void;
  onReject: (transaction: Transaction) => void;
  onCancel: (transaction: Transaction) => void;
};

export default function TransactionActions({
  transaction,
  currentUserId,
  onAccept,
  onReject,
  onCancel,
}: TransactionActionsProps) {
  const isSalesperson = transaction.salespersonId === currentUserId;
  const isCustomer = transaction.userId === currentUserId;

  return (
    <div className="flex space-x-2">
      {isSalesperson && (
        <>
          <Button
            variant="ghost"
            onClick={() => onAccept(transaction)}
            className="text-green-500"
          >
            <Check />
          </Button>
          <Button
            variant="ghost"
            onClick={() => onReject(transaction)}
            className="text-red-500"
          >
            <X />
          </Button>
        </>
      )}
      {isCustomer && (
        <Button
          variant="ghost"
          onClick={() => onCancel(transaction)}
          className="text-yellow-500"
        >
          Cancel
        </Button>
      )}
    </div>
  );
}
