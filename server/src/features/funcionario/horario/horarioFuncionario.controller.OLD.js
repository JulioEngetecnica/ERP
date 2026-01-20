import db from "#models";

export default async function setHorario(idFuncionario, diaSemana, atendimento, entrada, saida) {

  // Busca ou cria o registro do dia
  const [registro] = await db.FuncionarioHorario.findOrCreate({
    where: {
      id_funcionario: idFuncionario,
      dia_semana: diaSemana
    },
    defaults: {
      atendimento: false,
      entrada: null,
      saida: null
    }
  });

  if (!compararHorario(entrada, saida) || !saida || !entrada || atendimento==false) {
    return registro;
  }

  if (entrada && saida) {
    await registro.update({
      atendimento: true,
      entrada: entrada,
      saida: saida
    });
  }


  return registro;
}

function compararHorario(entrada, saida) {
  if (!entrada || !saida) return false;

  const [h1, m1] = entrada.split(':').map(Number);
  const [h2, m2] = saida.split(':').map(Number);

  let entradaMin = h1 * 60 + m1;
  let saidaMin = h2 * 60 + m2;

  // Se saída for menor ou igual, virou o dia
  if (saidaMin <= entradaMin) {
    saidaMin += 24 * 60;
  }

  return saidaMin > entradaMin;
}