import z from "zod";

const loginSchema = z.object({
  email: z.string().email("Not Valid Email!!!"),

  password: z
    .string()
    .regex(/^[A-Z][a-zA-Z0-9]/, "Not Valid Password!!!")
    .min(6, "Password must be > 6 Char!!!"),

  remember_me: z.boolean(),
});

export default loginSchema;
