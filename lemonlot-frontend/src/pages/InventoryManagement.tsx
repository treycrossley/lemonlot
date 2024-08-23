import { useNavigate } from "react-router-dom";
import CarTable from "@/components/table/inventory-table/page";

const InventoryManagement: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateCar = () => {
    navigate("/create-car");
  };

  return (
    <div className="registration-page">
      <h1 className="mb-8 text-2xl font-bold">Manage your inventory</h1>
      <div className="mb-4 ml-8 text-left">
        {" "}
        {/* Ensure alignment to the left */}
        <button
          onClick={handleCreateCar}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create New Car
        </button>
      </div>
      <CarTable />
    </div>
  );
};

export default InventoryManagement;
