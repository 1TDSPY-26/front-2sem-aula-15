import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape/Rodape";
import { Outlet } from "react-router";

export default function App() {
  return (
    <div className="App">
      <Cabecalho />

      <Outlet />

      <Rodape />
    </div>
  );
}