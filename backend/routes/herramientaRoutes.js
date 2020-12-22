import express from 'express';
const router = express.Router();
import {
	getHerramientaById,
	getHerramientas,
	eliminarHerramienta,
	actualizarHerramienta,
	crearHerramienta,
} from '../controllers/herramientaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getHerramientas).post(protect, admin, crearHerramienta);
router
	.route('/:id')
	.get(getHerramientaById)
	.delete(protect, admin, eliminarHerramienta)
	.put(protect, admin, actualizarHerramienta);

export default router;
