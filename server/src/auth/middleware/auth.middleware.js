import { sendJwtCookie, validateJwt } from '../service/jwt.service.js';

export async function authMiddleware(req, res, next) {
  const token = req.cookies?.access_token;

  // console.log(req.cookies?.access_token);
  if (!token) {
    return res.status(401).json({ error: 'Token não informado' });
  }
  try {
    const result = await validateJwt(token);

    if (result.newJwt) {
      sendJwtCookie(res, result.newJwt);
    }

    req.user = result.payload;

    next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}

