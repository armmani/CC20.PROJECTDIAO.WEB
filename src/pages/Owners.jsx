import {
  CircleSlash2,
  LoaderCircle,
  PawPrint,
  Phone,
  SquarePen,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllOwners } from "../api/ownerApi";
import CreateOwnerModal from "../components/CreateOwnerModal";
import UpdateOwnerModal from "../components/UpdateOwnerModa";

function Owners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [smartSearch, setSmartSearch] = useState("");
  const [isModalShow, setIsModalShow] = useState(false);
  const [editOwner, setEditOwner] = useState(null);

  const fetchOwners = async () => {
    try {
      setLoading(true);
      const response = await getAllOwners();
      setOwners(response.data.result);
      setError(null);
    } catch (err) {
      setError("Failed to Load Owner List");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
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

  const filteredOwners = owners.filter((owner) =>
    owner.owner_name.toLowerCase().includes(smartSearch.toLowerCase())
  );
  const totalPet = owners.reduce(
    (acc, owner) => acc + (owner.pets?.length || 0),
    0
  );
  const petsPerOwner = owners.length > 0 ? totalPet / owners.length : 0;
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex w-[900px] justify-between m-4 gap-4">
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <UsersRound size={48} color="#dc7c3c" />
              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Owners
                </div>
                <div className="stat-value text-[#E09766]">{owners.length}</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <PawPrint size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Pet
                </div>
                <div className="stat-value text-[#E09766]">{totalPet}</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Phone size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Active
                </div>
                <div className="stat-value text-[#E09766]">45</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <CircleSlash2 size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  AVG.Pets/Owner
                </div>
                <div className="stat-value text-[#E09766]">{petsPerOwner}</div>
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
                  placeholder="Search Owners"
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
            + Add New Owner
          </button>
        </div>
        <div className="flex">
          <div className="overflow-x-auto rounded-box border border-[#3E2B20] bg-[#2A1D13] text-[#DC7C3C]">
            <table className="table w-[900px] text-center">
              <thead>
                <tr className="text-[#98735B]">
                  <th>Name</th>
                  <th>Tel</th>
                  <th>LineID</th>
                  <th>Address</th>
                  <th>Last Visit</th>
                  <th>Total Spending</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOwners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-[#1E130B]">
                    <td>{owner.owner_name}</td>
                    <td>{owner.tel_number}</td>
                    <td>{owner.line_id}</td>
                    <td>{owner.address}</td>
                    <td>hcLastVisit</td>
                    <td>totalSpending</td>
                    <td>{owner.status}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => setEditOwner(owner)}
                        className="btn btn-link"
                      >
                        <SquarePen />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CreateOwnerModal
        isOpen={isModalShow}
        onClose={() => setIsModalShow(false)}
        onOwnerCreated={fetchOwners}
      />
      <UpdateOwnerModal
        ownerToEdit={editOwner}
        isOpen={!!editOwner}
        onClose={() => setEditOwner(null)}
        onOwnerUpdated={fetchOwners}
      />
    </>
  );
}
export default Owners;
