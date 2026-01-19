import { EstabelecimentoService } from "./estabelecimento.service.js";

export const EstabelecimentoController = {
  async getAll(req, res) {
    try {
      const estabelecimentos = await EstabelecimentoService.listarEstabelecimentos();
      res.json(estabelecimentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const estabelecimento = await EstabelecimentoService.buscarEstabelecimentoPorId(
        req.params.id
      );

      if (!estabelecimento)
        return res.status(404).json({ message: "Estabelecimento não encontrado" });

      res.json(estabelecimento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const estabelecimento = await EstabelecimentoService.criarEstabelecimento(req.body);
      res.status(201).json(estabelecimento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const estabelecimento = await EstabelecimentoService.atualizarEstabelecimento(
        req.params.id,
        req.body
      );

      if (!estabelecimento)
        return res.status(404).json({ message: "Estabelecimento não encontrado" });

      res.json(estabelecimento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await EstabelecimentoService.deletarEstabelecimento(req.params.id);
      if (!deleted)
        return res.status(404).json({ message: "Estabelecimento não encontrado" });

      res.json({ message: "Estabelecimento deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
