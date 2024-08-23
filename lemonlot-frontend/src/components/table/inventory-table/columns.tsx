import { ColumnDef } from "@tanstack/react-table";
import CarActions from "./CarActions";

type Seller = {
  id: number;
  // other seller fields
};

export type Car = {
  id: number;
  make: string;
  model: string;
  modelYear: number;
  price: number;
  color: string;
  mileage?: number;
  description?: string;
  seller: Seller;
};

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "modelYear",
    header: "Year",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "mileage",
    header: "Mileage",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const car = row.original;

      // Pass the car and the onDelete function to CarActions
      return (
        <CarActions
          car={car}
          onDelete={(carToDelete) => console.log("Delete car:", carToDelete)}
        />
      );
    },
  },
];
