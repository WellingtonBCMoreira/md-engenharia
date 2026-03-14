import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { AdminHero } from "../pages/admin/Hero/AdminHero";
import { AdminAbout } from "../pages/admin/About/AdminAbout";
import { AdminContact } from "../pages/admin/Contact/AdminContact";
import { AdminFooter } from "../pages/admin/Footer/AdminFooter";
import { AdminSpecialties } from "../pages/admin/Specialties/AdminSpecialties";
import { AdminProjects } from "../pages/admin/Projects/AdminProjects";
import { AdminLogin } from "../pages/admin/Login/AdminLogin";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<ProtectedAdminRoute />}>
                    <Route path="/admin" element={<AdminHero />} />
                    <Route path="/admin/about" element={<AdminAbout />} />
                    <Route path="/admin/contact" element={<AdminContact />} />
                    <Route path="/admin/footer" element={<AdminFooter />} />
                    <Route path="/admin/specialties" element={<AdminSpecialties />} />
                    <Route path="/admin/projects" element={<AdminProjects />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
