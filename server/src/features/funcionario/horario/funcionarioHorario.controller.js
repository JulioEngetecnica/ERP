import FuncionarioHorarioService from "./funcionarioHorario.service.js";

export default class FuncionarioHorarioController {
  static async store(req, res) {
    try {
      const {
        id_funcionario,
        dia_semana,
        data,
        atendimento,
        entrada,
        saida
      } = req.body;

      const horario = await FuncionarioHorarioService.setHorario({
        idFuncionario: id_funcionario,
        diaSemana: dia_semana,
        data,
        atendimento,
        entrada,
        saida
      });

      return res.status(200).json(horario);
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }
}
