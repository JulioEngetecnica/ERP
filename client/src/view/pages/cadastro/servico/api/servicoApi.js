// src/api/servicoApi.js
import api from "@api";

export const servicoApi = {
  getAll() {
    return api.get("/servico");
  },

  getById(id) {
    return api.get(`/servico/${id}`);
  },

  create(data) {
    return api.post("/servico/", data);
  },


  update(id, data) {
    return api.put(`/servico/${id}`, data);
  },

  remove(id) {
    return api.delete(`/servico/${id}`);
  },
};
