// src/api/productApi.js
import api from "@/api/api";

export const productApi = {
  getAll() {
    return api.get("/produto");
  },

  getById(id) {
    return api.get(`/produto/${id}`);
  },

  create(data) {
    return api.post("/produto/", data);
  },


  update(id, data) {
    return api.put(`/produto/${id}`, data);
  },

  remove(id) {
    return api.delete(`/produto/${id}`);
  },
};
