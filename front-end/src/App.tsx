import { Outlet } from "react-router-dom";
import Rodape from "./components/Rodape";

export default function App() {
  return (
    <div className="container">
      
      <Outlet /> 
      <Rodape />
    </div>
  );
}
