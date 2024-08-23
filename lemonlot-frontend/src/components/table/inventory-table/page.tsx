import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "@/components/ui/data-table"; // Adjust the path as needed
import { Car, columns } from "./columns";
import { useLocalStorage } from "usehooks-ts";
import { getSub } from "@/lib/authUtil";
import CarActions from "./CarActions"; // Adjust the import path as needed
import { Row } from "@tanstack/react-table"; // Import the Row type

const fetchMyCars = async (currentUserId: number): Promise<Car[]> => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${API_URL}/cars`);

    // Filter cars by currentUserId
    const filteredCars = response.data.filter(
      (car: Car) => car.seller.id === currentUserId
    );

    return filteredCars;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function CarTable() {
  const [data, setData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token] = useLocalStorage("auth_token", "");

  // Define the handleDelete function
  const handleDelete = (deletedCar: Car) => {
    setData((prevData) => prevData.filter((car) => car.id !== deletedCar.id));
  };

  // Add the handleDelete function to the columns
  const filteredColumns = columns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }: { row: Row<Car> }) => (
          <CarActions car={row.original} onDelete={handleDelete} />
        ),
      };
    }
    return col;
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const userIdString = getSub(token);
        const userId = userIdString ? parseInt(userIdString, 10) : 0;
        const cars = await fetchMyCars(userId);
        setData(cars);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={filteredColumns} data={data} />
    </div>
  );
}
