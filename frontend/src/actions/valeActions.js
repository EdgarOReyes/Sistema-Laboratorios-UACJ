import axios from 'axios';
import {
	VALE_ADD_ITEM,
	VALE_REMOVE_ITEM,
	VALE_GUARDAR_INFO,
	VALE_RESET,
	VALE_CREATE_FAIL,
	VALE_CREATE_REQUEST,
	VALE_CREATE_SUCCESS,
	VALE_DETALLES_FAIL,
	VALE_DETALLES_REQUEST,
	VALE_DETALLES_SUCCESS,
	VALE_DETALLES_REMOVE_ITEM,
	VALE_FINALIZAR_FAIL,
	VALE_FINALIZAR_REQUEST,
	VALE_FINALIZAR_RESET,
	VALE_FINALIZAR_SUCCESS,
	MIS_VALES_FAIL,
	MIS_VALES_REQUEST,
	MIS_VALES_SUCCESS,
	LISTA_VALES_FAIL,
	LISTA_VALES_REQUEST,
	LISTA_VALES_RESET,
	LISTA_VALES_SUCCESS,
	LISTA_VALES_TIPO_FAIL,
	LISTA_VALES_TIPO_REQUEST,
	LISTA_VALES_TIPO_RESET,
	LISTA_VALES_TIPO_SUCCESS,
	UPDATE_VALE_PENDIENTE_FAIL,
	UPDATE_VALE_PENDIENTE_REQUEST,
	UPDATE_VALE_PENDIENTE_RESET,
	UPDATE_VALE_PENDIENTE_SUCCESS,
	VALE_CREATE_RESET,
} from '../constants/valeConstants';

export const addToVale = (id, cant) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/herramientas/${id}`);

	dispatch({
		type: VALE_ADD_ITEM,
		payload: {
			herramienta: data._id,
			nombre: data.nombre,
			imagen: data.imagen,
			caseta: data.caseta,
			cantidadEnStock: data.cantidadEnStock,
			cant,
		},
	});

	localStorage.setItem('valeItems', JSON.stringify(getState().vale.valeItems));
};

export const removeFromVale = (id) => (dispatch, getState) => {
	dispatch({
		type: VALE_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem('valeItems', JSON.stringify(getState().vale.valeItems));
};

export const guardarInfoVale = (data) => (dispatch) => {
	dispatch({
		type: VALE_GUARDAR_INFO,
		payload: data,
	});
};

export const resetVale = () => (dispatch) => {
	dispatch({
		type: VALE_RESET,
	});
	localStorage.removeItem('valeItems');
};

export const crearVale = (vale) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VALE_CREATE_REQUEST,
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

		const { data } = await axios.post(`/api/vales`, vale, config);

		dispatch({
			type: VALE_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: VALE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const resetValeCreado = () => (dispatch) => {
	dispatch({
		type: VALE_CREATE_RESET,
	});
};

export const getDetallesVale = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VALE_DETALLES_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		const { data } = await axios.get(`/api/vales/${id}`, config);

		dispatch({
			type: VALE_DETALLES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: VALE_DETALLES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const valeDetallesRemoveItem = (id) => async (dispatch) => {
	dispatch({
		type: VALE_DETALLES_REMOVE_ITEM,
		payload: id,
	});
};

export const finalizarVale = (id, estatus, nombreDevolucion) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: VALE_FINALIZAR_REQUEST,
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
			`/api/vales/pendientes/${id}/finalizar`,
			{ estatus, nombreDevolucion },
			config
		);
		dispatch({
			type: VALE_FINALIZAR_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: VALE_FINALIZAR_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const resetValeFinalizado = () => (dispatch) => {
	dispatch({
		type: VALE_FINALIZAR_RESET,
	});
};

export const obtenerMisVales = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: MIS_VALES_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		const { data } = await axios.get(`/api/vales/misvales`, config);
		dispatch({
			type: MIS_VALES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MIS_VALES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const obtenerVales = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: LISTA_VALES_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		const { data } = await axios.get(`/api/vales/`, config);
		dispatch({
			type: LISTA_VALES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: LISTA_VALES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const resetListaVales = () => (dispatch) => {
	dispatch({
		type: LISTA_VALES_RESET,
	});
};

export const obtenerValesTipo = (tipo) => async (dispatch, getState) => {
	try {
		dispatch({
			type: LISTA_VALES_TIPO_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		const { data } = await axios.get(`/api/vales/${tipo}`, config);
		dispatch({
			type: LISTA_VALES_TIPO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: LISTA_VALES_TIPO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const udpateValePendiente = (vale) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_VALE_PENDIENTE_REQUEST,
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
			`/api/vales/pendientes/${vale._id}/editar`,
			vale,
			config
		);
		dispatch({
			type: UPDATE_VALE_PENDIENTE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_VALE_PENDIENTE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const resetUpdateValePendiente = () => (dispatch) => {
	dispatch({
		type: UPDATE_VALE_PENDIENTE_RESET,
	});
};
