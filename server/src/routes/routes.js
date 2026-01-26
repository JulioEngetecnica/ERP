import express from "express";

import servicoRoutes from "#features/servico/servico.routes.js";
import usuarioRoutes from "#features/usuario/usuario.routes.js";
import produtoRoutes from "#features/produto/produto.routes.js";
import funcionarioRoutes from "#features/funcionario/funcionario.routes.js";

import authRoutes from "#auth/routes/auth.routes.js";

const router = express.Router();

router.use('/usuario', usuarioRoutes);
router.use('/servico', servicoRoutes);
router.use('/produto', produtoRoutes);
router.use('/funcionario', funcionarioRoutes);
router.use('/auth', authRoutes);


export default router;