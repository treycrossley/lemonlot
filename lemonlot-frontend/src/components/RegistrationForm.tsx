"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Control, FieldPath, FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  placeholder?: string;
  type?: string;
}

export function FormFieldItem<T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  type = "text",
}: FormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold">User Registration</h1>
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

          <Button type="submit">Register</Button>
        </form>
      </Form>
    </>
  );
}
