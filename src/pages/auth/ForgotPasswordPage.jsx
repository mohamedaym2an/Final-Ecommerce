import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Auth/Input";
import Title from "../../components/Auth/Title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import forgotPasswordSchema from "../../utils/schemas/forgotPasswordSchema";
import { useState } from "react";
import toast from "react-hot-toast";
import publicAxios from "../../utils/axios/publicAxios";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);
    try {
      await publicAxios.post("/auth/forgotPassword");
      reset();
      toast.success("Success Send Request, Check Your Inbox");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Faild Send Request, Try Again Later!!!"
      );
    } finally {
      setLoading(false);
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <section className=" min-h-dvh">
      <div className="container">
        <main className="min-h-dvh flex items-center justify-center">
          <div className="w-[780px] max-w-full shadow-lg rounded-lg pb-7">
            <Title
              title={"Forgot Password"}
              desc="Enter Your Email to Reset Your Password."
            />
            <form
              className="flex flex-col gap-6 px-8 pt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type={"email"}
                label="Email"
                placeholder={"Enter Your Email Adress"}
                name={"email"}
                id={"loginEmail"}
                register={register}
                error={errors.email ? errors?.email?.message : false}
                required
              />

              <button
                disabled={loading}
                className="w-full d-flex items-center justify-center h-14 rounded-lg bg-mainColor text-white font-semibold capitalize hover:bg-mainColorHover disabled:bg-mainColorHover"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "send email"
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

export default ForgotPasswordPage;
