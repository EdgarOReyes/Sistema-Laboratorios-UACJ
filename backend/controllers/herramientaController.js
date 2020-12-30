import asyncHandler from 'express-async-handler';
import Herramienta from '../models/herramientaModel.js';

// @desc    Obtiene todas las herramientas
// @route   GET /api/herramientas
//@access   Público

const getHerramientas = asyncHandler(async (req, res) => {
	const pageSize = 12;
	const page = Number(req.query.pageNumber) || 1;
	const caseta = req.query.caseta || 'D1-105';
	const keyword = req.query.keyword
		? {
				nombre: {
					$regex: req.query.keyword,
					$options: 'i',
				},
				caseta,
		  }
		: {};
	const count = await Herramienta.countDocuments({ ...keyword, caseta });
	const herramientas = await Herramienta.find({ ...keyword, caseta })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ herramientas, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Obtiene una sola herramienta
// @route   GET /api/herramientas/:id
//@access   Público

const getHerramientaById = asyncHandler(async (req, res) => {
	const herramienta = await Herramienta.findById(req.params.id);
	if (herramienta) {
		res.json(herramienta);
	} else {
		res.status(404);
		throw new Error('No se ha encontrado el producto');
	}
});

// @desc    Eliminar una herramienta
// @route   DELETE /api/herramientas/:id
//@access   Privada/Admin

const eliminarHerramienta = asyncHandler(async (req, res) => {
	const herramienta = await Herramienta.findById(req.params.id);
	if (herramienta) {
		await herramienta.remove();
		res.json({ mensaje: 'Herramienta eliminada' });
	} else {
		res.status(404);
		throw new Error('No se ha encontrado el producto');
	}
});

// @desc    Crear una herramienta
// @route   POST /api/herramientas/
//@access   Privada/Admin

const crearHerramienta = asyncHandler(async (req, res) => {
	const herramienta = new Herramienta({
		nombre: 'Nombre Ejemplo',
		cantidadEnStock: 0,
		imagen:
			'https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg',
		descripcion: 'Descripcion ejemplo',
		caseta: 'Caseta Ejemplo',
		usuario: req.usuario._id,
	});

	const herramientaCreada = await herramienta.save();
	res.status(201).json(herramientaCreada);

	console.log(req.usuario._id);
});
// @desc    Actualizar una herramienta
// @route   PUT /api/herramientas/
//@access   Privada/Admin

const actualizarHerramienta = asyncHandler(async (req, res) => {
	const {
		nombre,
		cantidadEnStock,
		imagen,
		descripcion,
		caseta,
		usuario,
	} = req.body;

	const herramienta = await Herramienta.findById(req.params.id);

	if (herramienta) {
		herramienta.nombre = nombre;
		herramienta.cantidadEnStock = cantidadEnStock;
		herramienta.imagen = imagen;
		herramienta.descripcion = descripcion;
		herramienta.caseta = caseta;
		herramienta.usuario = usuario;

		const herramientaActualizada = await herramienta.save();
		res.status(201).json(herramientaActualizada);
	} else {
		res.status(404);
		throw new Error('Herramienta no encontrada');
	}
});

export {
	getHerramientaById,
	getHerramientas,
	eliminarHerramienta,
	crearHerramienta,
	actualizarHerramienta,
};
