// products/index.jsx
import { Link } from "react-router-dom";
import "./styles/index.css";

import ProductTable from "./components/ProductTable";
import { useProducts } from "./hooks/useProducts";

export default function ProductPage() {
  const {
    products,
    editRowsModel,
    setEditRowsModel,
    saveEdit,
    deleteById
  } = useProducts();
  return (
    <div className="product-page">
      <div className="header">
        <h1>Produtos</h1>
        <Link to="/produtos/novo" className="btn-new">Novo Produto</Link>
      </div>

      <ProductTable
        products={products}
        editRowsModel={editRowsModel}
        setEditRowsModel={setEditRowsModel}
        onSaveEdit={saveEdit}
        onDelete={deleteById}
      />
    </div>
  );
}
