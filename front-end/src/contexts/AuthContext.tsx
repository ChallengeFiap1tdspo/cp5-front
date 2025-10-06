import React, { createContext, useState, ReactNode } from "react";
import type { Usuario } from "../types/usuario";

type AuthContextType = {
  user: Usuario | null;
  login: (u: Usuario, remember?: boolean) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => {
    const s = localStorage.getItem("authUser") || sessionStorage.getItem("authUser");
    return s ? JSON.parse(s) : null;
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
