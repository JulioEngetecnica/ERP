// produtos/services/produtoService.js
import { produtoApi } from "../api/produtoApi";

export const produtoService = {
  async list() {
    return await produtoApi.getAll();
  },

  async create(data) {
    if (!data) {
      throw new Error("Dados do serviço são obrigatórios");
    }

    return await produtoApi.create(data);
  },

  async update(id, data) {
    if (!id) {
      throw new Error("ID do serviço é obrigatório");
    }

    return await produtoApi.update(id, data);
  },

  async remove(id) {
    if (!id) {
      throw new Error("ID do serviço é obrigatório");
    }

    return await produtoApi.remove(id);
  },
};
