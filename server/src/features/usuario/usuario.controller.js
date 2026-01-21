import { UsuarioService } from './usuario.service.js';
import SessionTokenService from '#auth/service/sessionToken.service.js';
import { createJwt } from '#auth/service/jwt.service.js';


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
    // 1️⃣ Valida credenciais
    const user = await UsuarioService.loginUsuario(req.body);

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // 2️⃣ Cria token de sessão (DB)
    const sessionToken = await SessionTokenService.create(user);

    // 3️⃣ Gera JWT
    const jwtToken = createJwt({
      userId: user,
      sessionToken
    });
    

    // 4️⃣ Envia JWT ao cliente (cookie seguro)
    res.cookie('access_token', jwtToken, {
      httpOnly: true,
      secure: process.env.SECURE_HTTPS,
      sameSite: 'strict',
      maxAge: 30 * 60 * 1000 // 30 minutos
    });
    console.log("JWT gerado:", jwtToken);
    return res.json({
      message: 'Usuário logado com sucesso',
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
};
