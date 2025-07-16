import {
  Calendar,
  CheckCircle,
  CircleDollarSign,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllVisits } from "../api/visitApi";

function VisitsPage() {
  const navigate = useNavigate();
  const hdlCreateVisit = () => {
    navigate("/visits/create");
  };
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true)
  const [smartSearch, setSmartSearch] = useState("");
  const filteredVisits = visits.filter(
    (visit) =>
      visit?.pet?.pet_name.toLowerCase().includes(smartSearch.toLowerCase()) ||
      visit?.pet?.owner?.owner_name.toLowerCase().includes(smartSearch.toLowerCase())
  );

  useEffect( () => {
    const fetchVisits = async () => {
      setLoading(true)
      try {
        const response = await getAllVisits();
        setVisits(response.data.result); 
      } catch (err) {
        setVisits([])
      } finally {
        setLoading(false)
      }
    }
    fetchVisits()
  }, [])
console.log('filteredVisits', filteredVisits)
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex w-[900px] justify-between m-4 gap-4">
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Calendar size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Today's Visits
                </div>
                <div className="stat-value text-[#E09766]">345</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <CheckCircle size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Completed
                </div>
                <div className="stat-value text-[#E09766]">300</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <CircleDollarSign size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Today's Revenue
                </div>
                <div className="stat-value text-[#E09766]">฿ 200</div>
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
                  placeholder="Search Pets / Owners"
                  value={smartSearch}
                  onChange={(e) => setSmartSearch(e.target.value)}
                />
              </label>
            </div>
          </div>

          <button
            onClick={hdlCreateVisit}
            className="btn mr-4 bg-[#CD7438] text-[#2A1D13]"
          >
            + Add New Visit
          </button>
        </div>
        <div className="flex">
          <div className="overflow-x-auto rounded-box border border-[#3E2B20] bg-[#2A1D13] text-[#DC7C3C]">
            <table className="table w-[900px] text-center">
              <thead>
                <tr className="text-[#98735B]">
                  <th>Date/Time</th>
                  <th>Pet/Owner</th>
                  <th>Chief Complaint</th>
                  <th>Diagnosis</th>
                  <th>Weight</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisits.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Visits
                    </td>
                  </tr>
                ) : (
                  filteredVisits.map((visit, i) => (
                    <tr className="hover:bg-[#1E130B]" key={visits.id || i}>
                      <td>{visit.createdAt}</td>
                      <td>
                        {visit.pet.pet_name}
                        <br />
                        <span className="text-xs text-[#98735B]">
                          {visit.owner.owner_name}
                        </span>
                      </td>
                      <td>{visit.cc}</td>
                      <td>{visit.dx}</td>
                      <td>{visit.weight}</td>
                      <td>{visit.cost}</td>
                      <td>{visit.status}</td>
                      <td>
                        <button
                          onClick={() => {
                          }}
                          className="btn btn-link"
                        >
                          <SquarePen />
                        </button>
                        <button
                          onClick={() => {
                          }}
                          className="btn btn-link"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default VisitsPage;
