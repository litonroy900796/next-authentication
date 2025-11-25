import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Full Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string().min(6, { message: "Confirm Password is required" }),
    terms: z
      .boolean()
      .refine((val) => val === true, { message: "You must accept the terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will appear under confirmPassword field
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
