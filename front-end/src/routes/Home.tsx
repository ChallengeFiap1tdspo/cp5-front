import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white/30 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo!</h2>
          <div className="w-20 h-1 bg-white/80 rounded-full mx-auto"></div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors duration-200">
            <p className="text-white/70 text-sm font-medium">Nome</p>
            <p className="text-white text-lg font-semibold mt-1">{user.nome}</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors duration-200">
            <p className="text-white/70 text-sm font-medium">Nome de usuário</p>
            <p className="text-white text-lg font-semibold mt-1">{user.nomeUsuario}</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors duration-200">
            <p className="text-white/70 text-sm font-medium">Email</p>
            <p className="text-white text-lg font-semibold mt-1">{user.email}</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full border border-white/30">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></span>
            <span className="text-white/80 text-sm">Dados carregados via AuthContext</span>
          </div>
        </div>
      </div>
    </div>
  );
}