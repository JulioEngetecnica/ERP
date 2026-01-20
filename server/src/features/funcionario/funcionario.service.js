import db from "#models";

export const FuncionarioService = {
  async criarFuncionario(data) {
    return await db.Funcionario.create(data);
  },

  async listarFuncionarios() {
    return await db.Funcionario.findAll({
      include: [
        {
          model: db.Estabelecimento,
          as: "estabelecimento",
        },
      ],
    });
  },

  async buscarFuncionarioPorId(id) {
    return await db.Funcionario.findByPk(id, {
      include: [
        {
          model: db.Estabelecimento,
          as: "estabelecimento",
        },
      ],
    });
  },

  async atualizarFuncionario(id, data) {
    const funcionario = await db.Funcionario.findByPk(id);
    if (!funcionario) return null;

    await funcionario.update(data);
    return funcionario;
  },

  async deletarFuncionario(id) {
    const funcionario = await db.Funcionario.findByPk(id);
    if (!funcionario) return null;

    await funcionario.destroy(); // soft delete
    return true;
  },
};
