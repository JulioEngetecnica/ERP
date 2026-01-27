import { createJwt, sendJwtCookie } from '#auth/service/jwt.service.js';
import DatabaseSessionToken from '#root/auth/service/DatabaseSessionToken.service.js';
import { LoginService } from './login.service.js';


export const LoginController = {
  async login(req, res) {
    try {
      const user = await LoginService.login(req.body);

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
