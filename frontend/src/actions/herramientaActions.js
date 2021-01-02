import axios from 'axios';

import {
	LISTA_HERRAMIENTA_REQUEST,
	LISTA_HERRAMIENTA_SUCCESS,
	LISTA_HERRAMIENTA_FAIL,
	DETALLES_HERRAMIENTA_REQUEST,
	DETALLES_HERRAMIENTA_SUCCESS,
	DETALLES_HERRAMIENTA_FAIL,
	DETALLES_HERRAMIENTA_RESET,
	HERRAMIENTA_ELIMINAR_FAIL,
	HERRAMIENTA_ELIMINAR_REQUEST,
	HERRAMIENTA_ELIMINAR_SUCCESS,
	HERRAMIENTA_CREAR_FAIL,
	HERRAMIENTA_CREAR_REQUEST,
	HERRAMIENTA_CREAR_RESET,
	HERRAMIENTA_CREAR_SUCCESS,
	HERRAMIENTA_UPDATE_FAIL,
	HERRAMIENTA_UPDATE_REQUEST,
	HERRAMIENTA_UPDATE_RESET,
	HERRAMIENTA_UPDATE_SUCCESS,
} from '../constants/herramientaConstants';

export const listaHerramientas = (
	keyword = '',
	pageNumber = '',
	caseta = ''
) => async (dispatch) => {
	try {
		dispatch({ type: LISTA_HERRAMIENTA_REQUEST });

		const { data } = await axios.get(
			`/api/herramientas?keyword=${keyword}&pageNumber=${pageNumber}&caseta=${caseta}`
		);

		dispatch({
			type: LISTA_HERRAMIENTA_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: LISTA_HERRAMIENTA_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listaHerramientasDetalles = (id) => async (dispatch) => {
	try {
		dispatch({ type: DETALLES_HERRAMIENTA_REQUEST });

		const { data } = await axios.get(`/api/herramientas/${id}`);

		dispatch({
			type: DETALLES_HERRAMIENTA_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DETALLES_HERRAMIENTA_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const eliminarHerramienta = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: HERRAMIENTA_ELIMINAR_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		await axios.delete(`/api/herramientas/${id}`, config);
		dispatch({
			type: HERRAMIENTA_ELIMINAR_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: HERRAMIENTA_ELIMINAR_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const crearHerramienta = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: HERRAMIENTA_CREAR_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		const { data } = await axios.post(`/api/herramientas/`, {}, config);
		dispatch({
			type: HERRAMIENTA_CREAR_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: HERRAMIENTA_CREAR_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateHerramienta = (herramienta) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: HERRAMIENTA_UPDATE_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/herramientas/${herramienta._id}`,
			herramienta,
			config
		);
		dispatch({
			type: HERRAMIENTA_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: HERRAMIENTA_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const resetHerramienta = () => (dispatch) => {
	dispatch({
		type: HERRAMIENTA_CREAR_RESET,
	});
};

export const resetUpdateHerramienta = () => (dispatch) => {
	dispatch({
		type: HERRAMIENTA_UPDATE_RESET,
	});

	dispatch({
		type: DETALLES_HERRAMIENTA_RESET,
	});
};
