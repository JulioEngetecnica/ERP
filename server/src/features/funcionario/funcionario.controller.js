import { FuncionarioService } from "./funcionario.service.js";

export const FuncionarioController = {
  async getAll(req, res) {
    try {
      const funcionarios = await FuncionarioService.listarFuncionarios();
      res.json(funcionarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const funcionario = await FuncionarioService.buscarFuncionarioPorId(req.params.id);
      if (!funcionario)
        return res.status(404).json({ message: "Funcionário não encontrado" });

      res.json(funcionario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const funcionario = await FuncionarioService.criarFuncionario(req.body);
      res.status(201).json(funcionario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const funcionario = await FuncionarioService.atualizarFuncionario(
        req.params.id,
        req.body
      );

      if (!funcionario)
        return res.status(404).json({ message: "Funcionário não encontrado" });

      res.json(funcionario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await FuncionarioService.deletarFuncionario(req.params.id);
      if (!deleted)
        return res.status(404).json({ message: "Funcionário não encontrado" });

      res.json({ message: "Funcionário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
