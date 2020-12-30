import asyncHandler from 'express-async-handler';
import Vale from '../models/valeModel.js';

// @desc    Crea un nuevo vale
// @route   POST /api/vales
// @access  Privado

const addValeItems = asyncHandler(async (req, res) => {
	const {
		valeItems,
		numLab,
		nombreSolicitante,
		matriculaSolicitante,
		nombrePrestamo,
	} = req.body;
	if (valeItems && valeItems.length === 0) {
		res.status(400);
		throw new Error('No hay herramientas en el vale');
		return;
	} else {
		const vale = new Vale({
			usuario: req.usuario._id,
			valeItems,
			numLab,
			nombreSolicitante,
			matriculaSolicitante,
			nombrePrestamo,
		});

		const valeCreado = await vale.save();

		res.status(201).json(valeCreado);
	}
});

// @desc    Obtener vale por ID
// @route   GET /api/vales/:id
// @access  Privado

const getValeById = asyncHandler(async (req, res) => {
	const vale = await Vale.findById(req.params.id);

	if (vale) {
		res.json(vale);
	} else {
		res.status(404);
		throw new Error('Vale no encontrado');
	}
});

// @desc    Actualizar vale a entregado
// @route   PUT /api/vales/pendientes/:id/finalizar
// @access  Privado

const actualizarValeAEntregado = asyncHandler(async (req, res) => {
	const { estatus, nombreDevolucion } = req.body;
	const vale = await Vale.findById(req.params.id);

	if (vale) {
		vale.estatus = estatus;
		vale.nombreDevolucion = nombreDevolucion;
		vale.fechaDevolucion = Date.now();

		const updatedVale = await vale.save();

		res.json(updatedVale);
	} else {
		res.status(404);
		throw new Error('Vale no encontrado');
	}
});

// @desc    Obtiene los vales creados por el usuario
// @route   GET /api/vales/misvales
// @access  Privado

const getMisVales = asyncHandler(async (req, res) => {
	const vales = await Vale.find({ usuario: req.usuario._id });

	res.json(vales);
});

// @desc    Obtiene todos tipo de vales
// @route   GET /api/vales/
// @access  Privado

const getVales = asyncHandler(async (req, res) => {
	const vales = await Vale.find({});

	res.json(vales);
});

// @desc    Obtiene los vales entregados
// @route   GET /api/vales/entregados
// @access  Privado

const getValesActivos = asyncHandler(async (req, res) => {
	const vales = await Vale.find({ estatus: 'Entregado' });
	res.json(vales);
});

// @desc    Obtiene los vales pendientes
// @route   GET /api/vales/pendientes
// @access  Privado

const getValesPendientes = asyncHandler(async (req, res) => {
	const vales = await Vale.find({ estatus: 'Pendiente' });
	res.json(vales);
});

// @desc    Obtiene los vales con adeudo
// @route   GET /api/vales/adeudos
// @access  Privado

const getValesAdeudos = asyncHandler(async (req, res) => {
	const vales = await Vale.find({ estatus: 'Adeudo' });
	res.json(vales);
});

// @desc    Actualizar herramientas del vale
// @route   PUT /api/vales/:id/finalizar
// @access  Privado

const actualizarValePendiente = asyncHandler(async (req, res) => {
	const { valeItems, itemsEntregados } = req.body;
	const vale = await Vale.findById(req.params.id);

	if (vale) {
		vale.valeItems = valeItems;
		vale.itemsEntregados = itemsEntregados;

		const valeActualizado = await vale.save();
		res.status(201).json(valeActualizado);
	} else {
		res.status(404);
		throw new Error('Vale no encontrado');
	}
});

export {
	addValeItems,
	getValeById,
	actualizarValeAEntregado,
	getMisVales,
	getVales,
	getValesActivos,
	getValesPendientes,
	getValesAdeudos,
	actualizarValePendiente,
};
