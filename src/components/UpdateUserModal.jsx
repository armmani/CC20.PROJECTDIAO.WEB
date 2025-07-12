import { useEffect, useRef } from "react";
import { useUserStore } from "../stores/userStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validator";
import { toast } from "react-toastify";
import { createUser, updateUser } from "../api/userApi";

function UpdateUserModal({ isOpen, onClose,userToEdit, onUserUpdated }) {
  const modalRef = useRef(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  useEffect(()=>{
    if(userToEdit){
      reset({
        username: userToEdit.username,
        role: userToEdit.role,
      })
    }
  }, [userToEdit, reset])

  const onSubmit = async (data) => {
    if(!userToEdit) return
    try {
      await updateUser(userToEdit.id, data);
      toast.success("User Updated");
      onUserUpdated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to Create User");
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            Update User
          </legend>

          <label className="label">Username</label>
          <input
            {...register("username")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Username"
          />

          <select {...register("role")} className="select bg-[#1E130B]">
            <option value="VET">Vet</option>
            <option value="ADMIN">Admin</option>
          </select>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn bg-[#CD7438] text-[#2A1D13]">
              Update
            </button>
          </div>
        </fieldset>
      </form>
    </dialog>
  );
}

export default UpdateUserModal;
