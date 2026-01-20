// produto/hooks/useProdutos.js
import { useEffect, useState } from "react";
import { produtoService } from "../services/produtoService";

export function useProduto() {
  const [produto, setProduto] = useState([]);

  const loadProduto = async () => {
    const resp = await produtoService.list();
    setProduto(resp);
  };

  const saveEdit = async (id, data) => {
    await produtoService.update(id, data);
    loadProduto();
  };

  const deleteById = async (id) => {
    if (confirm("Deseja realmente excluir?")) {
      await produtoService.remove(id);
      loadProduto();
    }
  };

  useEffect(() => {
    loadProduto();
  }, []);

  return {
    produto,
    saveEdit,
    deleteById
  };
}
