import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import axios, { AxiosResponse } from "axios";
import { FormFieldItem } from "./FormFieldItem";
import { useState } from "react";
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

export default function CarRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
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

  // Function to extract user ID from token
  function getSellerIdFromToken() {
    const userIdString = getSub(token); // Extract user ID from token
    return userIdString ? parseInt(userIdString, 10) : undefined; // Convert to number or set as undefined
  }

  interface RegisterCarResponse {
    id: number;
    make: string;
    model: string;
    modelYear: number;
    price: number;
    color?: string;
    mileage?: number;
    description?: string;
    sellerId: number;
    createdAt: string;
    updatedAt: string;
  }

  async function registerCar(
    values: z.infer<typeof formSchema>,
    sellerId: number
  ): Promise<AxiosResponse<RegisterCarResponse>> {
    const API_URL = import.meta.env.VITE_API_URL;
    return axios.post(`${API_URL}/cars`, { ...values, sellerId });
  }

  function handleSuccess(response: AxiosResponse<RegisterCarResponse>) {
    navigate("/manage-inventory"); // Redirect to the car list or any other page
    toast({
      title: "Car Registered Successfully",
      description: `Car with ID ${response.data.id} has been registered.`,
    });
  }

  function handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "An error occurred during car registration.",
        error.response?.data
      );
    } else {
      console.error("An unexpected error occurred.", error);
    }

    toast({
      title: "Registration Failed",
      description:
        "An error occurred during car registration. Please try again.",
      variant: "destructive",
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const sellerId = getSellerIdFromToken(); // Get the seller ID from token
      if (sellerId === undefined) {
        throw new Error("Seller ID is not available.");
      }

      // Convert values to correct types
      const numericValues = {
        ...values,
        modelYear: Number(values.modelYear),
        price: Number(values.price),
        mileage: values.mileage ? Number(values.mileage) : undefined,
        seller: sellerId,
      };

      console.log("Form values:", numericValues);
      const response = await registerCar(numericValues, sellerId);
      console.log("Car registration successful!", response.data);
      handleSuccess(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner className="w-5 h-5 text-blue-500" />
          ) : (
            "Register Car"
          )}
        </Button>
      </form>
    </Form>
  );
}
