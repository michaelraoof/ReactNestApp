import { z } from "zod";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthReq {
  token: string;
  user: User;
}

export interface SignUpData {
  email: string;
  name: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const emailSchema = z.string().email("Incorrect email address");

export const passwordSchema = z
  .string()
  .min(8, "password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password  must contain at least one letter")
  .regex(/\d/, "Password must contain at least one nomber")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

export const nameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters")
  .max(250, "Name must be less than 250 characters");

export const signUpSchema = z
  .object({
    email: emailSchema,
    name: nameSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
