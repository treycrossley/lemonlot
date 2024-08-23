import TransactionTable from "@/components/table/my-transactions/page";

const MyTransactionsPage: React.FC = () => {
  return (
    <div className="registration-page">
      <h1 className="mb-8 text-2xl font-bold">My Transactions</h1>
      <TransactionTable />
    </div>
  );
};
export default MyTransactionsPage;
