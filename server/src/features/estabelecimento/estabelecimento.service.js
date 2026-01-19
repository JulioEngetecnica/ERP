import db from "#models/index.js";

export const EstabelecimentoService = {
  async criarEstabelecimento(data) {
    return await db.Estabelecimento.create(data);
  },

  async listarEstabelecimentos() {
    return await db.Estabelecimento.findAll({
      include: [
        {
          model: db.Usuario,
          as: "usuario",
        },
        {
          model: db.Funcionario,
          as: "funcionario",
        },
      ],
    });
  },

  async buscarEstabelecimentoPorId(id) {
    return await db.Estabelecimento.findByPk(id, {
      include: [
        {
          model: db.Usuario,
          as: "usuario",
        },
        {
          model: db.Funcionario,
          as: "funcionario",
        },
      ],
    });
  },

  async atualizarEstabelecimento(id, data) {
    const estabelecimento = await db.Estabelecimento.findByPk(id);
    if (!estabelecimento) return null;

    await estabelecimento.update(data);
    return estabelecimento;
  },

  async deletarEstabelecimento(id) {
    const estabelecimento = await db.Estabelecimento.findByPk(id);
    if (!estabelecimento) return null;

    await estabelecimento.destroy(); // soft delete
    return true;
  },
};
