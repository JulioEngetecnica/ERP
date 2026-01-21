// src/config/keyCache.js
import crypto from 'crypto';

let currentKey = generateKey();
let lastRotation = Date.now();

function generateKey() {
  return crypto.randomBytes(64).toString('hex');
}

// Rotação automática a cada 30 minutos
setInterval(() => {
  currentKey = generateKey();
  lastRotation = Date.now();
  console.log('🔁 Chave JWT rotacionada');
}, 30 * 60 * 1000);

export function getSigningKey() {
  return currentKey;
}
