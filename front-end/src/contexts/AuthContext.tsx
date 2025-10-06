
import { createContext, useState, ReactNode, useContext } from "react";
import type { Usuario } from "../types/usuario";

type AuthContextType = {
  user: Usuario | null;
  login: (u: Usuario, remember?: boolean) => void;
  logout: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => {
    const s = localStorage.getItem("authUser") ?? sessionStorage.getItem("authUser");
    return s ? (JSON.parse(s) as Usuario) : null;
  });

  function login(u: Usuario, remember = false) {
    setUser(u);
    const payload = JSON.stringify(u);
    if (remember) localStorage.setItem("authUser", payload);
    else sessionStorage.setItem("authUser", payload);
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
