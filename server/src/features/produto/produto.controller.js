import { ProdutoService } from "./produto.service.js";

export const ProdutoController = {
  async getAll(req, res) {
    try {
      const produtos = await ProdutoService.getAll();
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const produto = await ProdutoService.getById(req.params.id);
      if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const produto = await ProdutoService.create(req.body, req.user.userId);
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const produto = await ProdutoService.update(req.params.id, req.body);
      if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
      res.json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ProdutoService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Produto não encontrado" });
      res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
