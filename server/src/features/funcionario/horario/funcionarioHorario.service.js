import db from "#models";
import { Op } from "sequelize";

export default class FuncionarioHorarioService {

  static async setHorario({
    id_funcionario,
    dia_semana = null,
    data = null,
    atendimento = false,
    entrada = null,
    saida = null
  }) {


    // 🔒 verifica conflito com horários existentes
    const conflito = await db.FuncionarioHorario.findOne({
      where: {
        id_funcionario,
        dia_semana,
        data,
        entrada: { [Op.lt]: saida },
        saida: { [Op.gt]: entrada }
      }
    });
    if (conflito) {
      throw new Error("Intervalo conflita com outro horário do funcionário");
    }

    // 🔹 cria horário
    const registro = await db.FuncionarioHorario.create({
      id_funcionario,
      dia_semana,
      data,
      entrada,
      saida,
      atendimento
    });

    return registro;
  }

  static async getHorarios({ id_funcionario, dia_semana = null, data = null }) {
    if (!id_funcionario) throw new Error("id_funcionario é obrigatório");
    const where = {
      id_funcionario,
      ...(dia_semana && { dia_semana }),
      ...(data && { data })
    };

    const registros = await db.FuncionarioHorario.findAll({ where, order: [['entrada', 'ASC']] });
 
    return registros;
  }

}
