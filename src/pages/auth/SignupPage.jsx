import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Auth/Title";
import Input from "../../components/Auth/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../../utils/schemas/registerSchema";
import { useState } from "react";
import publicAxios from "../../utils/axios/publicAxios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    setLoading(true);
    try {
      await publicAxios.post("/auth/signup", data);
      toast.success("Success Create User");
      reset();
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Faild in Request!!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-4 min-h-dvh">
      <div className="container">
        <main className="min-h-dvh flex items-center justify-center">
          <div className="w-[780px] max-w-full shadow-lg rounded-lg pb-7">
            <Title title={"Register Now"} desc="Create Your Account Now" />
            <form
              className="flex flex-col gap-6 px-8 pt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type={"text"}
                label="Name"
                placeholder={"Enter Your Name"}
                name={"name"}
                id={"registerName"}
                register={register}
                error={errors.name ? errors.name.message : false}
                required
              />
              <Input
                type={"email"}
                label="Email"
                placeholder={"Enter Your Email Adress"}
                name={"email"}
                id={"registerEmail"}
                register={register}
                error={errors.email ? errors.email.message : false}
                required
              />
              <Input
                type={"tel"}
                label="Phone"
                placeholder={"Enter Your Phone Number"}
                name={"phone"}
                id={"registerPhone"}
                register={register}
                error={errors.phone ? errors.phone.message : false}
                required
              />
              <Input
                type={"password"}
                label={"Password"}
                placeholder={"***********"}
                name={"password"}
                id={"registerPassword"}
                register={register}
                error={errors.password ? errors.password.message : false}
                required
              />
              <Input
                type={"password"}
                label="Confirm Password"
                placeholder={"***********"}
                name={"rePassword"}
                id={"registerRePassword"}
                register={register}
                error={errors.rePassword ? errors.rePassword.message : false}
                required
              />

              <button
                disabled={isLoading}
                className="w-full d-flex items-center justify-center h-14 rounded-lg bg-mainColor text-white font-semibold capitalize hover:bg-mainColorHover disabled:bg-mainColorHover"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "register now"
                )}
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm capitalize font-medium">
                {"already have an account? "}
                <Link to={"/login"} className="text-mainColor">
                  login
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignupPage;
