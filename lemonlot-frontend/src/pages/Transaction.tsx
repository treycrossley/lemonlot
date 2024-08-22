import axios from "axios";
import { useEffect, useState } from "react";
import { Transaction } from "../components/table/transaction/transactionColumns";
import columns from "../components/table/transaction/transactionColumns";

import { DataTable } from "@/components/table/transaction/transaction-data-table";
//import { log } from "console";

const fetchTransactions = async () : Promise<Transaction[]> =>{
    try {
        //const API_URL = import.meta.env.VITE_API_URL;
        const resp = await axios.get("http://localhost:8080/api/Transactions");
        console.log(resp.data);
        return resp.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const TransactionsComponent : React.FC = () =>
{
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const loadData = async () => {
            try {
                const transactions = await fetchTransactions();
                setTransactions(transactions);
            } catch (error) {
                setError((error as Error).message);
            } finally {
              setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={transactions} />
        </div>
      );
}

export default TransactionsComponent;
