// ProductPage.jsx
import React, { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./CadastroProduto.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    volumeType: "", // NOVO
  });

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      volumeType: form.volumeType,
    };

    setProducts((prev) => [...prev, newProduct]);

    setForm({
      name: "",
      price: "",
      stock: "",
      volumeType: "",
    });
  };

  const filtered = useMemo(() => {
    if (!search) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const columns = [
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "price", headerName: "Preço", width: 120 },
    { field: "stock", headerName: "Estoque", width: 120 },
    { field: "volumeType", headerName: "Tipo Volume", width: 150 },
  ];

  return (
    <div className="product-page">
      <h2>Cadastro de Produtos</h2>

      {/* FORMULÁRIO */}
      <form className="product-form" onSubmit={handleAdd}>
        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Preço"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          placeholder="Estoque"
          value={form.stock}
          onChange={handleChange}
        />

        {/* NOVO SELECT */}
        <select
          name="volumeType"
          value={form.volumeType}
          onChange={handleChange}
        >
          <option value="">Tipo de Volume</option>
          <option value="Unidade">Unidade (UN)</option>
          <option value="Litros">Litros (L)</option>
          <option value="Metros">Metros (M)</option>
          <option value="Quilos">Peso (KG)</option>
        </select>

        <button type="submit">Adicionar</button>
      </form>

      {/* BUSCA */}
      <div className="product-search">
        <input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABELA */}
      <div className="product-table">
        <DataGrid
          rows={filtered}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
        />
      </div>
    </div>
  );
}

export default ProductPage;
