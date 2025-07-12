import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createPet } from "../api/petApi";

function CreatePetModal({ isOpen, onClose, onPetCreated }) {
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    const changeToBoolean = {...data, sterilization: data.sterilization === 'TRUE', birth_date: new Date(data.birth_date).toISOString()}
    try {
      await createPet(changeToBoolean);
      toast.success("Pet Created");
      reset();
      onPetCreated();
      onClose();
    } catch (err) {
      console.log("err", err);
      toast.error(err.response?.data?.message || "Failed to Create Pet");
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            Create New User
          </legend>

          <label className="label">Pet Name</label>
          <input
            {...register("pet_name")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Pet Name"
          />
          <select {...register("species")} className="select bg-[#1E130B]">
            <option value="CANINE">CANINE</option>
            <option value="FELINE">FELINE</option>
            <option value="EXOTIC">EXOTIC</option>
            <option value="OTHERS">OTHERS</option>
          </select>
          <label className="label">Breed</label>
          <input
            {...register("breed")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Breed"
          />
          <label className="label">Gender</label>
          <select {...register("gender")} className="select bg-[#1E130B]">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
          <label className="label">Sterilization</label>
          <select
            {...register("sterilization")}
            className="select bg-[#1E130B]"
          >
            <option value="TRUE">YES</option>
            <option value="FALSE">NO</option>
          </select>
          <label className="label">Birth Date</label>
          <input
            {...register("birth_date")}
            type="date"
            className="input bg-[#1E130B]"
            placeholder="Birth Date"
          />
          <label className="label">Status</label>
          <select {...register("status")} className="select bg-[#1E130B]">
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
          <label className="label">Owner ID</label>
          <input
            {...register("ownerId")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Owner ID"
          />

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn bg-[#CD7438] text-[#2A1D13]">
              Create
            </button>
          </div>
        </fieldset>
      </form>
    </dialog>
  );
}

export default CreatePetModal;
