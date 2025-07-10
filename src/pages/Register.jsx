import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerSchema } from "../utils/validator";
import { useNavigate } from "react-router";
import axios from "axios";

function Register({ resetForm }) {
  const { handleSubmit, register, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const { isSubmitting, errors } = formState;

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:6969/auth/register", data);
      reset();
      navigate("/login");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <div className="flex mt-20 items-center h-screen flex-col">
        <fieldset
          disabled={isSubmitting}
          className="fieldset bg-[#2A1D13] border-[#3D2B20] rounded-box w-xs border p-4"
        >
          <legend className="fieldset-legend text-[#DC7C3C] text-xl">
            Register
          </legend>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
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

            <label className="label text-[#DC7C3C] text-lg">
              Confirm Password
            </label>
            <input
              type="password"
              className="input bg-[#1E130B] text-[#DC7C3C]"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-[#f97272]">
                {errors.confirmPassword?.message}
              </p>
            )}

            <button className="btn bg-[#CD7438] mt-4 text-[#1E130B]">
              Register
            </button>
          </form>
        </fieldset>
      </div>
    </>
  );
}
export default Register;
