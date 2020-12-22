import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Usuario from '../models/usuarioModel.js';

// @desc    Autoriza al usuario y obtiene token
// @route   POST /api/usuarios/login
//@access   Público

const authUsuario = asyncHandler(async (req, res) => {
	const { correo, contrasena } = req.body;
	const usuario = await Usuario.findOne({ correo });
	if (usuario && (await usuario.matchPassword(contrasena))) {
		res.json({
			_id: usuario._id,
			nombre: usuario.nombre,
			correo: usuario.correo,
			esAdmin: usuario.esAdmin,
			token: generateToken(usuario._id),
		});
	} else {
		res.status(401);
		throw new Error('Correo o contraseña inválidos.');
	}
});

// @desc    Registra un nuevo usuario
// @route   GET /api/usuarios/
//@access   Privado/Admin

const registrarUsuario = asyncHandler(async (req, res) => {
	const { nombre, correo, esAdmin, esBecario, contrasena } = req.body;
	const usuarioExiste = await Usuario.findOne({ correo });

	if (usuarioExiste) {
		res.status(400);
		throw new Error('Usuario ya existente');
	}

	const usuario = await Usuario.create({
		nombre,
		correo,
		esAdmin,
		esBecario,
		contrasena,
	});

	if (usuario) {
		res.status(201).json({
			_id: usuario._id,
			nombre: usuario.nombre,
			correo: usuario.correo,
			esAdmin: usuario.esAdmin,
			esBecario: usuario.esBecario,
			token: generateToken(usuario._id),
		});
	} else {
		res.status(400);
		throw new Error('Datos de usuario inválidos.');
	}
});

// @desc    Obtiene el perfil del usuario
// @route   GET /api/usuarios/perfil
//@access   Privado

const getPerfilUsuario = asyncHandler(async (req, res) => {
	const usuario = await Usuario.findById(req.usuario._id);

	if (usuario) {
		res.json({
			_id: usuario._id,
			nombre: usuario.nombre,
			correo: usuario.correo,
			esAdmin: usuario.esAdmin,
			esBecario: usuario.esBecario,
		});
	} else {
		res.status(404);
		throw new Error('Usuario no encontrado');
	}
});

// @desc    Actualiza el perfil del usuario
// @route   PUT /api/usuarios/perfil
//@access   Privado
const updatePerfilUsuario = asyncHandler(async (req, res) => {
	const usuario = await Usuario.findById(req.usuario._id);

	if (usuario) {
		usuario.nombre = req.body.nombre || usuario.nombre;
		usuario.correo = req.body.correo || usuario.correo;

		if (req.body.contrasena) {
			usuario.contrasena = req.body.contrasena;
		}

		const updatedUsuario = await usuario.save();
		res.json({
			_id: updatedUsuario._id,
			nombre: updatedUsuario.nombre,
			correo: updatedUsuario.correo,
			esAdmin: updatedUsuario.esAdmin,
			esBecario: updatedUsuario.esBecario,
			token: generateToken(updatedUsuario._id),
		});
	} else {
		res.status(404);
		throw new Error('Usuario no encontrado');
	}
});

// @desc    Obtiene todos los usuarios
// @route   GET /api/usuarios
//@access   Privado/Admin

const getUsuarios = asyncHandler(async (req, res) => {
	const usuarios = await Usuario.find({});
	res.json(usuarios);
});

// @desc    Obtiene todos los usuarios que son becarios
// @route   GET /api/usuarios/becarios
//@access   Privado

const getBecarios = asyncHandler(async (req, res) => {
	const usuarios = await Usuario.find({ esBecario: true }).select('nombre');

	if (usuarios) {
		res.json(usuarios);
	} else {
		res.status(404);
		throw new Error('Usuarios no encontrados');
	}
});

// @desc    Elimina un usuario
// @route   DELETE /api/usuarios/:id
//@access   Privado/Admin

const eliminarUsuario = asyncHandler(async (req, res) => {
	const usuario = await Usuario.findById(req.params.id);
	if (usuario) {
		await usuario.remove();
		res.json({ mensaje: 'Usuario eliminado' });
	} else {
		res.status(404);
		throw new Error('Usuario no encontrado');
	}
});

// @desc    Obtiene un usuario por ID
// @route   GET /api/usuarios/:id
//@access   Privado/Admin
const getUsuarioById = asyncHandler(async (req, res) => {
	const usuario = await Usuario.findById(req.params.id).select('-contrasena');

	if (usuario) {
		res.json(usuario);
	} else {
		res.status(404);
		throw new Error('Usuario no encontrado.');
	}
});

// @desc    Actualiza usuario
// @route   PUT /api/usuarios/:id
//@access   Privado/Admin
const updateUsuario = asyncHandler(async (req, res) => {
	const usuario = await Usuario.findById(req.params.id);

	if (usuario) {
		usuario.nombre = req.body.nombre || usuario.nombre;
		usuario.correo = req.body.correo || usuario.correo;
		usuario.esAdmin = req.body.esAdmin;
		usuario.esBecario = req.body.esBecario;

		const updatedUsuario = await usuario.save();

		res.json({
			_id: updatedUsuario._id,
			nombre: updatedUsuario.nombre,
			correo: updatedUsuario.correo,
			esAdmin: updatedUsuario.esAdmin,
			esBecario: updatedUsuario.esBecario,
		});
	} else {
		res.status(404);
		throw new Error('Usuario no encontrado');
	}
});

export {
	authUsuario,
	getPerfilUsuario,
	registrarUsuario,
	updatePerfilUsuario,
	getUsuarios,
	eliminarUsuario,
	getUsuarioById,
	updateUsuario,
	getBecarios,
};
