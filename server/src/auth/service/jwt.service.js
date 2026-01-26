import jwt from 'jsonwebtoken';
import { getJwtSigningKey, getOldJwtSigningKey } from '../key/jwt.key.js';
import DatabaseSessionToken from './DatabaseSessionToken.service.js';

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

export async function validateJwt(jwtToken) {
  try {
    return {
      payload: jwt.verify(jwtToken, getJwtSigningKey())
    };
  } catch (err) {
    try {
        const oldToken = jwt.verify(jwtToken, getOldJwtSigningKey());
        const newJwt = await refreshJwt(oldToken);
        return {
          newJwt: newJwt,
          payload: jwt.verify(newJwt, getJwtSigningKey())
        };
    } catch (err) {
      throw new Error('Token inválido');
    }
  }
}

export function sendJwtCookie(res, jwtToken) {
  res.cookie('access_token', jwtToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 2 * 60 * 60 * 1000
  });
}

async function refreshJwt(oldToken) {
  const valid = await DatabaseSessionToken.validate(
    oldToken.userId,
    oldToken.sessionToken
  );

  if (!valid) {
    throw new Error('Sessão revogada');
  }

  const newJwt = createJwt({
    userId: oldToken.userId,
    sessionToken: oldToken.sessionToken
  });

  return newJwt;
}
