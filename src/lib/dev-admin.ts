const DEV_ADMIN_STORAGE_KEY = "makrana:dev-admin";

export function getDevAdminEmail() {
  return import.meta.env.DEV ? import.meta.env.VITE_DEV_ADMIN_EMAIL : undefined;
}

export function isDevAdminLogin(email: string, password: string) {
  if (!import.meta.env.DEV) return false;
  return (
    email.toLowerCase() === import.meta.env.VITE_DEV_ADMIN_EMAIL?.toLowerCase() &&
    password === import.meta.env.VITE_DEV_ADMIN_PASSWORD
  );
}

export function enableDevAdminSession() {
  if (!import.meta.env.DEV || typeof window === "undefined") return;
  window.localStorage.setItem(DEV_ADMIN_STORAGE_KEY, "true");
}

export function clearDevAdminSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DEV_ADMIN_STORAGE_KEY);
}

export function hasDevAdminSession() {
  return (
    import.meta.env.DEV &&
    typeof window !== "undefined" &&
    window.localStorage.getItem(DEV_ADMIN_STORAGE_KEY) === "true"
  );
}
