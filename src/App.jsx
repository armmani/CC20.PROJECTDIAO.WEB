import { useEffect } from "react";
import { useUserStore } from "./stores/userStore";
import isTokenExpired from "./utils/isTokenExpired";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  const token = useUserStore((state) => state.token);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    if (isTokenExpired(token)) {
      logout();
    }
  }, []);
  return (
    <>
      <div className="bg-[#1E130B] h-screen">
        <AppRouter />
        <ToastContainer position="bottom-right" style={{ zIndex: 99999 }} />
      </div>
    </>
  );
}
export default App;
