import { createContext, useState, useContext, ReactNode } from "react";

import type { Usuario } from "../types/usuario";

type AuthContextType = {
  user: Usuario | null;
  login: (u: Usuario, remember?: boolean) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => {
    try {
      const s = localStorage.getItem("authUser") ?? sessionStorage.getItem("authUser");
      return s ? (JSON.parse(s) as Usuario) : null;
    } catch {
      return null;
    }
  });

  function login(u: Usuario, remember = false) {
    setUser(u);
    const data = JSON.stringify(u);
    if (remember) localStorage.setItem("authUser", data);
    else sessionStorage.setItem("authUser", data);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authUser");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
