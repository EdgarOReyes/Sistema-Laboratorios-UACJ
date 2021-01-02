import {
	USER_DETALLES_FAIL,
	USER_DETALLES_REQUEST,
	USER_DETALLES_RESET,
	USER_DETALLES_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTRO_FAIL,
	USER_REGISTRO_REQUEST,
	USER_REGISTRO_SUCCESS,
	USER_UPDATE_PERFIL_FAIL,
	USER_UPDATE_PERFIL_REQUEST,
	USER_UPDATE_PERFIL_SUCCESS,
	USER_LISTA_FAIL,
	USER_LISTA_REQUEST,
	USER_LISTA_SUCCESS,
	USER_LISTA_RESET,
	USER_ELIMINAR_FAIL,
	USER_ELIMINAR_REQUEST,
	USER_ELIMINAR_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_RESET,
	USER_UPDATE_SUCCESS,
	USER_LISTA_BECARIOS_FAIL,
	USER_LISTA_BECARIOS_REQUEST,
	USER_LISTA_BECARIOS_SUCCESS,
} from '../constants/usuarioConstants';

export const usuarioLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, infoUsuario: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const usuarioRegistroReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTRO_REQUEST:
			return { loading: true };
		case USER_REGISTRO_SUCCESS:
			return { loading: false, infoUsuario: action.payload, exito: true };
		case USER_REGISTRO_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const usuarioDetallesReducer = (state = { usuario: {} }, action) => {
	switch (action.type) {
		case USER_DETALLES_REQUEST:
			return { ...state, loading: true };
		case USER_DETALLES_SUCCESS:
			return { loading: false, usuario: action.payload };
		case USER_DETALLES_FAIL:
			return { loading: false, error: action.payload };
		case USER_DETALLES_RESET:
			return { usuario: {} };
		default:
			return state;
	}
};

export const usuarioUpdatePerfilReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PERFIL_REQUEST:
			return { loading: true };
		case USER_UPDATE_PERFIL_SUCCESS:
			return { loading: false, exito: true, infousuario: action.payload };
		case USER_UPDATE_PERFIL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const usuarioListaReducer = (state = { usuarios: [] }, action) => {
	switch (action.type) {
		case USER_LISTA_REQUEST:
			return { loading: true };
		case USER_LISTA_SUCCESS:
			return { loading: false, usuarios: action.payload };
		case USER_LISTA_FAIL:
			return { loading: false, error: action.payload };
		case USER_LISTA_RESET:
			return { usuarios: [] };
		default:
			return state;
	}
};

export const usuarioEliminarReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_ELIMINAR_REQUEST:
			return { loading: true };
		case USER_ELIMINAR_SUCCESS:
			return { loading: false, exito: true };
		case USER_ELIMINAR_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const usuarioUpdateReducer = (state = { usuario: {} }, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };
		case USER_UPDATE_SUCCESS:
			return { loading: false, exito: true };
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case USER_UPDATE_RESET:
			return { usuario: {} };
		default:
			return state;
	}
};

export const listaBecariosReducer = (state = { becarios: [] }, action) => {
	switch (action.type) {
		case USER_LISTA_BECARIOS_REQUEST:
			return { loading: true };
		case USER_LISTA_BECARIOS_SUCCESS:
			return { loading: false, becarios: action.payload };
		case USER_LISTA_BECARIOS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
