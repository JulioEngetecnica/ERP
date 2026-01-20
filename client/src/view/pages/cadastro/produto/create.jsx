// produtos/create.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProdutoForm from "./components/ProdutoForm";
import { produtoService } from "./services/produtoService";
import "./styles/create.css";

export default function CreateProdutoPage() {
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
    await produtoService.create(formData); 
    navigate("/produtos");
  };

  return (
    <div className="produto-create-page">
      <h1>Cadastrar Serviço</h1>

      <div className="produto-form-wrapper">
        <h2>Dados do Serviço</h2>

        <ProdutoForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
