import db from "#models";

export const LoginService = {
  async login(request) {
    const email = request.email;
    const senha = request.senha;
    const usuario = await db.Usuario.findOne({ where: {email}  });
    if (!usuario) {
      return null; // usuário não encontrado
    }
    const senhaValida = await usuario.validarSenha(senha);
    if (!senhaValida) {
      return null; // senha inválida
    }
    
    return usuario.dataValues; // login bem-sucedido
  }
};
