import { Router } from "express";
import { FuncionarioController } from "./funcionario.controller.js";

const router = Router();

// CRUD de Funcionário
router.post("/", FuncionarioController.create);
router.get("/", FuncionarioController.getAll);
router.get("/:id", FuncionarioController.getById);
router.put("/:id", FuncionarioController.update);
router.delete("/:id", FuncionarioController.delete);

export default router;
