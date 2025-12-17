import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./CadastroProduto.css";

function ProductRegister() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    code: "",
    name: "",
    ean: "",
    ncm: "",
    cfop: "",
    unit: "",
    qty: "",
    price: "",
    freight: "",
    taxes: "",
    weightL: "",
    weightB: "",
    volumeType: ""
  });

  // -----------------------------------------------
  // HANDLERS
  // -----------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAdd = () => {
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), ...form }
    ]);

    setForm({
      code: "",
      name: "",
      ean: "",
      ncm: "",
      cfop: "",
      unit: "",
      qty: "",
      price: "",
      freight: "",
      taxes: "",
      weightL: "",
      weightB: "",
      volumeType: ""
    });
  };

  // -----------------------------------------------
  // IMPORTAÇÃO XML
  // -----------------------------------------------
  const handleImportXML = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const get = (node, tag) =>
      node?.querySelector(`${tag}, *|${tag}`)?.textContent || "";

    const detList = Array.from(xml.querySelectorAll("det, *|det"));

    const extracted = detList.map((det, i) => {
      const prod = det.querySelector("prod, *|prod");
      const imposto = det.querySelector("imposto, *|imposto");
      const vol = xml.querySelector("vol, *|vol");

      return {
        id: Date.now() + i,
        code: get(prod, "cProd"),
        name: get(prod, "xProd"),
        ean: get(prod, "cEAN"),
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

    setProducts((prev) => [...prev, ...extracted]);
  };

  // -----------------------------------------------
  // EDIÇÃO INLINE NA TABELA
  // -----------------------------------------------
  const handleEditCell = (params) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === params.id ? { ...p, [params.field]: params.value } : p
      )
    );
  };

  const handleDeleteRow = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // -----------------------------------------------
  // COLUNAS DA TABELA
  // -----------------------------------------------
  const columns = [
    { field: "code", headerName: "Código", width: 130, editable: true },
    { field: "name", headerName: "Nome", flex: 1, editable: true },
    { field: "ean", headerName: "EAN", width: 140, editable: true },
    { field: "ncm", headerName: "NCM", width: 100, editable: true },
    { field: "cfop", headerName: "CFOP", width: 100, editable: true },
    { field: "unit", headerName: "UN", width: 90, editable: true },
    { field: "qty", headerName: "Qtd", width: 90, editable: true },
    { field: "price", headerName: "Preço", width: 100, editable: true },
    { field: "freight", headerName: "Frete", width: 100, editable: true },
    { field: "taxes", headerName: "Impostos", width: 110, editable: true },
    { field: "weightL", headerName: "Peso Líq.", width: 110, editable: true },
    { field: "weightB", headerName: "Peso Bruto", width: 110, editable: true },

    {
      field: "actions",
      headerName: "Ações",
      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => handleDeleteRow(params.row.id)}
          style={{
            background: "red",
            border: "none",
            padding: "5px 10px",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Excluir
        </button>
      ),
    },
  ];

  return (
    <div className="product-page">
      <h2>Cadastro de Produtos</h2>

      {/* IMPORTAR XML */}
      <div className="product-form">
        <input type="file" accept=".xml" onChange={handleImportXML} />
      </div>

      {/* FORMULÁRIO DE CADASTRO -->} */}
      <form className="product-form" onSubmit={(e) => e.preventDefault()}>
        {Object.keys(form).map((key) => (
          key !== "volumeType" && (
            <input
              key={key}
              name={key}
              placeholder={key.toUpperCase()}
              value={form[key]}
              onChange={handleChange}
            />
          )
        ))}

        <select
          name="volumeType"
          value={form.volumeType}
          onChange={handleChange}
        >
          <option value="">Tipo de Volume</option>
          <option value="UN">Unidade (UN)</option>
          <option value="L">Litros</option>
          <option value="KG">Quilos</option>
          <option value="M">Metros</option>
        </select>

        <button onClick={handleAdd}>Adicionar Produto</button>
      </form>

      {/* TABELA EDITÁVEL */}
      <div className="product-table">
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          processRowUpdate={(newRow) => newRow}
          onCellEditStop={handleEditCell}
        />
      </div>
    </div>
  );
}

export default ProductRegister;
