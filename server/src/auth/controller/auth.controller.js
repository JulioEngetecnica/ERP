import DatabaseSessionToken from '#auth/service/DatabaseSessionToken.service.js';
import { sendJwtCookie } from "#auth/service/jwt.service.js";

export async function me(req, res) {
  res.json({
    success: true,
    user: {
      id: req.user.userId,
    }
  });
}

export async function logout(req, res) {
  try {
    if (!req.user.userId) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    await DatabaseSessionToken.revoke(req.user.userId);
    sendJwtCookie(res, null);
    return res.json({
      message: 'Usuário deslogado com sucesso',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}