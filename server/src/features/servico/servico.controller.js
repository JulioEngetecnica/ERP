import { ServicoService } from "./servico.service.js";

export const ServicoController = {
  async getAll(req, res) {
    try {
      const servicos = await ServicoService.getAll();
      res.json(servicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const servico = await ServicoService.getById(req.params.id);
      if (!servico) return res.status(404).json({ message: "Serviço não encontrado" });
      res.json(servico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const servico = await ServicoService.create(req.body);
      res.status(201).json(servico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const servico = await ServicoService.update(req.params.id, req.body);
      if (!servico) return res.status(404).json({ message: "Serviço não encontrado" });
      res.json(servico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ServicoService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Serviço não encontrado" });
      res.json({ message: "Serviço deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
