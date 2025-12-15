import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter Vaild Email!!!"),
});

export default forgotPasswordSchema;
