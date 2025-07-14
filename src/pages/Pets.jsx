import {
  Calendar,
  Heart,
  LoaderCircle,
  PawPrint,
  SquareActivity,
  SquarePen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllPets } from "../api/petApi";
import CreatePetModal from "../components/CreatePetModal";
import UpdatePetModal from "../components/UpdatePetModal";

function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [smartSearch, setSmartSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [isModalShow, setIsModalShow] = useState(false);
  const [editPet, setEditPet] = useState(null);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await getAllPets();
      setPets(response.data.result);
      setError(null);
    } catch (err) {
      setError("Failed to Load Pet List");
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPets();
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

  const filteredPets = pets
    .filter((pet) => {
      if (!speciesFilter) {
        return true;
      }
      return pet.species === speciesFilter;
    })
    .filter((pet) =>
      pet.pet_name.toLowerCase().includes(smartSearch.toLowerCase())
    );
  // console.log("Current Pet to Edit:", editPet)
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex w-[900px] justify-between m-4 gap-4">
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <PawPrint size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Pets
                </div>
                <div className="stat-value text-[#E09766]">{pets.length}</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Heart size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Healthy
                </div>
                <div className="stat-value text-[#E09766]">
                  {pets.filter((pet) => pet.status === null).length}
                </div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <SquareActivity size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  In Treatment
                </div>
                <div className="stat-value text-[#E09766]">
                  {" "}
                  {pets.filter((pet) => pet.status !== null).length}
                </div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Calendar size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Recent Visits
                </div>
                <div className="stat-value text-[#E09766]">xxx</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex border border-[#3C2A1F] bg-[#2A1D13] m-6 rounded-box w-[900px] justify-between items-center">
          <div className="flex items-center m-4 flex-1">
            <div className="flex w-full">
              <label className="input bg-[#2A1D13] border-[#433024] w-full">
                <svg
                  className="h-[1em] opacity-50 "
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
                  placeholder="Search Pets"
                  value={smartSearch}
                  onChange={(e) => setSmartSearch(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-1/5">
              <div className="dropdown dropdown-start">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 bg-[#2A1D13] text-[#E09766] border-[#433024]"
                >
                  {speciesFilter || "ALL"}
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu border border-[#433024] bg-[#2A1D13] text-[#E09766] rounded-box z-[1] w-52 p-2 shadow-sm"
                >
                  <li>
                    <a onClick={() => setSpeciesFilter("")}>ALL</a>
                  </li>
                  <li>
                    <a onClick={() => setSpeciesFilter("CANINE")}>CANINE</a>
                  </li>
                  <li>
                    <a onClick={() => setSpeciesFilter("FELINE")}>FELINE</a>
                  </li>
                  <li>
                    <a onClick={() => setSpeciesFilter("EXOTIC")}>EXOTIC</a>
                  </li>
                  <li>
                    <a onClick={() => setSpeciesFilter("OTHERS")}>OTHERS</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalShow(true)}
            className="btn mr-4 bg-[#CD7438] text-[#2A1D13]"
          >
            + Add New Pet
          </button>
        </div>
        <div className="flex">
          <div className="overflow-x-auto rounded-box border border-[#3E2B20] bg-[#2A1D13] text-[#DC7C3C]">
            <table className="table w-[900px] text-center">
              <thead>
                <tr className="text-[#98735B]">
                  <th>Name</th>
                  <th>Species/Breed</th>
                  <th>Gender</th>
                  <th>Birth Date</th>
                  <th>Weight</th>
                  <th>Owner</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPets.map((pet) => (
                  <tr key={pet.id} className="hover:bg-[#1E130B]">
                    <td>{pet.pet_name}</td>
                    <td className="flex flex-col">
                      <div>{pet.species}</div>
                      <div>{pet.breed}</div>
                    </td>
                    <td>{pet.gender}</td>
                    <td>
                      {new Date(pet.birth_date).toLocaleDateString("th-TH")}
                    </td>
                    <td>HardCodeWeight</td>
                    <td>{pet.owner.owner_name}</td>
                    <td>HardCodeLastVisit</td>
                    <td>{pet.status}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => setEditPet(pet)}
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
      <CreatePetModal
        isOpen={isModalShow}
        onClose={() => setIsModalShow(false)}
        onPetCreated={fetchPets}
      />
      <UpdatePetModal
        petToEdit={editPet}
        isOpen={!!editPet}
        onClose={() => setEditPet(null)}
        onPetUpdated={fetchPets}
      />
    </>
  );
}
export default Pets;
