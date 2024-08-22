import UserTable from "@/components/table/users-table/page";

const AdminPortal: React.FC = () => {
  return (
    <div className="registration-page">
      <h1 className="mb-8 text-2xl font-bold">Admin Portal</h1>
      <UserTable />
    </div>
  );
};
export default AdminPortal;
