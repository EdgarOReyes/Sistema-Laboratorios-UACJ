import mongoose from 'mongoose';
import dotenv from 'dotenv';

import usuarios from './data/usuarios.js';
import herramientas from './data/herramientas.js';

import Usuario from './models/usuarioModel.js';
import Herramienta from './models/herramientaModel.js';
import Vale from './models/valeModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Vale.deleteMany();
		await Herramienta.deleteMany();
		await Usuario.deleteMany();

		const createdUsers = await Usuario.insertMany(usuarios);

		const adminUser = createdUsers[0]._id;

		const sampleProducts = herramientas.map((herramienta) => {
			return { ...herramienta, usuario: adminUser };
		});

		await Herramienta.insertMany(sampleProducts);

		console.log('Data imported');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Vale.deleteMany();
		await Herramienta.deleteMany();
		await Usuario.deleteMany();

		console.log('Data deleted');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
