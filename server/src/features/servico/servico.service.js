import db from "#models";

export const ServicoService = {
  async getAll() {
    return await db.Servico.findAll();
  },

  async getById(id) {
    return await db.Servico.findByPk(id);
  },

  async create(data, user) {
    const estabelecimento = await db.Estabelecimento.findOne({
          where: { id_usuario : user }
        });
    
        data = {
          ...data,
          id_estabelecimento: estabelecimento.id,
        };
    
    return await db.Servico.create(data);
  },

  async update(id, data) {
    const servico = await db.Servico.findByPk(id);
    if (!servico) return null;
    return await servico.update(data);
  },

  async delete(id) {
    const servico = await db.Servico.findByPk(id);
    if (!servico) return false;
    await servico.destroy();
    return true;
  }
};
