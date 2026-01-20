import express from "express";

import servicoRoutes from "#features/servico/servico.routes.js";
import usuarioRoutes from "#features/usuario/usuario.routes.js";
import produtoRoutes from "#features/produto/produto.routes.js"

const router = express.Router();

router.use('/usuario', usuarioRoutes);
router.use('/servico', servicoRoutes);
router.use('/produto', produtoRoutes)



export default router;