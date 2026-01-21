import jwt from 'jsonwebtoken';
import { validate } from './authToken.service.js';
import { createJwt } from './jwt.service.js';

/**
 * Faz refresh de um JWT expirado
 * @param {string} jwtToken - JWT expirado
 */
export async function refreshJwt(jwtToken) {
  if (!jwtToken) {
    throw new Error('Token não informado para refresh');
  }

  // 1️⃣ Decodifica o JWT SEM validar assinatura/expiração
  const decoded = jwt.decode(jwtToken);

  if (!decoded?.userId || !decoded?.sessionToken) {
    throw new Error('JWT inválido para refresh');
  }

  const { userId, sessionToken } = decoded;

  // 2️⃣ Valida token criptográfico no banco
  const isValid = await validate(userId, sessionToken);

  if (!isValid) {
    throw new Error('Sessão inválida ou revogada');
  }

  // 3️⃣ Cria nova sessão (pode manter ou trocar o token interno)
  const novaSessao = {
    id_usuario: userId,
    token: sessionToken
  };

  // 4️⃣ Gera novo JWT
  const newJwt = createJwt(novaSessao);

  return {
    status: 'refreshed',
    token: newJwt,
    payload: decoded
  };
}
