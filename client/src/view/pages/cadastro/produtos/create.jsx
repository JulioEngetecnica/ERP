// products/create.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import { productService } from "./services/productService";
import "./styles/create.css";

export default function CreateProductPage() {
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
    await productService.create(formData); // ou postProduct
    navigate("/produtos");
  };

  return (
    <div className="product-create-page">
      

      <div className="product-form-wrapper">
        <h2>Novo Produto</h2>

        <ProductForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
