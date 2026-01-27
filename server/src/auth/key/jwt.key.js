import crypto from 'crypto';


let currentKey = generateKey();
let oldKey = null;

function generateKey() {
  return crypto.randomBytes(64).toString('hex');
}

setInterval(() => {
  oldKey = currentKey;
  currentKey = generateKey();
  // console.log('🔁 Chave JWT rotacionada');
}, process.env.KEY_CACHE_ROTATION_HOURS * 60 * 60 * 1000);


export function getJwtSigningKey() {
  return currentKey;
}
export function getOldJwtSigningKey() {
  return oldKey;
}