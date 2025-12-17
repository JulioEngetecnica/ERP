// products/services/productService.js
import { productApi } from "../api/productApi";

export const productService = {
  async list() {
    return await productApi.getAll();
  },

  async create(data) {
    if (!data) {
      throw new Error("Dados do produto são obrigatórios");
    }

    return await productApi.create(data);
  },

  async update(id, data) {
    if (!id) {
      throw new Error("ID do produto é obrigatório");
    }

    return await productApi.update(id, data);
  },

  async remove(id) {
    if (!id) {
      throw new Error("ID do produto é obrigatório");
    }

    return await productApi.remove(id);
  },
};
