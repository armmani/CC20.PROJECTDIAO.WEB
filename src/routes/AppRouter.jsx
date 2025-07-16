import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";
import { LoaderCircle } from "lucide-react";
import LoginLayout from "../layouts/LoginLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import { useUserStore } from "../stores/userStore";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const MedicationsPage = lazy(() => import("../pages/MedicationsPage"));
const OwnersPage = lazy(() => import("../pages/OwnersPage"));
const PetsPage = lazy(() => import("../pages/PetsPage"));
const ProceduresPage = lazy(() => import("../pages/ProceduresPage"));
const ReportsPage = lazy(() => import("../pages/ReportsPage"));
const VisitsPage = lazy(() => import("../pages/VisitsPage"));
const CreateVisitPage = lazy(() => import("../pages/CreateVisitPage"))

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
      { index: true, element: <DashboardPage /> },
      { path: "medications", element: <MedicationsPage /> },
      { path: "owners", element: <OwnersPage /> },
      { path: "pets", element: <PetsPage /> },
      { path: "procedures", element: <ProceduresPage /> },
      { path: "visits", element: <VisitsPage /> },
      { path: "visits/create", element: <CreateVisitPage />},
      {
        path: "reports",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ReportsPage />
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
