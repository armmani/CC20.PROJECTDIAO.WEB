import {
  Activity,
  Calendar,
  ChartColumn,
  ClipboardList,
  PawPrint,
  Pill,
  ScanHeart,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router";
import { useUserStore } from "../stores/userStore";

function Dashboard() {
  const user = useUserStore((state) => state.user);
  // console.log("user", user);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex w-[900px] justify-between m-4 gap-4">
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center flex-1">
              <PawPrint size={36} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Pets
                </div>
                <div className="stat-value text-[#E09766]">345</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Calendar size={36} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Healthy
                </div>
                <div className="stat-value text-[#E09766]">300</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <UsersRound size={48} color="#dc7c3c" />
              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Pet Owners
                </div>
                <div className="stat-value text-[#E09766]">45</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Activity size={36} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Active Cases
                </div>
                <div className="stat-value text-[#E09766]">200</div>
              </div>
            </div>
          </div>
        </div>

        <button className="btn bg-[#880202] text-[#c0c0c0] rounded-xl w-[900px] h-[50px] mb-4">
          + Add New Treatment Record
          <ScanHeart />
        </button>

        <div className="flex w-[900px] mb-4 flex-col gap-4">
          <div className="flex gap-4">
            <div className="card card-border border-[#3C2A1F] bg-[#2A1D13] flex-1">
              <div className="card-body">
                <div className="flex gap-2 items-center">
                  <PawPrint size={36} color="#dc7c3c" />
                  <div>
                    <h2 className="card-title text-[#E09766] text-sm">
                      Pet Management
                    </h2>
                    <p className="text-[#98735B] text-xs">
                      Register and Manage Pet Records
                    </p>
                  </div>
                </div>
                <div className="card-actions justify-center mt-2">
                  <Link to="/pets" className="w-full">
                    <button className="btn bg-[#CD7438] text-[#2A1D13] rounded-xl w-full">
                      <PawPrint />
                      Manage Pets
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card card-border border-[#3C2A1F] bg-[#2A1D13] flex-1">
              <div className="card-body">
                <div className="flex gap-2 items-center">
                  <UsersRound size={36} color="#dc7c3c" />
                  <div>
                    <h2 className="card-title text-[#E09766] text-sm">
                      Owner Management
                    </h2>
                    <p className="text-[#98735B] text-xs">
                      Manage Pet Owner Information
                    </p>
                  </div>
                </div>
                <div className="card-actions justify-center mt-2">
                  <Link to="/owners" className="w-full">
                    <button className="btn bg-[#CD7438] text-[#2A1D13] rounded-xl w-full">
                      <UsersRound />
                      Manage Owners
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card card-border border-[#3C2A1F] bg-[#2A1D13] flex-1">
              <div className="card-body">
                <div className="flex gap-2 items-center">
                  <Stethoscope size={36} color="#dc7c3c" />
                  <div>
                    <h2 className="card-title text-[#E09766] text-sm">
                      Visit Management
                    </h2>
                    <p className="text-[#98735B] text-xs">
                      Create and Track Veterinary Visits
                    </p>
                  </div>
                </div>
                <div className="card-actions justify-center mt-2">
                  <Link to="/visits" className="w-full">
                    <button className="btn bg-[#CD7438] text-[#2A1D13] rounded-xl w-full">
                      <Stethoscope />
                      Manage Visits
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="card card-border border-[#3C2A1F] bg-[#2A1D13] flex-1">
              <div className="card-body">
                <div className="flex gap-2 items-center">
                  <Pill size={36} color="#dc7c3c" />
                  <div>
                    <h2 className="card-title text-[#E09766] text-sm">
                      Medication Management
                    </h2>
                    <p className="text-[#98735B] text-xs">
                      Track Medications and Rx
                    </p>
                  </div>
                </div>
                <div className="card-actions justify-center mt-2">
                  <Link to="/medications" className="w-full">
                    <button className="btn bg-[#CD7438] text-[#2A1D13] rounded-xl w-full">
                      <Pill />
                      Manage Medications
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card card-border border-[#3C2A1F] bg-[#2A1D13] flex-1">
              <div className="card-body">
                <div className="flex gap-2 items-center">
                  <ClipboardList size={36} color="#dc7c3c" />
                  <div>
                    <h2 className="card-title text-[#E09766] text-sm">
                      Procedure Management
                    </h2>
                    <p className="text-[#98735B] text-xs">
                      Manage Medical Procedures
                    </p>
                  </div>
                </div>
                <div className="card-actions justify-center mt-2">
                  <Link to="/procedures" className="w-full">
                    <button className="btn bg-[#CD7438] text-[#2A1D13] rounded-xl w-full">
                      <ClipboardList />
                      Manage Procedures
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {user?.role === "ADMIN" && (
              <div className="card card-border border-[#3C2A1F] bg-[#2A1D13] flex-1">
                <div className="card-body">
                  <div className="flex gap-2 items-center">
                    <ChartColumn size={36} color="#dc7c3c" />
                    <div>
                      <h2 className="card-title text-[#E09766] text-sm">
                        Reports & Analytics
                      </h2>
                      <p className="text-[#98735B] text-xs">
                        Clinic Performance & Statistics
                      </p>
                    </div>
                  </div>
                  <div className="card-actions justify-center mt-2">
                    <Link to="/reports" className="w-full">
                      <button className="btn bg-[#CD7438] text-[#2A1D13] rounded-xl w-full">
                        <ChartColumn />
                        View Reports
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="card card-border text-[#E09766] border-[#3C2A1F] bg-[#2A1D13] w-[900px]">
            <div className="card-body">
              <h2 className="card-title">Recent Activity</h2>
              <li>
                <strong>Pet Management :</strong>Pet Created
              </li>
              <li>
                <strong>Medication Management :</strong>Medication Deleted
              </li>
              <li>
                <strong>Owner Management :</strong>Owner Update
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
