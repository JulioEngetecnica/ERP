import { useEffect, useState } from "react";
// import { getProducts, updateProduct, deleteProduct } from "../api/products";
import { Link } from "react-router-dom";
import "./product.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await getProducts();
    setProducts(resp.data);
  };

  const handleEdit = (product) => {
    setEditRowId(product.id);
    setEditData(product);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    await updateProduct(id, editData);
    setEditRowId(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (confirm("Deseja realmente excluir?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="product-page">
      <div className="header">
        <h1>Produtos</h1>
        <Link to="/produtos/novo" className="btn-new">Novo Produto</Link>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Imagem</th>
            <th>Descrição</th>
            <th>Unidade</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) =>
            editRowId === p.id ? (
              <tr key={p.id}>
                <td>
                  <input name="name" value={editData.name} onChange={handleChange} />
                </td>
                <td>
                  <input name="image" value={editData.image} onChange={handleChange} />
                </td>
                <td>
                  <input name="description" value={editData.description} onChange={handleChange} />
                </td>
                <td>
                  <select name="measuringUnit" value={editData.measuringUnit} onChange={handleChange}>
                    <option value="UN">Unidade</option>
                    <option value="L">Litro</option>
                    <option value="M">Metro</option>
                  </select>
                </td>
                <td>
                  <input name="price" type="number" value={editData.price} onChange={handleChange} />
                </td>
                <td>
                  <input name="stock" type="number" value={editData.stock} onChange={handleChange} />
                </td>
                <td>
                  <button onClick={() => saveEdit(p.id)}>Salvar</button>
                  <button onClick={() => setEditRowId(null)}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td><img src={p.image} alt="" width="50" /></td>
                <td>{p.description}</td>
                <td>{p.measuringUnit}</td>
                <td>R$ {p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id)}>Excluir</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
