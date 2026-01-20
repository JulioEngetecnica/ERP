import crypto from 'crypto';

// Função para criar token
export default function criarToken(userId) {
  const token = crypto.randomBytes(32).toString('hex'); // token aleatório seguro
  const validade = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10 horas a partir de agora

  // Estrutura para salvar no banco
  const sessao = {
    userId: userId,
    token: token,
    expiresAt: validade
  };

  return sessao;
}
