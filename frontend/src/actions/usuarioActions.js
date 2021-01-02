import axios from 'axios';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTRO_FAIL,
	USER_REGISTRO_REQUEST,
	USER_REGISTRO_SUCCESS,
	USER_DETALLES_FAIL,
	USER_DETALLES_SUCCESS,
	USER_DETALLES_REQUEST,
	USER_UPDATE_PERFIL_REQUEST,
	USER_UPDATE_PERFIL_FAIL,
	USER_UPDATE_PERFIL_SUCCESS,
	USER_DETALLES_RESET,
	USER_LISTA_FAIL,
	USER_LISTA_REQUEST,
	USER_LISTA_SUCCESS,
	USER_LISTA_RESET,
	USER_ELIMINAR_FAIL,
	USER_ELIMINAR_REQUEST,
	USER_ELIMINAR_SUCCESS,
	USER_UPDATE_RESET,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_LISTA_BECARIOS_REQUEST,
	USER_LISTA_BECARIOS_FAIL,
	USER_LISTA_BECARIOS_SUCCESS,
} from '../constants/usuarioConstants';

import { MIS_VALES_RESET } from '../constants/valeConstants';

export const login = (correo, contrasena) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/usuarios/login',
			{ correo, contrasena },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('infoUsuario', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('infoUsuario');
	dispatch({
		type: USER_LOGOUT,
	});

	dispatch({
		type: USER_DETALLES_RESET,
	});

	dispatch({
		type: MIS_VALES_RESET,
	});

	dispatch({
		type: USER_LISTA_RESET,
	});
};

export const registro = (
	nombre,
	correo,
	esAdmin,
	esBecario,
	contrasena
) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_REGISTRO_REQUEST,
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

		const { data } = await axios.post(
			'/api/usuarios',
			{ nombre, correo, esAdmin, esBecario, contrasena },
			config
		);

		dispatch({
			type: USER_REGISTRO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_REGISTRO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getUsuarioDetalles = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETALLES_REQUEST,
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

		const { data } = await axios.get(`/api/usuarios/${id}`, config);

		dispatch({
			type: USER_DETALLES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETALLES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updatePerfilUsuario = (usuario) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PERFIL_REQUEST,
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

		const { data } = await axios.put(`/api/usuarios/perfil`, usuario, config);

		dispatch({
			type: USER_UPDATE_PERFIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PERFIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listaUsuarios = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LISTA_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		const { data } = await axios.get(`/api/usuarios/`, config);

		dispatch({
			type: USER_LISTA_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LISTA_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const obtenerBecarios = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LISTA_BECARIOS_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		const { data } = await axios.get(`/api/usuarios/becarios/`, config);

		dispatch({
			type: USER_LISTA_BECARIOS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LISTA_BECARIOS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const eliminarUsuario = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_ELIMINAR_REQUEST,
		});

		const {
			usuarioLogin: { infoUsuario },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${infoUsuario.token}`,
			},
		};

		await axios.delete(`/api/usuarios/${id}`, config);

		dispatch({
			type: USER_ELIMINAR_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: USER_ELIMINAR_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateUsuario = (usuario) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
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
			`/api/usuarios/${usuario._id}`,
			usuario,
			config
		);

		dispatch({
			type: USER_UPDATE_SUCCESS,
		});

		dispatch({ type: USER_DETALLES_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const resetUsuarioUpdate = () => (dispatch) => {
	dispatch({
		type: USER_UPDATE_RESET,
	});
};
