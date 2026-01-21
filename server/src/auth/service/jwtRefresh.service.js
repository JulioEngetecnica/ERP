import jwt from 'jsonwebtoken';
import SessionTokenService from './sessionToken.service.js';
import { createJwt } from './jwt.service.js';

export async function refreshJwt(expiredJwt) {
  const decoded = jwt.decode(expiredJwt);

  if (!decoded?.userId || !decoded?.sessionToken) {
    throw new Error('JWT inválido para refresh');
  }

  // Proteção mínima contra replay eterno
  if (!decoded.exp || decoded.exp * 1000 < Date.now() - 24 * 60 * 60 * 1000) {
    throw new Error('Token antigo demais');
  }

  const valid = await SessionTokenService.validate(
    decoded.userId,
    decoded.sessionToken
  );

  if (!valid) {
    throw new Error('Sessão revogada');
  }

  const newJwt = createJwt({
    userId: decoded.userId,
    sessionToken: decoded.sessionToken
  });

  return {
    status: 'refreshed',
    token: newJwt,
    payload: decoded
  };
}
