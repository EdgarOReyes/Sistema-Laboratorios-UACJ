import {
	VALE_ADD_ITEM,
	VALE_GUARDAR_INFO,
	VALE_REMOVE_ITEM,
	VALE_RESET,
	VALE_CREATE_FAIL,
	VALE_CREATE_REQUEST,
	VALE_CREATE_SUCCESS,
	VALE_CREATE_RESET,
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
	MIS_VALES_RESET,
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
	UPDATE_VALE_PENDIENTE_SUCCESS,
	UPDATE_VALE_PENDIENTE_RESET,
	VALE_PENDIENTE_REMOVE_ITEM,
} from '../constants/valeConstants';

export const valeReducer = (
	state = { valeItems: [], valeInfo: {} },
	action
) => {
	switch (action.type) {
		case VALE_ADD_ITEM:
			const item = action.payload;
			const existItem = state.valeItems.find(
				(x) => x.herramienta === item.herramienta
			);

			if (existItem) {
				return {
					...state,
					valeItems: state.valeItems.map((x) =>
						x.herramienta === existItem.herramienta ? item : x
					),
				};
			} else {
				return {
					...state,
					valeItems: [...state.valeItems, item],
				};
			}
		case VALE_REMOVE_ITEM:
			return {
				...state,
				valeItems: state.valeItems.filter(
					(x) => x.herramienta !== action.payload
				),
			};

		case VALE_GUARDAR_INFO:
			return {
				...state,
				valeInfo: action.payload,
			};
		case VALE_RESET:
			return { valeItems: [], valeInfo: {} };
		default:
			return state;
	}
};

export const valeCrearReducer = (state = {}, action) => {
	switch (action.type) {
		case VALE_CREATE_REQUEST:
			return {
				loading: true,
			};
		case VALE_CREATE_SUCCESS:
			return {
				loading: false,
				exito: true,
				ordenVale: action.payload,
			};
		case VALE_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case VALE_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const valeDetallesReducer = (
	state = { loading: true, valeItems: [], valeInfo: {} },
	action
) => {
	switch (action.type) {
		case VALE_DETALLES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case VALE_DETALLES_SUCCESS:
			return {
				loading: false,
				ordenVale: action.payload,
			};
		case VALE_DETALLES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case VALE_DETALLES_REMOVE_ITEM:
			console.log();
			return {
				...state,
				valeItems: state.ordenVale.valeItems.filter(
					(item) => item._id !== action.payload
				),
				exito: true,
			};
		default:
			return state;
	}
};

export const valeEntregarReducer = (state = {}, action) => {
	switch (action.type) {
		case VALE_FINALIZAR_REQUEST:
			return {
				loading: true,
			};
		case VALE_FINALIZAR_SUCCESS:
			return {
				loading: false,
				exito: true,
			};
		case VALE_FINALIZAR_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case VALE_FINALIZAR_RESET:
			return {};
		default:
			return state;
	}
};

export const misValesReducer = (state = { vales: [] }, action) => {
	switch (action.type) {
		case MIS_VALES_REQUEST:
			return {
				loading: true,
			};
		case MIS_VALES_SUCCESS:
			return {
				loading: false,
				vales: action.payload,
			};
		case MIS_VALES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case MIS_VALES_RESET:
			return {
				vales: [],
			};
		default:
			return state;
	}
};

export const listaValesReducer = (state = { vales: [] }, action) => {
	switch (action.type) {
		case LISTA_VALES_REQUEST:
			return {
				loading: true,
			};
		case LISTA_VALES_SUCCESS:
			return {
				loading: false,
				vales: action.payload,
			};
		case LISTA_VALES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case LISTA_VALES_RESET:
			return {
				vales: [],
			};
		default:
			return state;
	}
};

export const listaValesTipoReducer = (state = { vales: [] }, action) => {
	switch (action.type) {
		case LISTA_VALES_TIPO_REQUEST:
			return {
				loading: true,
			};
		case LISTA_VALES_TIPO_SUCCESS:
			return {
				loading: false,
				vales: action.payload,
			};
		case LISTA_VALES_TIPO_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case LISTA_VALES_TIPO_RESET:
			return {
				vales: [],
			};
		default:
			return state;
	}
};

export const valePendienteReducer = (state = {}, action) => {
	switch (action.type) {
		case LISTA_VALES_PENDIENTES_REQUEST:
			return {
				loading: true,
			};
		case LISTA_VALES_PENDIENTES_SUCCESS:
			return {
				loading: false,
				vales: action.payload,
			};
		case LISTA_VALES_PENDIENTES_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case LISTA_VALES_PENDIENTES_RESET:
			return {
				vales: [],
			};
		default:
			return state;
	}
};

export const valePendienteUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_VALE_PENDIENTE_REQUEST:
			return { loading: true };
		case UPDATE_VALE_PENDIENTE_SUCCESS:
			return { loading: false, exito: true, vale: action.payload };
		case UPDATE_VALE_PENDIENTE_FAIL:
			return { loading: false, error: action.payload };
		case UPDATE_VALE_PENDIENTE_RESET:
			return {};
		default:
			return state;
	}
};
