// src/services/authToken.service.js
import criarToken from "../token/token.provider";
import db from "#models";

class AuthTokenService {

  /**
   * Cria (ou substitui) o token de sessão do usuário
   */
  static async create(userId) {
    const sessao = criarToken(userId);
    const token = sessao.token;
    await db.User.update(
      { token },
      { where: { id: userId } }
    );
    
    return sessao;
  }

  /**
   * Valida se o token recebido ainda é válido
   */
  static async validate(userId, token) {
    return db.User.findOne({
      where: {
        id: userId,
        token
      }
    });
  }

  /**
   * Logout do usuário
   */
  static async revoke(userId) {
    await db.User.update(
      { token: null },
      { where: { id: userId } }
    );
  }
}

export default AuthTokenService;
