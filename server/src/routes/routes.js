import express from "express";
import { authenticateToken } from "../auth/authMiddleware.js";
// import proprietarioRoutes from "./proprietarioRoutes.js";
// import estabelecimentoRoutes from "./estabelecimentoRoutes.js";

import produtoRoutes from "#features/produto/produto.routes.js";

const router = express.Router();

// router.use('/produto', authenticateToken, produtoRoutes);
router.use('/produto', produtoRoutes);


// router.use('/produto', produtoRoutes);





// Monta todas as rotas principais
// router.use(proprietarioRoutes);
// router.use(estabelecimentoRoutes);
// router.get('/user', authenticateToken, async (req, res) => {
//   console.log("ID do usuário autenticado:");

//   const userId = req.user.id; // ✅ ID do usuário autenticado
//   console.log("ID do usuário autenticado:", userId);
//   const user = await Proprietario.findById(userId);
//   res.json(user);
// });


export default router;