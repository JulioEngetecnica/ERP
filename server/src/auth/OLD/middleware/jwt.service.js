import jwt from 'jsonwebtoken';
import getSigningKey from '../token/keyCache.provider.js';
import { refreshJwt } from './refreshJwt.service.js';


export function createJwt(sessao) {
  if (!sessao?.idUser || !sessao?.token) {
    throw new Error('Sessão inválida para gerar JWT');
  }

  const signingKey = getSigningKey(); // chave dinâmica atual

  const payload = {
    userId: sessao.idUser,
    sessionToken: sessao.token
  };

  return jwt.sign(payload, signingKey, {
    expiresIn: '30m'
  });
}

export async function validateJwt(token) {
  if (!token) {
    throw new Error('Token não informado');
  }

  const signingKey = getSigningKey();

  try {
    // 1️⃣ Validação normal
    return {
      status: 'valid',
      payload: jwt.verify(token, signingKey)
    };

  } catch (err) {
    // 2️⃣ Só permite refresh se expirou
    if (err instanceof jwt.TokenExpiredError) {
      return await refreshJwt(token);
    }

    // 3️⃣ Qualquer outro erro é ataque ou token inválido
    throw new Error('Token inválido');
  }
}