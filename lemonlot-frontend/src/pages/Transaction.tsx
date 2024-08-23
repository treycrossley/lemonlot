import axios from "axios";
import { useEffect, useState } from "react";
import { Transaction } from "../components/table/transaction/transactionColumns";
import columns from "../components/table/transaction/transactionColumns";
import { DataTable } from "@/components/table/transaction/transaction-data-table";

// Fetch transactions from the API
const fetchTransactions = async (): Promise<Transaction[]> => {
    try {
        const resp = await axios.get("http://localhost:8080/api/transactions");
        return resp.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const TransactionsComponent: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function to load transactions
    const loadTransactions = async () => {
        setLoading(true);
        try {
            const transactions = await fetchTransactions();
            setTransactions(transactions);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleUpdateRow = async (id: number, updatedRow: Transaction) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/transactions/update/${id}`, updatedRow);
            if (response.status === 200) {
                // Refresh transactions after update
                await loadTransactions();
            } else {
                console.error('Failed to update row:', response.statusText);
            }
        } catch (error) {
            console.error('Error during row update:', error);
        }
    };

    const handleDeleteRow = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/transactions/${id}`);
            if (response.status === 200) {
                // Refresh transactions after delete
                await loadTransactions();
            } else {
                console.error('Failed to delete row:', response.statusText);
            }
        } catch (error) {
            console.error('Error during row deletion:', error);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <DataTable
                columns={columns}
                data={transactions}
                onUpdateRow={handleUpdateRow}
                onDeleteRow={handleDeleteRow}
            />
        </div>
    );
};

export default TransactionsComponent;