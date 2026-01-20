// servicos/services/servicoService.js
import { servicoApi } from "../api/servicoApi";

export const servicoService = {
  async list() {
    return await servicoApi.getAll();
  },

  async create(data) {
    if (!data) {
      throw new Error("Dados do serviço são obrigatórios");
    }

    return await servicoApi.create(data);
  },

  async update(id, data) {
    if (!id) {
      throw new Error("ID do serviço é obrigatório");
    }

    return await servicoApi.update(id, data);
  },

  async remove(id) {
    if (!id) {
      throw new Error("ID do serviço é obrigatório");
    }

    return await servicoApi.remove(id);
  },
};
