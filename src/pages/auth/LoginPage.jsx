import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../components/Auth/Input";
import Title from "../../components/Auth/Title";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../utils/schemas/loginSchema";
import publicAxios from "../../utils/axios/publicAxios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/userSlice";

const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: JSON.parse(localStorage.getItem("freshCartRememberUser")),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (isLoading) return;
    setLoading(true);
    try {
      const res = await publicAxios.post("/auth/signin", {
        email: data.email,
        password: data.password,
      });

      if (data.remember_me) {
        localStorage.setItem("freshCartRememberUser", JSON.stringify(data));
      } else {
        localStorage.removeItem("freshCartRememberUser");
      }

      dispatch(
        setUser({
          ...res.data.user,
          token: res.data.token,
        })
      );
      toast.success("Welcome Back in Your Home");
      reset();
      redirectUrl ? navigate(`${redirectUrl}`) : navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Faild in Request!!!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" min-h-dvh">
      <div className="container">
        <main className="min-h-dvh flex items-center justify-center">
          <div className="w-[780px] max-w-full shadow-lg rounded-lg pb-7">
            <Title title={"Login"} desc="Welcome back Again." />
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
                error={errors.email ? errors.email.message : false}
                required
              />

              <Input
                type={"password"}
                label={"Password"}
                placeholder={"***********"}
                name={"password"}
                id={"loginPassword}"}
                register={register}
                error={errors.password ? errors.password.message : false}
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-2 ">
                  <input
                    type="checkbox"
                    {...register("remember_me")}
                    id="loginRememberMe"
                  />
                  <label
                    htmlFor="loginRememberMe"
                    className="capitalize text-sm font-medium -translate-y-0.5"
                  >
                    remember me
                  </label>
                </div>

                <Link
                  to={"/forgot-password"}
                  className="capitalize text-sm font-medium underline"
                >
                  forgot password
                </Link>
              </div>

              <button
                className={`w-full d-flex items-center justify-center h-14 rounded-lg bg-mainColor text-white font-semibold capitalize hover:bg-mainColorHover disabled:bg-mainColorHover`}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "login"
                )}
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm capitalize font-medium">
                {"don't have account? "}
                <Link to={"/sign-up"} className="text-mainColor">
                  signup
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginPage;
