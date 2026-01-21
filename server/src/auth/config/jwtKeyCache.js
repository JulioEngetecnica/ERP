import crypto from 'crypto';

let currentKey = generateKey();

function generateKey() {
  return crypto.randomBytes(64).toString('hex');
}

// Rotação automática a cada 30 minutos
setInterval(() => {
  currentKey = generateKey();
  console.log('🔁 Chave JWT rotacionada');
}, 30 * 60 * 1000);

export function getJwtSigningKey() {
  return currentKey;
}
