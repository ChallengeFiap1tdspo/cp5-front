
import Menu from "./Menu";
import { useAuth } from "../contexts/AuthContext";

export default function Cabecalho() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between py-4 border-b">
      <div>
        <h1 className="text-2xl font-bold">Meu App</h1>
        <small className="text-xs text-gray-500">Access Control CP</small>
      </div>

      <div className="flex items-center gap-4">
        <Menu />
        {user && (
          <div className="text-right">
            <div className="text-sm font-medium">{user.nome}</div>
            <div className="text-xs text-gray-600">{user.email}</div>
            <button onClick={logout} className="mt-1 text-xs px-2 py-1 border rounded hover:bg-gray-50">
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
