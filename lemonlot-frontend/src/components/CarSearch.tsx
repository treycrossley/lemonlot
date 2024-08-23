import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { useLocalStorage } from "usehooks-ts";
import { getSub } from "@/lib/authUtil";

const CarSearch = () => {
  interface Car {
    id: number;
    make: string;
    model: string;
    color: string;
    price: number;
    seller: {
      id: number;
    };
  }

  interface Transaction {
    userId: number;
    salespersonId: number;
    carId: number;
    date: string;
    amount: number;
    status: "Pending" | "Completed" | "Canceled";
    payment_method: string;
    comments: string;
    createdAt: string;
    updatedAt: string;
  }

  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [token] = useLocalStorage("auth_token", "");
  const userId = token ? parseInt(getSub(token)!, 10) : 0;

  const fetchCars = useCallback(async (): Promise<Car[]> => {
    const response = await axios.get<Car[]>("http://localhost:8080/api/cars");
    return response.data;
  }, []); // Add dependencies here if needed

  useEffect(() => {
    const getCars = async () => {
      const carData = await fetchCars();
      setCars(carData);
      setFilteredCars(carData);
    };

    getCars();
  }, [fetchCars]);

  const filterCars = useCallback(() => {
    let updatedCars = cars;

    if (searchTerm) {
      updatedCars = updatedCars.filter((car) =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedColor) {
      updatedCars = updatedCars.filter(
        (car) => car.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    if (selectedModel) {
      updatedCars = updatedCars.filter((car) =>
        car.model.toLowerCase().includes(selectedModel.toLowerCase())
      );
    }

    if (maxPrice > 0) {
      updatedCars = updatedCars.filter((car) => car.price <= maxPrice);
    }

    setFilteredCars(updatedCars);
  }, [cars, searchTerm, selectedColor, selectedModel, maxPrice]); // Add dependencies here

  useEffect(() => {
    filterCars();
  }, [filterCars]);

  const handleCreateTransaction = async (car: Car) => {
    if (userId === car.seller.id) {
      toast({
        title: "Error",
        description: "You cannot sell your own car.",
        variant: "destructive",
      });
      return; // Stop further execution if IDs match
    }

    const transaction: Transaction = {
      userId,
      salespersonId: car.seller.id,
      carId: car.id,
      date: new Date().toISOString(),
      amount: car.price,
      status: "Pending",
      payment_method: "",
      comments: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await axios.post<Transaction>(
        "http://localhost:8080/api/transactions",
        transaction
      );
      alert("Transaction created successfully!");
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction");
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="mb-8 text-2xl font-bold">Search Cars</h1>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="Search by Make"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="black">Black</option>
        </select>
        <Input
          type="text"
          placeholder="Search by Model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice === 0 ? "" : maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
      <div className="w-full max-h-64 p-4 overflow-y-auto">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              className="grid grid-cols-3 gap-4 bg-gray-100 rounded-md border border-gray-300 p-2 m-2"
              key={car.id}
            >
              <h2>{car.make}</h2>
              <p>Color: {car.color}</p>
              <p></p>
              <h2>{car.model}</h2>
              <p>Price: ${car.price}</p>
              <div className="flex justify-end">
                <button
                  className="bg-blue-900 w-1/2 mr-20 rounded-md border text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleCreateTransaction(car)}
                >
                  Place Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No cars found</p>
        )}
      </div>
    </div>
  );
};

export default CarSearch;