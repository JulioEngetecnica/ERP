import { Router } from "express";
import { EstabelecimentoController } from "./estabelecimento.controller.js";

const router = Router();

// CRUD de Estabelecimento
router.post("/", EstabelecimentoController.create);
router.get("/", EstabelecimentoController.getAll);
router.get("/:id", EstabelecimentoController.getById);
router.put("/:id", EstabelecimentoController.update);
router.delete("/:id", EstabelecimentoController.delete);

export default router;
