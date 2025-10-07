import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  const initials = user.nome
    ? user.nome
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : (user.nomeUsuario || "").slice(0, 2).toUpperCase();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start">
      <header className="w-full max-w-3xl mx-auto flex items-center justify-between gap-4 bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{user.nome}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/cadastro")}
            className="px-3 py-1 rounded-md text-sm border border-gray-200 bg-white hover:bg-gray-50"
          >
            Cadastrar usuário
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 rounded-md text-sm border border-gray-200 bg-white hover:bg-gray-50"
          >
            Voltar ao login
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-md text-sm bg-red-600 text-white hover:opacity-95"
          >
            Sair
          </button>
        </div>
      </header>
    </div>
  );
}
