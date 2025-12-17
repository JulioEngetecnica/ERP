// import { createProduct } from "../api/products";
import ProductPage from "../../estoqueOld/cadastroProdutoOld";
import "./product.css";
import ProductForm from "./productForm";
import { useNavigate } from "react-router-dom";

export default function ProductCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createProduct(data);
    navigate("/produtos");
  };

  return (
  <div className="product-page">
    <ProductForm onSubmit={handleSubmit} />
  </div>
);
}
