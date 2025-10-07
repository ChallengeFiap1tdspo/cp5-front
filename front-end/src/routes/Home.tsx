import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/login" replace />;

  const initials = user.nome ? user.nome.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase() : (user.nomeUsuario || "").slice(0,2).toUpperCase();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="fixed top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {initials}
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {user.nome}
                </h1>
                <p className="text-gray-300 mt-2 text-lg">{user.email}</p>
                <p className="text-cyan-400 text-sm mt-1">@{user.nomeUsuario}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
              <button 
                onClick={() => navigate("/cadastro")} 
                className="bg-gradient-to-r from-green-500 to-cyan-600 text-white px-6 py-3 rounded-2xl font-semibold"
              >
                Cadastrar usuário
              </button>
              <button 
                onClick={() => navigate("/login")} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold"
              >
                Voltar ao login
              </button>
              <button 
                onClick={() => { logout(); navigate("/login"); }} 
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold"
              >
                Sair
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
              Bem-vindo ao Sistema
            </h2>
            <p className="text-gray-300 text-xl">
              Interface moderna com design inovador
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}