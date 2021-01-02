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

export const herramientaListaReducer = (
	state = { herramientas: [] },
	action
) => {
	switch (action.type) {
		case LISTA_HERRAMIENTA_REQUEST:
			return { loading: true, herramientas: [] };
		case LISTA_HERRAMIENTA_SUCCESS:
			return {
				loading: false,
				herramientas: action.payload.herramientas,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case LISTA_HERRAMIENTA_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const herramientaDetallesReducer = (
	state = { herramienta: [] },
	action
) => {
	switch (action.type) {
		case DETALLES_HERRAMIENTA_REQUEST:
			return { loading: true, ...state };
		case DETALLES_HERRAMIENTA_SUCCESS:
			return { loading: false, herramienta: action.payload };
		case DETALLES_HERRAMIENTA_FAIL:
			return { loading: false, error: action.payload };
		case DETALLES_HERRAMIENTA_RESET:
			return { herramienta: [] };
		default:
			return state;
	}
};

export const herramientaEliminarReducer = (state = {}, action) => {
	switch (action.type) {
		case HERRAMIENTA_ELIMINAR_REQUEST:
			return { loading: true };
		case HERRAMIENTA_ELIMINAR_SUCCESS:
			return { loading: false, exito: true };
		case HERRAMIENTA_ELIMINAR_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const herramientaCrearReducer = (state = {}, action) => {
	switch (action.type) {
		case HERRAMIENTA_CREAR_REQUEST:
			return { loading: true };
		case HERRAMIENTA_CREAR_SUCCESS:
			return { loading: false, exito: true, herramienta: action.payload };
		case HERRAMIENTA_CREAR_FAIL:
			return { loading: false, error: action.payload };
		case HERRAMIENTA_CREAR_RESET:
			return {};
		default:
			return state;
	}
};

export const herramientaUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case HERRAMIENTA_UPDATE_REQUEST:
			return { loading: true };
		case HERRAMIENTA_UPDATE_SUCCESS:
			return { loading: false, exito: true, herramienta: action.payload };
		case HERRAMIENTA_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case HERRAMIENTA_UPDATE_RESET:
			return {};
		default:
			return state;
	}
};
