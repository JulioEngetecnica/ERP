// servicos/create.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServicoForm from "./components/ServicoForm";
import { servicoService } from "./services/servicoService";
import "./styles/create.css";

export default function CreateServicoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    imagem: "",
    descricao: "",
    unidade_medida: "UN",
    preco: 0,
    estoque: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await servicoService.create(formData); 
    navigate("/produtos");
  };

  return (
    <div className="servico-create-page">
      <h1>Cadastrar Serviço</h1>

      <div className="servico-form-wrapper">
        <h2>Dados do Serviço</h2>

        <ServicoForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
