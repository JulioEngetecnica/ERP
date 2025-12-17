import Usuario from '#models/Usuario.js'; // ajuste o path se necessário

export const UsuarioService = {
  async criarUsuario(data) {
    const usuario = await Usuario.create(data);
    return usuario;
  },

  async listarUsuarios() {
    const usuarios = await Usuario.findAll();
    return usuarios;
  },

  async buscarUsuarioPorId(id) {
    const usuario = await Usuario.findByPk(id);
    return usuario;
  },

  async atualizarUsuario(id, data) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    await usuario.update(data);
    return usuario;
  },

  async deletarUsuario(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    await usuario.destroy();
    return true;
  }
};
