import { validateJwt } from '../service/jwt.service.js';

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  try {
    const result = await validateJwt(token);

    req.user = result.payload;

    if (result.status === 'refreshed') {
      res.setHeader('x-refresh-token', result.token);
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

