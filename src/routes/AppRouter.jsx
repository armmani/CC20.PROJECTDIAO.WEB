import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";
import { LoaderCircle } from "lucide-react";
import LoginLayout from "../layouts/LoginLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import { useUserStore } from "../stores/userStore";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Medications = lazy(() => import("../pages/Medications"));
const Owners = lazy(() => import("../pages/Owners"));
const Pets = lazy(() => import("../pages/Pets"));
const Procedures = lazy(() => import("../pages/Procedures"));
const Reports = lazy(() => import("../pages/Reports"));
const Visits = lazy(() => import("../pages/Visits"));

const guestRouter = createBrowserRouter([
  { path: "/login", element: <LoginLayout /> },
  { path: "/register", element: <RegisterLayout /> },
  { path: "*", element: <Navigate to="/login" /> },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "medications", element: <Medications /> },
      { path: "owners", element: <Owners /> },
      { path: "pets", element: <Pets /> },
      { path: "procedures", element: <Procedures /> },
      { path: "visits", element: <Visits /> },
      {
        path: "reports",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Reports />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function AppRouter() {
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    setIsUserLoaded(true);
  }, []);
  const token = useUserStore((state) => state.token);
  const rightRouter = token ? userRouter : guestRouter;
// console.log('isUserLoaded', isUserLoaded)
  if(!isUserLoaded) {
    return (
      <p className="flex items-center justify-center w-screen h-screen">
        <LoaderCircle size={180} color="#dc7c3c" className="animate-spin" />
      </p>
    )
  }

  return (
    <Suspense
      fallback={
        <p className="flex items-center justify-center w-screen h-screen">
          <LoaderCircle size={180} color="#dc7c3c" className="animate-spin" />
        </p>
      }
    >
      <RouterProvider router={rightRouter} />
    </Suspense>
  );
}

export default AppRouter;
