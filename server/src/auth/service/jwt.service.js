import jwt from 'jsonwebtoken';
import { getJwtSigningKey } from '../config/jwtKeyCache.js';
import { refreshJwt } from './jwtRefresh.service.js';

export function createJwt({ userId, sessionToken }) {
  if (!userId || !sessionToken) {
    throw new Error('Dados inválidos para gerar JWT');
  }

  return jwt.sign(
    { userId, sessionToken },
    getJwtSigningKey(),
    { expiresIn: '30m' }
  );
}

export async function validateJwt(token) {
  try {
    return {
      status: 'valid',
      payload: jwt.verify(token, getJwtSigningKey())
    };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return await refreshJwt(token);
    }

    throw new Error('Token inválido');
  }
}
