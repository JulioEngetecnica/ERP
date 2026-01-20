import { UsuarioService } from './usuario.service.js';
import criarToken from '#root/auth/token.guard.js';

export const UsuarioController = {
  async criar(req, res) {
    try {
      const usuario = await UsuarioService.criarUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await UsuarioService.listarUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const usuario = await UsuarioService.buscarUsuarioPorId(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const usuario = await UsuarioService.atualizarUsuario(req.params.id, req.body);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const resultado = await UsuarioService.deletarUsuario(req.params.id);
      if (!resultado) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async login(req, res) {
    try {
      const resultado = await UsuarioService.loginUsuario(req.body);
      if (!resultado) return res.status(404).json({ error: 'Usuário não encontrado' });
      const sessao = criarToken(resultado);
      const expiracao = sessao.expiresAt.getTime() - Date.now();

      res.cookie('token', sessao.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: expiracao 
      });

      res.json({ message: 'Usuário logado com sucesso', user: sessao.userId });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
