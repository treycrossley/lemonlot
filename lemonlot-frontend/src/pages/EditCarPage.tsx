import { useParams } from "react-router-dom";
import EditCarForm from "@/components/EditCarForm";

const EditCarPage: React.FC = () => {
  // Use the `useParams` hook to get the `carId` from the URL
  const { carId } = useParams<{ carId: string }>();

  // Ensure `carId` is present and is a valid number
  const carIdNumber = carId ? parseInt(carId, 10) : null;

  return (
    <div className="edit-car-page">
      <h1 className="mb-8 text-2xl font-bold">Edit Car</h1>
      <p className="mb-4 text-lg text-gray-600">
        Update any fields you want. Any blank fields will remain unchanged.
      </p>
      {/* Pass the `carId` to the `EditCarForm` component */}
      <EditCarForm car_id={carIdNumber ? carId : undefined} />
    </div>
  );
};

export default EditCarPage;
