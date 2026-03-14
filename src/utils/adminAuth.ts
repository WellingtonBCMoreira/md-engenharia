const ADMIN_AUTH_KEY = "md-engenharia-admin-auth";

const DEFAULT_ADMIN_USER = "Marcelo";
const DEFAULT_ADMIN_PASSWORD = "Gatao";

function getConfiguredUser() {
  return import.meta.env.VITE_ADMIN_USER || DEFAULT_ADMIN_USER;
}

function getConfiguredPassword() {
  return import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function loginAdmin(username: string, password: string) {
  const isValid =
    username === getConfiguredUser() && password === getConfiguredPassword();

  if (isValid) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
  }

  return isValid;
}

export function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
}
