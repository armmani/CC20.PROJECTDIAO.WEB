import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createMed } from "../api/medicationApi";

function CreateMedModal({ isOpen, onClose, onMedCreated }) {
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
      await createMed(data);
      toast.success("Medication Created");
      reset();
      onMedCreated();
      onClose();
    } catch (err) {
      console.log("err000", err);
      toast.error(err.response?.data?.message || "Failed to Create Medication");
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            New Medication
          </legend>

          <label className="label">Medication Name</label>
          <input
            {...register("name")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Medication Name"
          />
          <label className="label">Type</label>
          <select
            {...register("type")}
            className="select bg-[#1E130B]"
          >
            <option value="TX">Tx</option>
            <option value="RX">Rx</option>
          </select>
          <label className="label">Unit</label>
          <input
            {...register("unit")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Unit"
          />

          <label className="label">Cost</label>
          <input
            {...register("cost")}
            type="number"
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

export default CreateMedModal;
