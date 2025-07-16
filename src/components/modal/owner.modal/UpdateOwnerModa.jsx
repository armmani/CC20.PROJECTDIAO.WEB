import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateOwner } from "../../../api/ownerApi";

function UpdateOwnerModal({ isOpen, onClose, onOwnerUpdated, ownerToEdit }) {
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
    if (ownerToEdit) {
      reset(ownerToEdit);
    }
  }, [ownerToEdit, reset]);

  const onSubmit = async (data) => {
    const ownerId = ownerToEdit.id;
    try {
      await updateOwner(ownerId, data);
      toast.success("Owner Updated");
      onOwnerUpdated();
      onClose();
    } catch (err) {
      console.log("err", err);
      toast.error(err.response?.data?.message || "Failed to Update Owner");
    }
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            Owner Profile
          </legend>

          <label className="label">Owner Name</label>
          <input
            {...register("owner_name")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Owner Name"
          />
          <label className="label">Telephone Number</label>
          <input
            {...register("tel_number")}
            type="number"
            className="input bg-[#1E130B]"
            placeholder="Tel No."
          />

          <label className="label">Line ID</label>
          <input
            {...register("line_id")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Line ID"
          />
          <label className="label">Address</label>
          <input
            {...register("address")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Address"
          />
          <label className="label">Status</label>
          <select {...register("status")} className="select bg-[#1E130B]">
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
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

export default UpdateOwnerModal;
