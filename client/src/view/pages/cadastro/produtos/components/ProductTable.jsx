// products/components/ProductTable.jsx
import { DataGrid } from "@mui/x-data-grid";

export default function ProductTable({
  products,
  editRowsModel,
  setEditRowsModel,
  onSaveEdit,
  onDelete
}) {
  console.log(products);
  const columns = [
    { field: "nome", headerName: "Nome", flex: 1, editable: true },

    {
      field: "imagem",
      headerName: "Imagem",
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <img src={params.value} alt="" width="45" style={{ borderRadius: 4 }} />
      ),
    },

    { field: "descricao", headerName: "Descrição", flex: 1, editable: true },

    {
      field: "unidade_medida",
      headerName: "Unidade",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["UN", "L", "M"],
    },

    { field: "preco", headerName: "Preço", flex: 1, editable: true, type: "number" },
    { field: "estoque", headerName: "Estoque", flex: 1, editable: true, type: "number" },

    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <button onClick={() => onDelete(params.id)}>
          Excluir
        </button>
      ),
    },
  ];

  const handleRowEditStop = async (params) => {
    const id = params.id;
    const rowData = editRowsModel[id];

    if (!rowData) return;

    const editedFields = {};
    Object.keys(rowData).forEach((field) => {
      editedFields[field] = rowData[field].value;
    });

    await onSaveEdit(id, editedFields);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        editRowsModel={editRowsModel}
        onEditRowsModelChange={setEditRowsModel}
        onRowEditStop={handleRowEditStop}
      />
    </div>
  );
}
