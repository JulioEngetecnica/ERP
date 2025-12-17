import { Router } from "express";
import { ProdutoController } from "./produto.controller.js";

const router = Router();

router.get("/", ProdutoController.getAll);
router.get("/:id", ProdutoController.getById);
router.post("/", ProdutoController.create);
router.put("/:id", ProdutoController.update);
router.delete("/:id", ProdutoController.delete);

export default router;
