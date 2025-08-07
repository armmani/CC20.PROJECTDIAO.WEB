import { Hand, LoaderCircle, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteProcedure, getAllProcedures } from "../api/procedureApi";
import { toast } from "react-toastify";
import CreateProcedureModal from "../components/modal/procedure.modal/CreateProcedureModal";
import UpdateProcedureModal from "../components/modal/procedure.modal/UpdateProcedureModal";
import DeleteModal from "../components/modal/Delete.modal";

function ProceduresPage() {
  const [procedure, setProcedure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [smartSearch, setSmartSearch] = useState("");
  const [isModalShow, setIsModalShow] = useState(false);
  const [editProcedure, setEditProcedure] = useState(null);
  const [procToDelete, setProcToDelete] = useState(null);

  const fetchProcedures = async () => {
    try {
      setLoading(true);
      const response = await getAllProcedures();
      setProcedure(response.data.result);
      setError(null);
    } catch (err) {
      setError("Failed to Load Procedure List");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcedures();
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

  const filteredProcedures = procedure.filter((procedure) =>
    procedure.name.toLowerCase().includes(smartSearch.toLocaleLowerCase())
  );

  const hdlDelete = async () => {
    try {
      await deleteProcedure(procToDelete);
      toast.success("Procedure Deleted Successfully");
      fetchProcedures();
    } catch (err) {
      toast.error("Failed to Delete Procedure");
    } finally {
      setProcToDelete(null);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex w-[900px] justify-between m-4 gap-4">
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Hand size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Procedures
                </div>
                <div className="stat-value text-[#E09766]">
                  {procedure.length}
                </div>
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
                  placeholder="Search Procedures"
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
            + Add New Procedure
          </button>
        </div>
        <div className="flex">
          <div className="overflow-x-auto rounded-box border border-[#3E2B20] bg-[#2A1D13] text-[#DC7C3C]">
            <table className="table w-[900px] text-center">
              <thead>
                <tr className="text-[#98735B]">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProcedures.map((procedure) => (
                  <tr key={procedure.id} className="hover:bg-[#1E130B]">
                    <td>{procedure.name}</td>
                    <td>{procedure.description}</td>
                    <td>{procedure.cost}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => setEditProcedure(procedure)}
                        className="btn btn-link"
                      >
                        <SquarePen />
                      </button>
                      <button
                        onClick={() => setProcToDelete(procedure.id)}
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
      <CreateProcedureModal
        isOpen={isModalShow}
        onClose={() => setIsModalShow(false)}
        onProcedureCreated={fetchProcedures}
      />
      <UpdateProcedureModal
        procedureToEdit={editProcedure}
        isOpen={!!editProcedure}
        onClose={() => setEditProcedure(null)}
        onProcedureUpdated={fetchProcedures}
      />
      <DeleteModal
        isOpen={!!procToDelete}
        onClose={() => setProcToDelete(null)}
        onConfirm={hdlDelete}
      />
    </>
  );
}
export default ProceduresPage;
