import { CircleSlash2, PawPrint, Phone, UsersRound } from "lucide-react";

function Owners() {
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
                <div className="stat-value text-[#E09766]">345</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <PawPrint size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Pets
                </div>
                <div className="stat-value text-[#E09766]">300</div>
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
                <div className="stat-value text-[#E09766]">200</div>
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
                  placeholder="Search Owners / Pets"
                />
              </label>
            </div>
          </div>

          <button className="btn mr-4 bg-[#CD7438] text-[#2A1D13]">
            + Add New Owner
          </button>
        </div>
        <div className="flex">
          <div className="overflow-x-auto rounded-box border border-[#3E2B20] bg-[#2A1D13] text-[#DC7C3C]">
            <table className="table w-[900px]">
              {/* head */}
              <thead>
                <tr className="text-[#98735B]">
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Pets</th>
                  <th>Weight</th>
                  <th>Last Visit</th>
                  <th>Total Spending</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover:bg-[#1E130B]">
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                </tr>
                <tr className="hover:bg-[#1E130B]">
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                  <td>Blue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Owners;
