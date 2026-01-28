// produtos/index.jsx
import { Link } from "react-router-dom";
import "./styles/index.css";

import ProdutoTable from "./components/ProdutoTable";
import { useProduto } from "./hooks/useProduto";

export default function ProdutoPage() {
  const {
    produto,
    saveEdit,
    deleteById
  } = useProduto();
  return (
    <div className="produto-page">
      <div className="header">
        <h1>Produtos</h1>
        <Link to="novo"  className="btn-new">Novo Produto</Link>
      </div>

      <ProdutoTable
        produtos={produto}
        onSaveEdit={saveEdit}
        onDelete={deleteById}
      />
    </div>
  );
}
