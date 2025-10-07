import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/login" replace />;

  const initials = user.nome ? user.nome.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase() : (user.nomeUsuario || "").slice(0,2).toUpperCase();

  return (
    <div className="min-h-screen p-6 flex items-start justify-center relative overflow-hidden">
      <div className="background-effect bg-blue-effect"></div>
      <div className="background-effect bg-purple-effect"></div>

      <header className="header-glass">
        <div className="flex items-center gap-6">
          <div className="avatar-gradient">{initials}</div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">{user.nome}</h1>
            <p className="opacity-70 mt-1">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-4 lg:mt-0">
          <button onClick={() => navigate("/cadastro")} className="button-success">📝 Cadastrar usuário</button>
          <button onClick={() => navigate("/login")} className="button-primary">🔄 Voltar ao login</button>
          <button onClick={() => { logout(); navigate("/login"); }} className="button-error">🚪 Sair</button>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bem-vindo ao Sistema Futurista 🚀</h2>
          <p className="opacity-70 text-lg">Interface moderna com design inovador</p>
        </div>
      </header>
    </div>
  );
}
