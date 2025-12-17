import { useState } from "react";
import "./product.css";

export default function ProductForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    measuringUnit: "", // unidade / litro / metro
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Cadastrar Produto</h2>

      <label>Nome</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Imagem (URL)</label>
      <input name="image" value={formData.image} onChange={handleChange} />

      <label>Descrição</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />

      <label>Unidade de Medida</label>
      <select
        name="measuringUnit"
        value={formData.measuringUnit}
        onChange={handleChange}
        required
      >
        <option value="">Selecione</option>
        <option value="UN">Unidade</option>
        <option value="L">Litro</option>
        <option value="M">Metro</option>
      </select>

      <label>Preço de Venda</label>
      <input
        name="price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Estoque Inicial</label>
      <input
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
