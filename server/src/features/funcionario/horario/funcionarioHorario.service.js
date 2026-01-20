import db from "#models";

export default class FuncionarioHorarioService {
  static async setHorario({
    idFuncionario,
    diaSemana = null,
    data = null,
    atendimento,
    entrada = null,
    saida = null
  }) {
    // 🔒 Regra: diaSemana OU data
    if (!diaSemana && !data) {
      throw new Error("Informe diaSemana ou data");
    }

    if (diaSemana && data) {
      throw new Error("Use apenas diaSemana OU data, nunca os dois");
    }

    // 🔒 Regra: atendimento exige horário válido
    if (atendimento === true) {
      if (!this.compararHorario(entrada, saida)) {
        throw new Error("Horário inválido");
      }
    }

    const where = {
      id_funcionario: idFuncionario,
      ...(diaSemana !== null && { dia_semana: diaSemana }),
      ...(data !== null && { data })
    };

    const [registro] = await db.HorarioFuncionario.findOrCreate({
      where,
      defaults: {
        atendimento: atendimento ?? false,
        entrada: atendimento ? entrada : null,
        saida: atendimento ? saida : null
      }
    });

    await registro.update({
      atendimento,
      entrada: atendimento ? entrada : null,
      saida: atendimento ? saida : null
    });

    return registro;
  }

  static compararHorario(entrada, saida) {
    if (!entrada || !saida) return false;

    const [h1, m1] = entrada.split(":").map(Number);
    const [h2, m2] = saida.split(":").map(Number);

    let inicio = h1 * 60 + m1;
    let fim = h2 * 60 + m2;

    // Permite virar o dia
    if (fim <= inicio) {
      fim += 1440;
    }

    return fim > inicio;
  }
}
