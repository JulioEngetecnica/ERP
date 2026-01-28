import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import { Button } from "react-bootstrap";
import { FaTrash, FaSave, FaEdit } from "react-icons/fa";
import { useState } from "react";

export default function ProdutoTable({
  produtos,
  onSaveEdit,
  onDelete
}) {
  const [rowModesModel, setRowModesModel] = useState({});

  const handleEditClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = async (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const processRowUpdate = async (newRow, oldRow) => {
    const editedFields = {};
    Object.keys(newRow).forEach((key) => {
      if (newRow[key] !== oldRow[key]) {
        editedFields[key] = newRow[key];
      }
    });

    if (Object.keys(editedFields).length > 0) {
      await onSaveEdit(newRow.id, editedFields);
    }
    return newRow;
  };

  const handleRowEditStop = (params, event) => {
    const id = params.id;
    const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;

    if (isEditing) {
      // Bloquear sair da edição sem salvar
      event.defaultMuiPrevented = true;
    }
  };

  const columns = [
    { 
      field: "nome", headerName: "Nome", flex: 1, editable: true 
    },


    { 
      field: "descricao", headerName: "Descrição", flex: 1, editable: true 
    },


    { field: "preco", headerName: "Valor do Produto", flex: 1, editable: true, type: "number" },

    {
      field: "actions",
      headerName: "Ações",
      width: 180,
      sortable: false,
      renderCell: (params) => {
        const isEditing = rowModesModel[params.id]?.mode === GridRowModes.Edit;

        return (
          <div style={{ display: "flex", gap: 8, justifyContent:"center", padding:10 }}>
            {isEditing ? (
              <Button
                variant="success"
                size="sm"
                onClick={() => handleSaveClick(params.id)}
              >
                <FaSave />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleEditClick(params.id)}
              >
                <FaEdit />
              </Button>
            )}

            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(params.id)}
            >
              <FaTrash />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={produtos}
        columns={columns}
        pageSize={10}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        onRowEditStop={handleRowEditStop} // bloqueia sair sem salvar
      />
    </div>
  );
}
