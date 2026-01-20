// servicos/edit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServicoForm from "./components/ServicoForm";
import { servicoService } from "./services/servicoService";

export default function EditServicoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    async function load() {
      const resp = await servicoService.list();
      const servico = resp.data.find(p => p.id === Number(id));
      setFormData(servico);
    }
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await servicoService.update(id, formData);
    navigate("/servicos");
  };

  if (!formData) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Serviço</h1>
      <ServicoForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
