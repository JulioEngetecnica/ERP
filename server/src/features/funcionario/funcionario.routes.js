import { Router } from "express";
import { FuncionarioController } from "./funcionario.controller.js";
import FuncionarioHorarioController from "./horario/funcionarioHorario.controller.js";

const router = Router();

// Horarios de Atendimento
router.post("/horario/", FuncionarioHorarioController.store);
router.get("/horario/", FuncionarioHorarioController.getHorarios);

// CRUD de Funcionário
router.post("/", FuncionarioController.create);
router.get("/", FuncionarioController.getAll);
router.get("/:id", FuncionarioController.getById);
router.put("/:id", FuncionarioController.update);
router.delete("/:id", FuncionarioController.delete);


export default router;
