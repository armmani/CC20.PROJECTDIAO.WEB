import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAllMeds } from "../../../api/medicationApi";
import { visitAddMedications, visitAddProcedures } from "../../../api/visitApi";
import { getAllProcedures } from "../../../api/procedureApi";

function CreateVisitProcModal({ isOpen, onClose, visitId, onProcAdded }) {
  const modalRef = useRef(null);
  const [procSearch, setProcSearch] = useState("");
  const [allProcs, setAllProcs] = useState([]);
  const [selectedProc, setSelectedProc] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
      const fetchProcs = async () => {
        try {
          const response = await getAllProcedures();
          setAllProcs(response.data.result);
        } catch (err) {
          console.log("Failed to Fetch Procedures", err);
          toast.error("cannnot Load Procedure List");
        }
      };
      fetchProcs();
    } else {
      modalRef.current?.close();
      reset();
      setProcSearch("");
      setSelectedProc(null);
    }
  }, [isOpen, reset]);

  const filteredProcs = procSearch
    ? allProcs.filter((proc) =>
        proc.name.toLowerCase().includes(procSearch.toLowerCase())
      )
    : [];

  const onSubmit = async (data) => {
    if (!selectedProc) {
      toast.error("Please Select a Procedure from the List");
      return;
    }
    const payload = {
      notes: data.notes,
      cost: parseFloat(data.cost),
      quantity: parseInt(data.quantity),
      unit: data.unit,
      visitId: visitId,
      procedureId: selectedProc.id,
    };
    try {
      await visitAddProcedures(visitId, payload);
      toast.success("Procedure added to Visit");
      onProcAdded();
      onClose();
    } catch (err) {
      console.log("err", err);
      toast.error(err.response?.data?.message || "Failed to Add Procedure");
    }
  };

  const hdlSelectProc = (proc) => {
    setSelectedProc(proc);
    setProcSearch(proc.name);
    setValue("cost", proc.cost);
    setValue("unit", proc.unit || "");
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            Add Procedure
          </legend>

          <label className="label">Search Procedure</label>
          <div className="dropdown w-full">
            <input
              type="text"
              value={procSearch}
              onChange={(e) => setProcSearch(e.target.value)}
              className="input bg-[#1E130B]"
              placeholder="Type to Search Procedure"
            />
            {filteredProcs.length > 0 && !selectedProc && (
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-2">
                {filteredProcs.map((proc) => (
                  <li key={proc.id}>
                    <button type="button" onClick={() => hdlSelectProc(proc)}>{proc.name}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <label className="label">Quantity</label>
          <input
            {...register("quantity")}
            type="number"
            defaultValue={1}
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
            {...register("cost")}
            type="number"
            step="any"
            className="input bg-[#1E130B]"
            placeholder="Cost per unit"
            disabled="true"
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

export default CreateVisitProcModal;
