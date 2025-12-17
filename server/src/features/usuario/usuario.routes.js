import { Router } from 'express';
import { UsuarioController } from './usuario.controller.js';

const router = Router();

// CRUD de Usuário
router.post('/', UsuarioController.criar);
router.get('/', UsuarioController.listar);
router.get('/:id', UsuarioController.buscarPorId);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

export default router;
