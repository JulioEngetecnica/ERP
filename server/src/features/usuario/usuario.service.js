import db from "#models/index.js";

export const UsuarioService = {
  async criarUsuario(data) {
    return await db.Usuario.create(data);
  },

  async listarUsuarios() {
    return await db.Usuario.findAll();
  },

  async buscarUsuarioPorId(id) {
    return await db.Usuario.findByPk(id);
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

    await usuario.destroy(); // soft delete por causa do paranoid
    return true;
  },
};
