import FuncionarioHorarioService from "./funcionarioHorario.service.js";

export default class FuncionarioHorarioController {

  // store como arrow function
  static store = async (req, res) => {
    try {
      const {
        id_funcionario,
        dia_semana,
        data,
        atendimento,
        entrada,
        saida
      } = req.body;

      // validação
      this.validarEntrada(req.body);

      // cria ou atualiza horário
      const horario = await FuncionarioHorarioService.setHorario({
        id_funcionario,
        dia_semana,
        data,
        atendimento,
        entrada,
        saida
      });

      return res.status(200).json(horario);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static getHorarios = async (req, res) => {
    try {
      const { id_funcionario, dia_semana, data } = req.body;
      

      const horarios = await FuncionarioHorarioService.getHorarios({
        id_funcionario: Number(id_funcionario),
        dia_semana: dia_semana ? Number(dia_semana) : null,
        data: data || null
      });

      return res.status(200).json(horarios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }



  //----------------------
  // FUNÇÕES DE VALIDAÇÃO
  //----------------------

  static validarEntrada = (dados) => {
    // deve ter pelo menos dia_semana ou data
    if (!dados.data && !dados.dia_semana) {
      throw new Error("Informe data ou dia da semana");
    }

    // se for horário de atendimento, precisa de entrada e saída
    if (dados.atendimento && (!dados.entrada || !dados.saida)) {
      throw new Error("Horario de atendimento sem entrada/saída");
    }

    // verifica se entrada < saída
    if (dados.entrada && dados.saida && !this.compararHorario(dados.entrada, dados.saida)) {
      throw new Error("Horario de atendimento inválido");
    }
  }

  // compararHorario como arrow function
  static compararHorario = (entrada, saida) => {
    const [h1, m1] = entrada.split(":").map(Number);
    const [h2, m2] = saida.split(":").map(Number);

    return (h2 * 60 + m2) > (h1 * 60 + m1);
  }

}
