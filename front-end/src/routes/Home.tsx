import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initials = user.nome
    ? user.nome
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user.nomeUsuario?.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Olá, {user.nome}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/cadastro")}
            className="hidden sm:inline-block px-3 py-1 rounded-md text-sm border border-gray-200 bg-white"
          >
            Novo usuário
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:opacity-95"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Painel principal */}
        <section className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">Painel</h2>
            <span className="text-sm text-gray-500">Atualizado agora</span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Usuários</p>
              <p className="mt-2 text-2xl font-semibold text-gray-800">—</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Atividades</p>
              <p className="mt-2 text-2xl font-semibold text-gray-800">—</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Notificações</p>
              <p className="mt-2 text-2xl font-semibold text-gray-800">—</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700">Últimas ações</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="p-3 bg-gray-50 rounded">Nenhuma ação registrada ainda — realize um cadastro.</li>
              <li className="p-3 bg-gray-50 rounded">Faça login com outro usuário para testar.</li>
            </ul>
          </div>
        </section>

        {/* Sidebar com atalhos */}
        <aside className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-sm font-medium text-gray-700">Atalhos</h3>

          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={() => navigate("/cadastro")}
              className="text-left px-3 py-2 rounded-md bg-blue-50 text-blue-700 text-sm"
            >
              ➕ Cadastrar usuário
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-left px-3 py-2 rounded-md bg-green-50 text-green-700 text-sm"
            >
              🔁 Voltar ao login
            </button>

            <button onClick={() => alert("Funcionalidade futura")} className="text-left px-3 py-2 rounded-md border text-sm">
              ⚙️ Configurações
            </button>
          </div>

          <div className="mt-6 text-xs text-gray-400">
            Dica: crie alguns usuários no cadastro para testar login e duplicidade.
          </div>
        </aside>
      </main>
    </div>
  );
}
