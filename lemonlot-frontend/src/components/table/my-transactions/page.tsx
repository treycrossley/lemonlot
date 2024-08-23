import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "@/components/ui/data-table"; // Adjust the path as needed
import { Transaction, getColumns } from "./columns";
import { useLocalStorage } from "usehooks-ts";
import { getSub } from "@/lib/authUtil";

const fetchMyTransactions = async (
  currentUserId: number
): Promise<Transaction[]> => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API_URL}/transactions`);
    console.log(response.data);
    console.log(currentUserId);

    // Filter transactions by currentUserId
    const filteredTransactions = response.data.filter(
      (transaction: Transaction) =>
        transaction.userId === currentUserId ||
        transaction.salespersonId === currentUserId
    );

    return filteredTransactions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function TransactionTable() {
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>(
    []
  );
  const [completedTransactions, setCompletedTransactions] = useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token] = useLocalStorage("auth_token", "");

  const reloadTransactions = async () => {
    try {
      const userIdString = getSub(token);
      const userId = userIdString ? parseInt(userIdString, 10) : 0;
      const transactions = await fetchMyTransactions(userId);

      const pending = transactions.filter(
        (transaction) => transaction.status === "Pending"
      );
      const completed = transactions.filter(
        (transaction) => transaction.status !== "Pending"
      );

      setPendingTransactions(pending);
      setCompletedTransactions(completed);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadTransactions(); // Initial load
  }, [token]);

  const handleCancel = async (transaction: Transaction) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL; // Adjust the API URL to match your environment
      await axios.patch(
        `${API_URL}/transactions/${transaction.transactionId}`,
        {
          status: "Cancelled",
        }
      );
      console.log(`Transaction ${transaction.transactionId} canceled.`);
      await reloadTransactions(); // Reload data after cancel
    } catch (error) {
      console.error("Failed to cancel transaction:", error);
    }
  };

  const handleAccept = async (transaction: Transaction) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.patch(
        `${API_URL}/transactions/${transaction.transactionId}`,
        {
          status: "Accepted",
        }
      );
      console.log(`Transaction ${transaction.transactionId} accepted.`);
      await reloadTransactions(); // Reload data after accept
    } catch (error) {
      console.error("Failed to accept transaction:", error);
    }
  };

  const handleReject = async (transaction: Transaction) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.patch(
        `${API_URL}/transactions/${transaction.transactionId}`,
        {
          status: "Rejected",
        }
      );
      console.log(`Transaction ${transaction.transactionId} rejected.`);
      await reloadTransactions(); // Reload data after reject
    } catch (error) {
      console.error("Failed to reject transaction:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const userIdString = getSub(token);
  const userId = userIdString ? parseInt(userIdString, 10) : 0;

  return (
    <div className="container mx-auto py-10">
      {pendingTransactions.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Pending Transactions</h2>
          <DataTable
            columns={getColumns(
              true,
              userId,
              handleCancel,
              handleAccept,
              handleReject
            )}
            data={pendingTransactions}
          />
        </>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">Completed Transactions</h2>
      <DataTable
        columns={getColumns(false, userId)} // Exclude Actions column
        data={completedTransactions}
      />
    </div>
  );
}
