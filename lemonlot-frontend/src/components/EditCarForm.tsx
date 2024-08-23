import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import axios from "axios";
import { FormFieldItem } from "./FormFieldItem";
import { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { useLocalStorage } from "usehooks-ts";
import { getSub } from "@/lib/authUtil"; // Adjust import according to your file structure

const formSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  modelYear: z.coerce
    .number()
    .int()
    .positive("Model year must be a positive number"),
  price: z.coerce.number().positive("Price must be a positive number"),
  color: z.string().optional(),
  mileage: z.coerce.number().optional(),
  description: z.string().optional(),
});

interface EditCarFormProps {
  car_id?: string;
}

export default function EditCarForm({ car_id }: EditCarFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState<z.infer<typeof formSchema> | null>(null);
  const [initialValues, setInitialValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const [token] = useLocalStorage("auth_token", "");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      modelYear: 0,
      price: 0,
      color: "",
      mileage: 0,
      description: "",
    },
  });

  // Watch for form changes
  const formValues = form.watch();
  const isDirty = JSON.stringify(formValues) !== JSON.stringify(initialValues);

  useEffect(() => {
    async function fetchCar() {
      if (car_id) {
        setIsLoading(true);
        try {
          const API_URL = import.meta.env.VITE_API_URL;
          const response = await axios.get(`${API_URL}/cars/${car_id}`);
          setCar(response.data);
          form.reset(response.data);
          setInitialValues(response.data); // Save initial values for comparison
        } catch (error) {
          console.error("Failed to fetch car details.", error);
          toast({
            title: "Failed to Fetch Car Details",
            description: "Could not retrieve car details. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchCar();
  }, [car_id, form, toast]);

  function handleSuccess() {
    navigate("/manage-inventory"); // Redirect to the car list or any other page
    toast({
      title: "Car Updated Successfully",
      description: `Car with ID ${car_id} has been updated.`,
    });
  }

  function handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "An error occurred during car update.",
        error.response?.data
      );
    } else {
      console.error("An unexpected error occurred.", error);
    }

    toast({
      title: "Update Failed",
      description: "An error occurred during car update. Please try again.",
      variant: "destructive",
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const sellerId = getSellerIdFromToken();
      if (sellerId === undefined) {
        throw new Error("Seller ID is not available.");
      }

      // Convert values to correct types
      const numericValues = {
        ...values,
        modelYear: Number(values.modelYear),
        price: Number(values.price),
        mileage: values.mileage ? Number(values.mileage) : undefined,
        sellerId,
      };

      console.log("Form values:", numericValues);
      const response = await axios.put(
        `${API_URL}/cars/${car_id}`,
        numericValues
      );
      console.log("Car update successful!", response.data);
      handleSuccess();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to extract user ID from token
  function getSellerIdFromToken() {
    const userIdString = getSub(token); // Extract user ID from token
    return userIdString ? parseInt(userIdString, 10) : undefined; // Convert to number or set as undefined
  }

  if (isLoading && !car) {
    return <LoadingSpinner className="w-5 h-5 text-blue-500" />;
  }

  if (!car_id || !car) {
    return <div>No car found.</div>;
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border rounded-lg p-6"
      >
        <FormFieldItem
          control={form.control}
          name="make"
          label="Make"
          placeholder="Make"
        />

        <FormFieldItem
          control={form.control}
          name="model"
          label="Model"
          placeholder="Model"
        />

        <FormFieldItem
          control={form.control}
          name="modelYear"
          label="Model Year"
          placeholder="Model Year"
          type="number"
        />

        <FormFieldItem
          control={form.control}
          name="price"
          label="Price"
          placeholder="Price"
          type="number"
        />

        <FormFieldItem
          control={form.control}
          name="color"
          label="Color"
          placeholder="Color"
        />

        <FormFieldItem
          control={form.control}
          name="mileage"
          label="Mileage"
          placeholder="Mileage"
          type="number"
        />

        <FormFieldItem
          control={form.control}
          name="description"
          label="Description"
          placeholder="Description"
        />

        <Button type="submit" disabled={isLoading || !isDirty}>
          {isLoading ? (
            <LoadingSpinner className="w-5 h-5 text-blue-500" />
          ) : (
            "Update Car"
          )}
        </Button>
      </form>
    </Form>
  );
}
