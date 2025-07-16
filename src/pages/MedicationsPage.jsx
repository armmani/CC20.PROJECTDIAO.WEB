import {
  BriefcaseMedical,
  LoaderCircle,
  Pill,
  SquarePen,
  Syringe,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { deleteMed, getAllMeds } from "../api/medicationApi";
import CreateMedModal from "../components/modal/med.modal/CreateMedModal";
import UpdateMedModal from "../components/modal/med.modal/UpdateMedModal";
import { toast } from "react-toastify";

function MedicationsPage() {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [smartSearch, setSmartSearch] = useState("");
  const [isModalShow, setIsModalShow] = useState(false);
  const [editMed, setEditMed] = useState(null);

  const fetchMeds = async () => {
    try {
      setLoading(true);
      const response = await getAllMeds();
      setMeds(response.data.result);
      setError(null);
    } catch (err) {
      setError("Failed to Load Medication List");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  if (loading) {
    return (
      <p>
        <LoaderCircle size={90} className="animate-spin" />
      </p>
    );
  }

  if (error) {
    return <p className="text-red-300">{error}</p>;
  }

  const filteredMeds = meds.filter((medication) =>
    medication.name.toLowerCase().includes(smartSearch.toLocaleLowerCase())
  );

  const hdlDelete = async(medId) => {
    console.log(medId)
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this medication?"
      );
      if (confirmed) {
        await deleteMed(medId);
        toast.success("Medication Deleted");
        fetchMeds();
      }
    } catch (err) {
      console.log(err)
      toast.error("Failed to Delete Medicine")
    }
  }

  const txCount = meds.filter((med) => med.type === "TX").length;
  const rxCount = meds.filter((med) => med.type === "RX").length;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex w-[900px] justify-between m-4 gap-4">
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <BriefcaseMedical size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Medications
                </div>
                <div className="stat-value text-[#E09766]">{meds.length}</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Syringe size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Tx - Treatment
                </div>
                <div className="stat-value text-[#E09766]">{txCount}</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Pill size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Rx - Prescription
                </div>
                <div className="stat-value text-[#E09766]">{rxCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex border border-[#3C2A1F] bg-[#2A1D13] m-6 rounded-box w-[900px] justify-between items-center">
          <div className="flex items-center m-4 flex-1">
            <div className="flex w-full">
              <label className="input bg-[#2A1D13] border-[#433024] w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="orange"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  className="grow placeholder:text-[#E09766] text-[#E09766]"
                  placeholder="Search Medications"
                  value={smartSearch}
                  onChange={(e) => setSmartSearch(e.target.value)}
                />
              </label>
            </div>
          </div>

          <button
            onClick={() => setIsModalShow(true)}
            className="btn mr-4 bg-[#CD7438] text-[#2A1D13]"
          >
            + Add New Medication
          </button>
        </div>
        <div className="flex">
          <div className="overflow-x-auto rounded-box border border-[#3E2B20] bg-[#2A1D13] text-[#DC7C3C]">
            <table className="table w-[900px] text-center">
              <thead>
                <tr className="text-[#98735B]">
                  <th>Name</th>
                  <th>Type</th>
                  <th>Unit</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeds.map((medication) => (
                  <tr key={medication.id} className="hover:bg-[#1E130B]">
                    <td>{medication.name}</td>
                    <td>{medication.type}</td>
                    <td>{medication.unit}</td>
                    <td>{medication.cost}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => setEditMed(medication)}
                        className="btn btn-link"
                      >
                        <SquarePen />
                      </button>
                      <button
                        onClick={() => hdlDelete(medication.id)}
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
      </div>
      <CreateMedModal
        isOpen={isModalShow}
        onClose={() => setIsModalShow(false)}
        onMedCreated={fetchMeds}
      />
      <UpdateMedModal
        medToEdit={editMed}
        isOpen={!!editMed}
        onClose={() => setEditMed(null)}
        onMedUpdated={fetchMeds}
      />
    </>
  );
}
export default MedicationsPage
