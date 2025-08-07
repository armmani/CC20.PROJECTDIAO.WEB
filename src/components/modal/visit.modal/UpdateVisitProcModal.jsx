import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { visitUpdateProcedure } from "../../../api/visitProcedureApi";

function UpdateVisitProcModal({
  isOpen,
  onClose,
  onProcUpdated,
  procToEdit,
}) {
  const modalRef = useRef(null);
  const [procedureSearch, setProcedureSearch] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (procToEdit) {

      setValue("quantity", procToEdit.quantity);
      setValue("unit", procToEdit.unit);
      setValue("notes", procToEdit.notes);

      setProcedureSearch(procToEdit.procedure.name);
    }
  }, [procToEdit, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      procedureId: procToEdit.procedure.id,
      quantity: parseInt(data.quantity),
      unit: data.unit,
      notes: data.notes,
      cost: procToEdit.cost,
      visitId: procToEdit.visitId,
    };
    try {
      await visitUpdateProcedure(procToEdit.id, payload);
      toast.success("Procedure Updated");
      onProcUpdated();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update procedure");
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            Edit Procedure
          </legend>

          <label className="label">Procedure</label>
          <div className="dropdown w-full">
            <input
              type="text"
              value={procedureSearch}
              className="input bg-[#1E130B]"
              disabled 
            />
          </div>

          <label className="label">Quantity</label>
          <input
            {...register("quantity")}
            type="number"
            className="input bg-[#1E130B]"
            placeholder="Quantity"
          />
          <label className="label">Unit</label>
          <input
            {...register("unit")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Unit"
          />
          <label className="label">Note</label>
          <input
            {...register("notes")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Note"
          />
          <label className="label">Cost</label>
          <input
            value={procToEdit?.cost}
            type="number"
            className="input bg-[#1E130B]"
            disabled 
          />

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn bg-[#CD7438] text-[#2A1D13]">
              Save
            </button>
          </div>
        </fieldset>
      </form>
    </dialog>
  );
}

export default UpdateVisitProcModal;