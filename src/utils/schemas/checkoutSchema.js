import { z } from "zod";

const checkoutSchema = z.object({
  details: z.string().min(1, "Field is Required!!!").max(40, "Too Long!!!"),
  phone: z
    .string()
    .min(1, "Field is Required!!!")
    .regex(
      /^(01|00201|\+201)[0125][0-9]{8}$/,
      "Please Enter Egyption valid Number!!"
    ),
  city: z
    .string()
    .min(1, "Field is Required!!!")
    .max(20, "Too Long Value!!!")
    .regex(
      /^[A-Za-z0-9][a-zA-Z0-9\s-_()]+[a-zA-Z0-9\s]$/,
      "Enter Valid city name!!!"
    ),
  cash_on_delivery: z.boolean(),
});

export default checkoutSchema;
