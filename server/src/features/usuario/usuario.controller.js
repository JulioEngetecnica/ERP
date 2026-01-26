import { UsuarioService } from './usuario.service.js';
import { createJwt, sendJwtCookie } from '#auth/service/jwt.service.js';
import DatabaseSessionToken from '#root/auth/service/DatabaseSessionToken.service.js';


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
      const user = await UsuarioService.loginUsuario(req.body);

      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Cria token de sessão (DB)
      const sessionToken = await DatabaseSessionToken.create(user);

      // Gera JWT
      const jwtToken = createJwt({
        userId: user,
        sessionToken
      });

      sendJwtCookie(res, jwtToken);
      
      return res.json({
        message: 'Usuário logado com sucesso',
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
