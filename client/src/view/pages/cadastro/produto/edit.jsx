// produtos/edit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProdutoForm from "./components/ProdutoForm";
import { produtoService } from "./services/produtoService";

export default function EditProdutoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    async function load() {
      const resp = await produtoService.list();
      const produto = resp.data.find(p => p.id === Number(id));
      setFormData(produto);
    }
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await produtoService.update(id, formData);
    navigate("/produtos");
  };

  if (!formData) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Produto</h1>
      <ProdutoForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
