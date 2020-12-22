import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Usuario from '../models/usuarioModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.usuario = await Usuario.findById(decoded.id).select('-contrasena');
			console.log(req.usuario);
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Acceso no autorizado, token inválida.');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Acceso no autorizado, no token.');
	}
});

const admin = (req, res, next) => {
	if (req.usuario && req.usuario.esAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('No estás autorizado como admin.');
	}
};

export { protect, admin };
