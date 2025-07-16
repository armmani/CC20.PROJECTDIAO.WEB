import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { loginSchema } from "../utils/validator";
import { useUserStore } from "../stores/userStore";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

function LoginPage() {
  const login = useUserStore((state) => state.login);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onblur" });

  const hdlLogin = async (data) => {
    try {
      console.log("data", data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const resp = await login(data);
      toast.success(resp.data.message);
      reset();
      navigate("/dashboard");
    } catch (err) {
      const errMessage = err.response.data?.message || err.message;
      // console.log('errMessage', errMessage)
      toast.error(errMessage);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen flex-col mt-20">
        <fieldset
          disabled={isSubmitting}
          className="fieldset bg-[#2A1D13] border-[#3D2B20] rounded-box w-xs border p-4"
        >
          <legend className="fieldset-legend text-[#DC7C3C] text-xl">
            deVet Login
          </legend>
          <form
            onSubmit={handleSubmit(hdlLogin)}
            className="flex flex-col gap-4"
          >
            <label className="label text-[#DC7C3C] text-lg">Username</label>
            <input
              type="text"
              className="input bg-[#1E130B] text-[#DC7C3C]"
              placeholder="Username"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-sm text-[#f97272]">
                {errors.username?.message}
              </p>
            )}

            <label className="label text-[#DC7C3C] text-lg">Password</label>
            <input
              type="password"
              className="input bg-[#1E130B] text-[#DC7C3C]"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-[#f97272]">
                {errors.password?.message}
              </p>
            )}
            <p className="text-[#98735B]">
              No Account ?{" "}
              <Link to="/register">
                <u>Register</u>
              </Link>
            </p>
            {!isSubmitting && (
              <button className="btn bg-[#CD7438] mt-4 text-[#1E130B]">
                Login
              </button>
            )}
            {isSubmitting && (
              <button className="btn bg-[#CD7438] mt-4 text-[#1E130B]">
                Login
                <LoaderCircle className="animate-spin mr-2" />
              </button>
            )}
          </form>
        </fieldset>
      </div>
    </>
  );
}
export default LoginPage;
