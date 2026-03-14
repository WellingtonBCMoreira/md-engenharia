import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";
import { isAdminAuthenticated, loginAdmin } from "../../../utils/adminAuth";

export function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const authenticated = loginAdmin(username, password);

    if (!authenticated) {
      setError("Usuario ou senha invalidos.");
      return;
    }

    const redirectTo = location.state?.from?.pathname || "/admin";
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Acesso restrito</p>
        <h1 className={styles.title}>Entrar no painel administrativo</h1>
        <p className={styles.description}>
          Use suas credenciais para editar os dados do site.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Usuario</span>
            <input
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="submit">Entrar</button>
            <a href="/">Voltar ao site</a>
          </div>
        </form>
      </div>
    </div>
  );
}
