import z from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, "Name is too Short!!!!")
      .max(20, "Name is too long!!!")
      .regex(/^[a-zA-Z][a-zA-Z\s]*$/, "Not Valid Name!!!"),

    email: z.string().email("Not Valid Email!!!"),
    phone: z
      .string()
      .regex(
        /^(01|00201|\+201)[0125][0-9]{8}$/,
        "Please Enter Egyption Valid Phone!!!"
      ),

    password: z
      .string()
      .regex(
        /^[A-Z][a-zA-Z0-9!@#$%^&*()-_=+]{5,}$/,
        "Password Must Start With Capital Letter and 6 char min!!!"
      ),

    rePassword: z.string(),
  })
  .refine((v) => v.password === v.rePassword, {
    path: ["rePassword"],
    message: "Password not matched!!!!",
  });

export default registerSchema;
