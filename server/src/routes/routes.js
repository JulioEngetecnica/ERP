import express from "express";

import { authMiddleware } from "#auth/middleware/auth.middleware.js";
import authRoutes from "#auth/routes/auth.routes.js";

import servicoRoutes from "#features/servico/servico.routes.js";
import usuarioRoutes from "#features/usuario/usuario.routes.js";
import produtoRoutes from "#features/produto/produto.routes.js";
import funcionarioRoutes from "#features/funcionario/funcionario.routes.js";


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/servico', authMiddleware, servicoRoutes);
router.use('/produto', authMiddleware, produtoRoutes);
router.use('/funcionario', funcionarioRoutes);



export default router;