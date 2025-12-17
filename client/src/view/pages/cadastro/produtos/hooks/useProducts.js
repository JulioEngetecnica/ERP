// products/hooks/useProducts.js
import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});

  const loadProducts = async () => {
    const resp = await productService.list();
    setProducts(resp);
  };

  const saveEdit = async (id, data) => {
    await productService.update(id, data);
    loadProducts();
  };

  const deleteById = async (id) => {
    if (confirm("Deseja realmente excluir?")) {
      await productService.remove(id);
      loadProducts();
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    editRowsModel,
    setEditRowsModel,
    saveEdit,
    deleteById
  };
}
