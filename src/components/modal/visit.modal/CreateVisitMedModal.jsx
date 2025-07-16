import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAllMeds } from "../../../api/medicationApi";
import { visitAddMedications } from "../../../api/visitApi";

function CreateVisitMedModal({ isOpen, onClose, visitId, onMedAdded }) {
  const modalRef = useRef(null);
  const [medSearch, setMedSearch] = useState("");
  const [allMeds, setAllMeds] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
      const fetchMeds = async () => {
        try {
          const response = await getAllMeds();
          setAllMeds(response.data.result);
        } catch (err) {
          console.log("Failed to Fetch Medication", err);
          toast.error("cannnot Load Medication List");
        }
      };
      fetchMeds();
    } else {
      modalRef.current?.close();
      reset();
      setMedSearch("");
      setSelectedMed(null);
    }
  }, [isOpen, reset]);

  const filteredMeds = medSearch
    ? allMeds.filter((med) =>
        med.name.toLowerCase().includes(medSearch.toLowerCase())
      )
    : [];

  const onSubmit = async (data) => {
    if (!selectedMed) {
      toast.error("Please Select a Medication from the List");
      return;
    }
    const payload = {
      ...data,
      cost: parseFloat(data.cost),
      quantity: parseInt(data.quantity),
      visitId: visitId,
      medicationId: selectedMed.id,
    };
    try {
      console.log("visitId", visitId);
      console.log("payload", payload);
      await visitAddMedications(visitId, payload);
      toast.success("Medication added to Visit");
      onMedAdded();
      onClose();
    } catch (err) {
      console.log("err", err);
      toast.error(err.response?.data?.message || "Failed to Add Medication");
    }
  };

  const hdlSelectMed = (med) => {
    setSelectedMed(med);
    setMedSearch(med.name);
    setValue("cost", med.cost);
  };

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset text-[#DC7C3C] bg-[#1E130B] border border-[#3C2A1F] rounded-box w-xs p-4">
          <legend className="fieldset-legend text-[#DC7C3C]">
            Add Medicine
          </legend>

          <label className="label">Search Medication</label>
          <div className="dropdown w-full">
            <input
              type="text"
              value={medSearch}
              onChange={(e) => {
                setMedSearch(e.target.value);
                setSelectedMed(null);
              }}
              className="input bg-[#1E130B]"
              placeholder="Medication ID"
            />
            {filteredMeds.length > 0 && !selectedMed && (
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-2">
                {filteredMeds.map((med) => (
                  <li key={med.id}>
                    <button type="button" onClick={() => hdlSelectMed(med)}>
                      {med.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <select {...register("frequency")} className="select bg-[#1E130B]">
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
            {...register("dosage")}
            type="text"
            className="input bg-[#1E130B]"
            placeholder="Dosage"
          />
          <label className="label">Quantity</label>
          <input
            {...register("quantity")}
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
            placeholder="Dosage"
          />

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn bg-[#CD7438] text-[#2A1D13]">
              Add
            </button>
          </div>
        </fieldset>
      </form>
    </dialog>
  );
}

export default CreateVisitMedModal;
