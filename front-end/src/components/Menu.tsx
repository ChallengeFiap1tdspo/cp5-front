import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="text-sm">
      <Link to="/login" className="mr-3 hover:underline">Login</Link>|
      <Link to="/cadastro" className="mx-3 hover:underline">Cadastro</Link>||
    </nav>
  );
}
