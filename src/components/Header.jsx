import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useUserStore } from "../stores/userStore";
import { toast } from "react-toastify";
import { routeConfig } from "../config/route.config";

function Header() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  const currentRouteConfig =
    routeConfig[location.pathname] || routeConfig.default;

  const hdlLogout = () => {
    logout();
    toast.success("LOGGED OUT Successfully");
    navigate("/login");
  };

  const backHiddenOnPaths = ["/", "/login", "/register"];
  const showBackButton = !backHiddenOnPaths.includes(location.pathname);

  const logoutHiddenOnPaths = ["/login", "/register"];
  const showLogoutButton = !logoutHiddenOnPaths.includes(location.pathname);
  return (
    <div className="navbar  bg-[#2A1D13] shadow-sm">
      <div className="flex-1">
        <div className="flex items-center">
          <img src="../public/deVetLOGO.png" className="h-[50px]"></img>
          <div>
            <p className="text-xl text-[#D87A3B]">{currentRouteConfig.title}</p>
            <p className="text-xs text-[#98735B]">
              {currentRouteConfig.subtitle}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-none">
        {showBackButton && (
          <Link to="/">
            <button className="btn btn-link text-[#D87A3B]">
              <ArrowLeft color="#dc7c3c" />
              Bact To Dashboard
            </button>
          </Link>
        )}
        {showLogoutButton && (
          <div className="badge badge-soft badge-success">{user.role}</div>
        )}

      </div>
      <div>
        {showLogoutButton && (
          <button className="btn btn-link text-[#D87A3B]" onClick={hdlLogout}>
            LOG OUT
          </button>
        )}
      </div>
    </div>
  );
}
export default Header;
