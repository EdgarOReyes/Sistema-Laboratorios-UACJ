import mongoose from 'mongoose';

const valeHerramientasSchema = mongoose.Schema(
	{
		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Usuario',
		},

		valeItems: [
			{
				nombre: { type: String, required: true },
				cant: { type: Number, required: true },
				imagen: { type: String, required: true },
				herramienta: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Herramienta',
				},
			},
		],

		carrera: {
			type: String,
			required: false,
		},

		materia: {
			type: String,
			required: false,
		},

		numLab: {
			type: String,
			required: false,
		},

		maestro: {
			type: String,
			required: false,
		},

		nombreSolicitante: {
			type: String,
			required: true,
		},

		matriculaSolicitante: {
			type: String,
			required: true,
		},

		nombrePrestamo: {
			type: String,
			required: true,
		},

		nombreDevolucion: {
			type: String,
		},

		estatus: {
			type: String,
			required: true,
			default: 'Pendiente',
		},

		fechaDevolucion: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const ValeHerramientas = mongoose.model(
	'ValeHerramientas',
	valeHerramientasSchema
);

export default ValeHerramientas;
