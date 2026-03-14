import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/adminAuth";

export function ProtectedAdminRoute() {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
