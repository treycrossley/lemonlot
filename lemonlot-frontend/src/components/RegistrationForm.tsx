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

const formSchema = z
  .object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message:
        "Must be a valid international phone number (e.g., +1234567890 or 987654321).",
    }),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setToken] = useLocalStorage("auth_token", "");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  interface LoginResponse {
    accessToken: string; // The JWT token or similar authentication token
    tokenType: string; // The type of token, e.g., "Bearer"
  }

  interface RegisterResponse {
    id: number;
    username: string;
    password: string; // Be cautious with storing or displaying sensitive data like passwords
    email: string;
    role: string; // Adjust type if you have a specific set of roles
    // Add other fields if necessary
  }

  async function registerUser(
    values: z.infer<typeof formSchema>
  ): Promise<AxiosResponse<RegisterResponse>> {
    const API_URL = import.meta.env.VITE_API_URL;
    return axios.post(`${API_URL}/users/register`, values);
  }

  async function loginUser(
    username: string,
    password: string
  ): Promise<AxiosResponse<LoginResponse>> {
    const API_URL = import.meta.env.VITE_API_URL;
    return axios.post(`${API_URL}/users/login`, { username, password });
  }

  function handleSuccess(loginResponse: AxiosResponse<LoginResponse>) {
    setToken(JSON.stringify(loginResponse.data));
    navigate("/user-profile");
    toast({
      title: "Registration Successful",
      description: "You have been successfully registered and logged in.",
    });
  }

  function handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "An error occurred during registration or login.",
        error.response?.data
      );
    } else {
      console.error("An unexpected error occurred.", error);
    }

    toast({
      title: "Registration Failed",
      description:
        "An error occurred during registration or login. Please try again.",
      variant: "destructive",
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log("Form values:", values);
      const registerResponse = await registerUser(values);
      console.log("Registration successful!", registerResponse.data);

      const loginResponse = await loginUser(values.username, values.password);
      console.log("Login successful!", loginResponse.data);

      handleSuccess(loginResponse);
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
          name="username"
          label="Username"
          placeholder="username"
        />

        <FormFieldItem
          control={form.control}
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
        />

        <FormFieldItem
          control={form.control}
          name="firstName"
          label="First Name"
          placeholder="First Name"
        />

        <FormFieldItem
          control={form.control}
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
        />

        <FormFieldItem
          control={form.control}
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          type="tel"
        />

        <FormFieldItem
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />

        <FormFieldItem
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner className="w-5 h-5 text-blue-500" /> // Custom size and color
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
