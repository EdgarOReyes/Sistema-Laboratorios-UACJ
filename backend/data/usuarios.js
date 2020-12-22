import bcrypt from 'bcryptjs';

const usuarios = [
	{
		nombre: 'Usuario Admin',
		correo: 'admin@ejemplo.com',
		contrasena: bcrypt.hashSync('123456', 10),
		esAdmin: true,
	},

	{
		nombre: 'Juan Pérez',
		correo: 'juan@ejemplo.com',
		contrasena: bcrypt.hashSync('123456', 10),
		esAdmin: false,
	},

	{
		nombre: 'Francisco López',
		correo: 'pancho@ejemplo.com',
		contrasena: bcrypt.hashSync('123456', 10),
		esAdmin: false,
	},
];

export default usuarios;
