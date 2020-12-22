import express from 'express';
const router = express.Router();
import {
	addValeItems,
	getValeById,
	actualizarValeAEntregado,
	getMisVales,
	getVales,
	getValesActivos,
	getValesPendientes,
	getValesAdeudos,
	editarNumHerramientas,
} from '../controllers/valeController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addValeItems).get(protect, getVales);
router.route('/misvales').get(protect, getMisVales);
router.route('/entregados').get(protect, getValesActivos);
router.route('/pendientes').get(protect, getValesPendientes);
router
	.route('/pendientes/:id/finalizar')
	.put(protect, actualizarValeAEntregado);
router.route('/pendientes/:id/editar').put(protect, editarNumHerramientas);
router.route('/adeudos').get(protect, getValesAdeudos);
router.route('/:id').get(protect, getValeById);
export default router;
