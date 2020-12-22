import express from 'express';
const router = express.Router();
import {
	authUsuario,
	getPerfilUsuario,
	registrarUsuario,
	updatePerfilUsuario,
	getUsuarios,
	eliminarUsuario,
	getUsuarioById,
	updateUsuario,
	getBecarios,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/becarios').get(protect, admin, getBecarios);

router
	.route('/')
	.post(protect, admin, registrarUsuario)
	.get(protect, admin, getUsuarios);
router.post('/login', authUsuario);
router
	.route('/perfil')
	.get(protect, getPerfilUsuario)
	.put(protect, updatePerfilUsuario);
router
	.route('/:id')
	.delete(protect, admin, eliminarUsuario)
	.get(protect, admin, getUsuarioById)
	.put(protect, admin, updateUsuario);

export default router;
