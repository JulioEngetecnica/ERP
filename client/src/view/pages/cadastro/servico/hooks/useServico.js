// servico/hooks/useServicos.js
import { useEffect, useState } from "react";
import { servicoService } from "../services/servicoService";

export function useServico() {
  const [servico, setServico] = useState([]);

  const loadServico = async () => {
    const resp = await servicoService.list();
    setServico(resp);
  };

  const saveEdit = async (id, data) => {
    await servicoService.update(id, data);
    loadServico();
  };

  const deleteById = async (id) => {
    if (confirm("Deseja realmente excluir?")) {
      await servicoService.remove(id);
      loadServico();
    }
  };

  useEffect(() => {
    loadServico();
  }, []);

  return {
    servico,
    saveEdit,
    deleteById
  };
}
