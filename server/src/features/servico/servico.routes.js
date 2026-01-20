import { Router } from "express";
import { ServicoController } from "./servico.controller.js";

const router = Router();

router.get("/", ServicoController.getAll);
router.get("/:id", ServicoController.getById);
router.post("/", ServicoController.create);
router.put("/:id", ServicoController.update);
router.delete("/:id", ServicoController.delete);

export default router;
