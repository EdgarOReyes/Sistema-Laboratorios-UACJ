import mongoose from 'mongoose';

const herramientaSchema = mongoose.Schema(
	{
		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},

		numInventario: {
			type: Number,
		},

		nombre: {
			type: String,
			required: true,
		},

		imagen: {
			type: String,
		},

		descripcion: {
			type: String,
			required: true,
		},

		caseta: {
			type: String,
			required: true,
		},

		cantidadEnStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Herramienta = mongoose.model('Herramienta', herramientaSchema);

export default Herramienta;
