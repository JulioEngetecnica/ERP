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
    { expiresIn: process.env.JWT_EXPIRE_IN_MINUTES + 'm' }
  );
}

export async function validateJwt(jwtToken) {
  try {
    return {
      payload: jwt.verify(jwtToken, getJwtSigningKey())
    };
  } catch (err) {
    try {
      let oldToken;
      if (err.name === 'TokenExpiredError') {
        oldToken = jwt.verify(jwtToken, getJwtSigningKey(), { ignoreExpiration: true });
      } else {
        oldToken = jwt.verify(jwtToken, getOldJwtSigningKey(), { ignoreExpiration: true }); 
      }
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
    maxAge: process.env.COOKIE_MAX_AGE_HOURS * 60 * 60 * 1000
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
