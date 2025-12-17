import React, { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // --------------------------------------------------------------------
  // IMPORTAÇÃO XML (funcional)
  // --------------------------------------------------------------------
  const handleImportXML = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const get = (node, tag) =>
      node?.querySelector(`${tag}, *|${tag}`)?.textContent || "";

    const detList = Array.from(xml.querySelectorAll("det, *|det"));

    const imported = detList.map((det, i) => {
      const prod = det.querySelector("prod, *|prod");
      const imposto = det.querySelector("imposto, *|imposto");
      const vol = xml.querySelector("vol, *|vol");

      return {
        id: Date.now() + i,
        code: get(prod, "cProd"),
        ean: get(prod, "cEAN"),
        name: get(prod, "xProd"),
        ncm: get(prod, "NCM"),
        cfop: get(prod, "CFOP"),
        unit: get(prod, "uCom"),
        qty: get(prod, "qCom"),
        price: get(prod, "vUnCom"),
        freight: get(prod, "vFrete"),
        taxes: get(imposto, "vTotTrib"),
        weightL: get(vol, "pesoL"),
        weightB: get(vol, "pesoB"),
        volumeType: get(prod, "uTrib")
      };
    });

    setProducts((prev) => [...prev, ...imported]);
  };

  // --------------------------------------------------------------------
  // CRUD
  // --------------------------------------------------------------------

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDuplicate = (row) => {
    const clone = { ...row, id: Date.now() };
    setProducts((prev) => [...prev, clone]);
  };

  const handleEdit = (row) => {
    navigate("/produtos/editar", { state: row });
  };

  const handleNew = () => {
    navigate("/produtos/novo");
  };

  // --------------------------------------------------------------------
  // FILTRO
  // --------------------------------------------------------------------
  const filtered = useMemo(() => {
    if (!search) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  // --------------------------------------------------------------------
  // TABELA
  // --------------------------------------------------------------------
  const columns = [
    { field: "code", headerName: "Código", width: 150 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "ean", headerName: "EAN", width: 150 },
    { field: "ncm", headerName: "NCM", width: 110 },
    { field: "price", headerName: "Preço", width: 120 },

    {
      field: "actions",
      headerName: "Ações",
      width: 260,
      renderCell: (params) => {
        const row = params.row;
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => handleEdit(row)}>Editar</button>
            <button onClick={() => handleDuplicate(row)}>Duplicar</button>
            <button onClick={() => handleDelete(row.id)}>Excluir</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="product-page">
      <h2>Produtos</h2>

      {/* BARRA DE AÇÕES */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <button onClick={handleNew}>Cadastrar Produto</button>

        <input type="file" accept=".xml" onChange={handleImportXML} />
      </div>

      {/* BUSCA */}
      <input
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, width: 300 }}
      />

      {/* TABELA */}
      <DataGrid
        rows={filtered}
        columns={columns}
        pageSize={5}
        autoHeight
      />
    </div>
  );
}

