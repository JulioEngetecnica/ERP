import db from "#models";

export const ProdutoService = {
  async getAll() {
    return await db.Produto.findAll();
  },

  async getById(id) {
    return await db.Produto.findByPk(id);
  },

  async create(data) {
    return await db.Produto.create(data);
  },

  async update(id, data) {
    const produto = await db.Produto.findByPk(id);
    if (!produto) return null;
    return await produto.update(data);
  },

  async delete(id) {
    const produto = await db.Produto.findByPk(id);
    if (!produto) return false;
    await produto.destroy();
    return true;
  }
};
