import { useEffect, useRef } from "react";
import { useUserStore } from "../stores/userStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validator";
import { toast } from "react-toastify";
import { createUser } from "../api/userApi";

function CreateUserModal({ isOpen, onClose, onUserCreated }) {
  const modalRef = useRef(null);
  const token = useUserStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      const {confirmPassword, ...userData} = data
      await createUser(userData);
      toast.success("User Created");
      reset();
      onUserCreated();
      onClose();
    } catch (err) {
      console.log('err', err)
      toast.error(err.response?.data?.message || "Failed to Create User")
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
        <legend className="fieldset-legend text-[#DC7C3C]">Create New User</legend>

        <label className="label">Username</label>
        <input
          {...register("username")}
          type="text"
          className="input bg-[#1E130B]"
          placeholder="Username"
        />

        <label className="label">Password</label>
        <input
          {...register("password")}
          type="password"
          className="input bg-[#1E130B]"
          placeholder="Password"
        />

        <label className="label">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="input bg-[#1E130B]"
          placeholder="Confirm Password"
        />

        <select {...register("role")} className="select bg-[#1E130B]">
          <option value="VET">Vet</option>
          <option value="ADMIN">Admin</option>
        </select>

        <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn bg-[#CD7438] text-[#2A1D13]">Create</button>
          </div>
      </fieldset>
      </form>
    </dialog>
  );
}

export default CreateUserModal