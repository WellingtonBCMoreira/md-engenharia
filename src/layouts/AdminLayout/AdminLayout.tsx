import type { ReactNode } from "react";
import styles from "./AdminLayout.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../utils/adminAuth";

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const navigate = useNavigate();

    function handleLogout() {
        logoutAdmin();
        navigate("/admin/login", { replace: true });
    }

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>MD Engenharia</h2>

                <nav className={styles.menu}>
                    <NavLink to="/admin">Hero</NavLink>
                    <NavLink to="/admin/about">Sobre</NavLink>
                    <NavLink to="/admin/specialties">Especialidades</NavLink>
                    <NavLink to="/admin/projects">Projetos</NavLink>
                    <NavLink to="/admin/contact">Contato</NavLink>
                    <NavLink to="/admin/footer">Rodape</NavLink>
                </nav>

                <div className={styles.sidebarActions}>
                    <a href="/" className={styles.backLink}>Voltar ao site</a>
                    <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </aside>

            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}
