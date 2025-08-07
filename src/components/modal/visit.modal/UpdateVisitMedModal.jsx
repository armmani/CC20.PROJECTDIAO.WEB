import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAllMeds } from "../../../api/medicationApi";
import { visitUpdateMedication } from "../../../api/visitMedicationApi";


function UpdateVisitMedModal({ isOpen, onClose, visitId, onMedUpdated, medToEdit }) {
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (isOpen && medToEdit) {
      modalRef.current?.showModal();
      setValue("frequency", medToEdit.frequency);
      setValue("dosage", medToEdit.dosage);
      setValue("quantity", medToEdit.quantity);
      setValue("notes", medToEdit.notes);
      setValue("cost", medToEdit.cost);
    } else {
      modalRef.current?.close();
      reset();
    }
  }, [isOpen, medToEdit, setValue, reset]);


  const onSubmit = async (data) => {
    const payload = {
      ...data,
      cost: parseFloat(data.cost),
      quantity: parseInt(data.quantity),
      visitId: visitId,
      medicationId: medToEdit.medicationId,
    };
    try {
      console.log("payload",payload)
      await visitUpdateMedication(medToEdit.id, payload);
      toast.success("Medication Updated");
      onMedUpdated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to Update Medication");
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            Update Medicine
          </legend>

          <label className="label">Medication Name</label>
          <div className="dropdown w-full">
            <input
              type="text"
              value={medToEdit.name}
              className="input bg-[#1E130B]"
              disabled
            />
   
          </div>

          <label className="label">Frequency</label>
          <select {...register("frequency", {required: true})} className="select bg-[#1E130B]">
            <option value="SID">SID</option>
            <option value="BID">BID</option>
            <option value="TID">TID</option>
            <option value="QID">QID</option>
            <option value="Q2H">Q2H</option>
            <option value="Q4H">Q4H</option>
            <option value="Q6H">Q6H</option>
            <option value="Q8H">Q8H</option>
            <option value="Q12H">Q12H</option>
            <option value="ONCE">ONCE</option>
          </select>
          <label className="label">Dosage</label>
          <input
            {...register("dosage", {required: true})}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Dosage"
          />
          <label className="label">Quantity</label>
          <input
            {...register("quantity", {required:true})}
            type="number"
            className="input bg-[#1E130B]"
            placeholder="Quantity"
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
            {...register("cost")}
            type="number"
            step="any"
            className="input bg-[#1E130B]"
            placeholder="Cost"
            disabled
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

export default UpdateVisitMedModal;