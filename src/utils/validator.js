import { object, ref, string } from "yup";

export const registerSchema = object({
  username: string().min(2, "Username must be at least 2 letters"),
  password: string().min(6, "Password must be at least 6 letters"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Password is not Matched"
  ),
}).noUnknown();

export const loginSchema = object({
  username: string().min(2, "Username must be at least 2 letters"),
  password: string().min(6, "Password must be at least 6 letters"),
}).noUnknown();
