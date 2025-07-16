import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateProcedure } from "../../../api/procedureApi";

function UpdateProcedureModal({ isOpen, onClose, onProcedureUpdated, procedureToEdit }) {
  const modalRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (procedureToEdit) {
      reset(procedureToEdit);
    }
  }, [procedureToEdit, reset]);

  const onSubmit = async (data) => {
    const procId = procedureToEdit.id;
    try {
      await updateProcedure(procId, data);
      toast.success("Procedure Updated");
      onProcedureUpdated();
      onClose();
    } catch (err) {
      console.log("err", err);
      toast.error(err.response?.data?.message || "Failed to Update Procedure");
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
        <legend className="fieldset-legend text-[#DC7C3C]">
          Procedure Detail
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
              Update
            </button>
          </div>
        </fieldset>
      </form>
    </dialog>
  );
}

export default UpdateProcedureModal;
