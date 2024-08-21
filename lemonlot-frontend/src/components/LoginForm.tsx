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

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage("auth_token", "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  interface LoginResponse {
    accessToken: string;
    tokenType: string;
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
      title: "Login Successful",
      description: "You have been successfully logged in.",
    });
  }

  function handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("An error occurred during login.", error.response?.data);
    } else {
      console.error("An unexpected error occurred.", error);
    }

    toast({
      title: "Login Failed",
      description: "An error occurred during login. Please try again.",
      variant: "destructive",
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log("Form values:", values);
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
          placeholder="Username"
        />

        <FormFieldItem
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner className="w-5 h-5 text-blue-500" /> // Custom size and color
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
