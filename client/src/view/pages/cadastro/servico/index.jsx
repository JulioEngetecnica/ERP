// servicos/index.jsx
import { Link } from "react-router-dom";
import "./styles/index.css";

import ServicoTable from "./components/ServicoTable";
import { useServico } from "./hooks/useServico";

export default function ServicoPage() {
  const {
    servico,
    saveEdit,
    deleteById
  } = useServico();
  return (
    <div className="servico-page">
      <div className="header">
        <h1>Serviços</h1>
        <Link to="novo"  className="btn-new">Novo Serviço</Link>
      </div>

      <ServicoTable
        servicos={servico}
        onSaveEdit={saveEdit}
        onDelete={deleteById}
      />
    </div>
  );
}
