import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { me } from "../controller/auth.controller.js";
import { LoginController } from "../login/login.controller.js";

const router = Router();

router.post('/login', LoginController.login);
router.get("/me", authMiddleware, me);

export default router;
