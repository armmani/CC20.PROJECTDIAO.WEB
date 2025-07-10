import { Navigate } from "react-router";
import { useUserStore } from "../stores/userStore";

function ProtectedRoute({ children, allowedRoles }) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children
}

export default ProtectedRoute