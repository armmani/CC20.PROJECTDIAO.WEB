import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createProcedure } from "../../../api/procedureApi";

function CreateProcedureModal({ isOpen, onClose, onProcedureCreated }) {
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
      reset();
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await createProcedure(data);
      toast.success("Procedure Created");
      reset();
      onProcedureCreated();
      onClose();
    } catch (err) {
      console.log("err000", err);
      toast.error(err.response?.data?.message || "Failed to Create Procedure");
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            New Procedure
          </legend>

          <label className="label">Procedure Name</label>
          <input
            {...register("name")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Procedure Name"
          />
          <label className="label">Description</label>
          <input
            {...register("description")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Description"
          />

          <label className="label">Cost</label>
          <input
            {...register("cost")}
            type="number"
            step="any"
            className="input bg-[#1E130B]"
            placeholder="Cost"
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

export default CreateProcedureModal;
