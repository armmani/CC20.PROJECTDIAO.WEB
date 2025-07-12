import {
  Calendar,
  CircleDollarSign,
  LoaderCircle,
  SquarePen,
  UserCheck,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";
import CreateUserModal from "../components/CreateUserModal";
import UpdateUserModal from "../components/UpdateUserModal";

function Reports() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [smartSearch, setSmartSearch] = useState("");
  const [isModalShow, setIsModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null)

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      // console.log("response.data", response.data);
      setUsers(response.data.result);
      setError(null);
    } catch (err) {
      setError("Failed to Fetch User Data");
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(smartSearch.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col items-center bg-[#1E130B]">
        <div className="flex w-[900px] justify-between m-4 gap-4">
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <UsersRound size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Users
                </div>
                <div className="stat-value text-[#E09766]">{users.length}</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <UserCheck size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Active User
                </div>
                <div className="stat-value text-[#E09766]">
                  {users.filter((user) => user.status === "ACTIVE").length}
                </div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <CircleDollarSign size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Revenue
                </div>
                <div className="stat-value text-[#E09766]">xxx</div>
              </div>
            </div>
          </div>
          <div className="stats shadow flex-1">
            <div className="stat border border-[#3C2A1F] bg-[#2A1D13] rounded-box flex items-center">
              <Calendar size={48} color="#dc7c3c" />

              <div className="flex flex-col">
                <div className="stat-title text-[#98735B] flex items-center gap-2">
                  Total Visits
                </div>
                <div className="stat-value text-[#E09766]">xxx</div>
              </div>
            </div>
          </div>
        </div>
        <div>Graph</div>
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
                  type="text"
                  className="grow placeholder:text-[#E09766] text-[#E09766]"
                  placeholder="Search Users"
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
            + Create New User
          </button>
        </div>
        <div className="flex">
          <div className="overflow-x-auto rounded-box  bg-[#2A1D13] text-[#DC7C3C]">
            <table className="table w-[900px] text-center">
              <thead>
                <tr className="text-[#98735B]">
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#1E130B]">
                    <td>{user.username}</td>
                    <td>
                      <span className={`badge badge-soft badge-success`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.status}</td>
                    <td>
                      <button onClick={() => setEditUser(user)} className="btn btn-ghost">
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
      <CreateUserModal
        isOpen={isModalShow}
        onClose={() => setIsModalShow(false)}
        onUserCreated={fetchUsers}
      />
      <UpdateUserModal
      userToEdit={editUser}
      isOpen={!!editUser}
      onClose={() => setEditUser(null)}
      onUserUpdated = {fetchUsers} />
    </>
  );
}
export default Reports;
