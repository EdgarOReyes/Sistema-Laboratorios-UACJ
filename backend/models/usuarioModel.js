import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
		},

		correo: {
			type: String,
			required: true,
			unique: true,
		},

		contrasena: {
			type: String,
			required: true,
		},

		esAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},

		esBecario: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

usuarioSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.contrasena);
};

usuarioSchema.pre('save', async function (next) {
	if (!this.isModified('contrasena')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.contrasena = await bcrypt.hash(this.contrasena, salt);
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
