import { Hand, Pill, Save, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createVisit,
  visitAllMedications,
  visitAllProcedures,
} from "../api/visitApi";
import CreateVisitMedModal from "../components/modal/visit.modal/CreateVisitMedModal";
import CreateVisitProcModal from "../components/modal/visit.modal/CreateVisitProcModal";
import { getAllPets } from "../api/petApi";
import { visitDeleteProcedure } from "../api/visitProcedureApi";
import { visitDeleteMedication } from "../api/visitMedicationApi";

function CreateVisitPage() {
  const [savedVisit, setSavedVisit] = useState(null);
  const [isMedModalOpen, setIsMedModalOpen] = useState(false);
  const [isProcModalOpen, setIsProcModalOpen] = useState(false);

  const [visitMeds, setVisitMeds] = useState([]);
  const [visitProcs, setVisitProcs] = useState([]);

  const { register, handleSubmit, setValue } = useForm();
  const [selectedPet, setSelectedPet] = useState(null);
  const [petSearch, setPetSearch] = useState("");
  const [allPets, setAllPets] = useState([]);

  const [editProc, setEditProc] = useState(null);
  const hdlDeleteProc = async (id) => {
    if (!savedVisit) return;
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this procedure?"
      );
      if (confirmed) {
        await visitDeleteProcedure(id);
        await fetchVisitProcs(savedVisit.id);
        toast.success("Procedure Deleted");
      }
    } catch (err) {
      toast.error("Failed to Delete Procedure");
    }
  };

  const [editMed, setEditMed] = useState(null);
  const hdlDeleteMed = async (id) => {
    if (!savedVisit) return;
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this medication?"
      );
      if (confirmed) {
        await visitDeleteMedication(id);
        await fetchVisitMeds(savedVisit.id);
        toast.success("Medication Deleted");
      }
    } catch (err) {
      toast.error("Failed to Delete Procedure");
    }
  };

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const response = await getAllPets();
        setAllPets(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPets();
  }, []);

  const filteredPets = petSearch
    ? allPets.filter((pet) =>
        pet.pet_name.toLowerCase().includes(petSearch.toLowerCase())
      )
    : [];

  const hdlSelectPet = (pet) => {
    console.log("pet selectd:", pet);
    setSelectedPet(pet);
    setPetSearch(pet.pet_name);
  };

  const fetchVisitMeds = async (visitId) => {
    try {
      const response = await visitAllMedications(visitId);
      console.log("medications api", response.data);
      setVisitMeds(response.data.result || []);
    } catch (err) {
      toast.error("Could Not Refresh Medication List");
    }
  };

  const fetchVisitProcs = async (visitId) => {
    try {
      const response = await visitAllProcedures(visitId);
      console.log("response.data", response.data);
      setVisitProcs(response.data.result || []);
    } catch (err) {
      toast.error("Could Not Refresh Procedure List");
    }
  };

  const hdlMedAdded = async () => {
    if (!savedVisit) {
      toast.error("Please Save the Visit Record First");
      return;
    }
    await fetchVisitMeds(savedVisit.id);
  };

  const hdlProcAdded = async () => {
    if (!savedVisit) {
      toast.error("Please Save the Visit Record First");
      return;
    }
    await fetchVisitProcs(savedVisit.id);
  };

  const onSubmit = async (data) => {
    if (!selectedPet) {
      toast.error("Please Select the Pet");
      return;
    }

    const payload = {
      ...data,
      weight: parseFloat(data.weight),
      petId: selectedPet.id,
    };

    try {
      const response = await createVisit(payload);
      setSavedVisit(response.data.result);
      toast.success("Visit Record Created");

      setValue("weight", data.weight);
      setValue("cc", data.cc);
      setValue("hx", data.hx);
      setValue("pe", data.pe);
      setValue("dx", data.dx);

      await fetchVisitMeds(response.data.result.id);
      await fetchVisitProcs(response.data.result.id);
    } catch (err) {
      console.log(err);
      toast.error("Failed to Create Visit Record");
    }
  };
  return (
    <>
      <div className="flex justify-around p-8 gap-8 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <fieldset
            disabled={!!savedVisit}
            className="fieldset text-[#DC7C3C] bg-[#2A1D13] border-[#3D2B20] text-lg gap-5 rounded-box border p-4 flex flex-col"
          >
            <legend className="fieldset-legend text-[#DC7C3C]">
              Visit Record
            </legend>
            <div className="flex gap-10 justify-between">
              <div className="flex-1">
                <label className="label text-[#DC7C3C]">Pet</label>
                <div className="dropdown w-full text-[#DC7C3C] bg-[#2A1D13]">
                  <input
                    type="text"
                    value={petSearch}
                    onChange={(e) => {
                      setPetSearch(e.target.value);
                      if (selectedPet) setSelectedPet(null);
                    }}
                    className="input w-full bg-[#1E130B] border-[#3D2B20]"
                    placeholder="Search Pet by Name ..."
                  />
                  {filteredPets.length > 0 && petSearch && !selectedPet && (
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-full mt-2 max-h-60 overflow-y-auto">
                      {filteredPets.map((pet) => (
                        <li key={pet.id}>
                          <button onClick={() => hdlSelectPet(pet)}>
                            {pet.pet_name} ({pet.owner.owner_name})
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="label text-[#DC7C3C]">Weight (KG)</label>
                <input
                  {...register("weight")}
                  type="number"
                  step="any"
                  className="input w-full bg-[#1E130B] border-[#3D2B20]"
                  placeholder="Weight"
                />
              </div>
            </div>
            <div>
              <label className="label text-[#DC7C3C]">Chief Complaint</label>
              <input
                {...register("cc")}
                type="text"
                className="input w-full bg-[#1E130B] border-[#3D2B20]"
                placeholder="CC"
              />
            </div>
            <div>
              <label className="label text-[#DC7C3C]">History Taking</label>
              <input
                {...register("hx")}
                type="text"
                className="input w-full bg-[#1E130B] border-[#3D2B20]"
                placeholder="Hx"
              />
            </div>
            <div>
              <label className="label text-[#DC7C3C]">
                Physical Examination
              </label>
              <input
                {...register("pe")}
                type="text"
                className="input w-full bg-[#1E130B] border-[#3D2B20]"
                placeholder="PE"
              />
            </div>
            <div>
              <label className="label text-[#DC7C3C]">Diagnosis</label>
              <input
                {...register("dx")}
                type="text"
                className="input w-full bg-[#1E130B] border-[#3D2B20]"
                placeholder="Dx"
              />
            </div>
            {!savedVisit && (
              <button className="btn bg-red-800 text-[#CDB4A2] text-xl">
                <Save />
                SAVE
              </button>
            )}
          </fieldset>
        </form>
        <div className="flex flex-col flex-1">
          <fieldset className="fieldset text-[#DC7C3C] bg-[#2A1D13] border-[#3D2B20] text-lg gap-5 rounded-box border p-4 w-full">
            <legend className="fieldset-legend text-[#DC7C3C]">
              Medication Lists
            </legend>
            {savedVisit && (
              <button
                onClick={() => setIsMedModalOpen(true)}
                className="btn bg-[#CD7438] text-[#2A1D13]"
              >
                <Pill />
                Add Medicine
              </button>
            )}

            <div className="flex">
              <div className="overflow-x-auto w-full">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Medication</th>
                      <th>Prescription</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Cost</th>
                      <th>Total Cost</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitMeds.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center">
                          No Medication
                        </td>
                      </tr>
                    )}
                    {visitMeds.map((med, idMedTable) => (
                      <tr key={med.id}>
                        <th>{idMedTable + 1}</th>
                        <td>{med.medication.name}</td>
                        <td>
                          {med.dosage} {med.frequency}
                        </td>
                        <td>{med.quantity}</td>
                        <td>{med.medication.unit || "-"}</td>
                        <td>{med.cost}</td>
                        <td>{(med.cost * med.quantity).toFixed(2)}</td>
                        <td>
                          <button
                            onClick={() => setEditMed(med)}
                            className="btn btn-link"
                          >
                            <SquarePen />
                          </button>
                          <button
                            onClick={() => hdlDeleteMed(med.id)}
                            className="btn btn-link"
                          >
                            <Trash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </fieldset>
          <fieldset className="fieldset text-[#DC7C3C] bg-[#2A1D13] border-[#3D2B20] text-lg gap-5 rounded-box border p-4 w-full">
            <legend className="fieldset-legend text-[#DC7C3C]">
              Procedure Lists
            </legend>
            {savedVisit && (
              <div className="flex justify-between gap-10">
                <button
                  onClick={() => setIsProcModalOpen(true)}
                  className="btn bg-[#CD7438] text-[#2A1D13] w-full"
                >
                  <Hand />
                  Add Procedure
                </button>
              </div>
            )}
            <div className="overflow-x-auto w-full text-center ">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th></th>
                    <th>Procedure</th>
                    <th>Cost</th>
                    <th>Quantity</th>
                    <th>Total Cost</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visitProcs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Procedure
                      </td>
                    </tr>
                  )}
                  {visitProcs.map((proc, idProcTable) => (
                    <tr key={proc.id}>
                      <th>{idProcTable + 1}</th>
                      <td>{proc.procedure.name}</td>
                      <td>{proc.cost}</td>
                      <td>{proc.quantity}</td>
                      <td>{(proc.cost * proc.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => setEditProc(proc)}
                          className="btn btn-link"
                        >
                          <SquarePen />
                        </button>
                        <button
                          onClick={() => hdlDeleteProc(proc.id)}
                          className="btn btn-link"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>
        </div>
      </div>
      <CreateVisitMedModal
        isOpen={isMedModalOpen}
        onClose={() => setIsMedModalOpen(false)}
        visitId={savedVisit?.id}
        onMedAdded={hdlMedAdded}
      />
      <CreateVisitProcModal
        isOpen={isProcModalOpen}
        onClose={() => setIsProcModalOpen(false)}
        visitId={savedVisit?.id}
        onProcAdded={hdlProcAdded}
      />
    </>
  );
}
export default CreateVisitPage;
