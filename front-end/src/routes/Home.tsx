import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Página Inicial</h2>
      <p className="mb-2"><strong>Nome:</strong> {user.nome}</p>
      <p className="mb-2"><strong>Nome de usuário:</strong> {user.nomeUsuario}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <div className="mt-4 text-sm text-gray-600">Nome e email exibidos via AuthContext.</div>
    </div>
  );
}
