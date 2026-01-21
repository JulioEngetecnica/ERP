import db from "#models";

export const UsuarioService = {
  async criarUsuario(data) {
    const usuario = await db.Usuario.create(data);
    return usuario;
  },

  async listarUsuarios() {
    const usuarios = await db.Usuario.findAll();
    return usuarios;
  },

  async buscarUsuarioPorId(id) {
    const usuario = await db.Usuario.findByPk(id);
    return usuario;
  },

  async atualizarUsuario(id, data) {
    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) return null;
    await usuario.update(data);
    return usuario;
  },

  async deletarUsuario(id) {
    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) return null;
    await usuario.destroy();
    return true;
  },

  async loginUsuario(request) {
    const email = request.email;
    const senha = request.senha;
    const usuario = await db.Usuario.findOne({ where: { email } });
    if (!usuario) {
      return null; // usuário não encontrado
    }

    const senhaValida = await usuario.validarSenha(senha);

    if (!senhaValida) {
      return null; // senha inválida
    }

    return usuario.dataValues.id; // login bem-sucedido
  }
};
