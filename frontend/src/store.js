import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	herramientaListaReducer,
	herramientaDetallesReducer,
	herramientaEliminarReducer,
	herramientaCrearReducer,
	herramientaUpdateReducer,
} from './reducers/herramientaReducers';
import {
	valeReducer,
	valeCrearReducer,
	valeDetallesReducer,
	valeEntregarReducer,
	misValesReducer,
	listaValesReducer,
	listaValesTipoReducer,
	valePendienteUpdateReducer,
} from './reducers/valeReducers';
import {
	usuarioLoginReducer,
	usuarioRegistroReducer,
	usuarioDetallesReducer,
	usuarioUpdatePerfilReducer,
	usuarioListaReducer,
	usuarioEliminarReducer,
	usuarioUpdateReducer,
	listaBecariosReducer,
} from './reducers/usuarioReducer';

const reducer = combineReducers({
	listaHerramienta: herramientaListaReducer,
	detallesHerramienta: herramientaDetallesReducer,
	herramientaEliminar: herramientaEliminarReducer,
	herramientaCrear: herramientaCrearReducer,
	herramientaUpdate: herramientaUpdateReducer,
	vale: valeReducer,
	usuarioLogin: usuarioLoginReducer,
	usuarioRegistro: usuarioRegistroReducer,
	usuarioDetalles: usuarioDetallesReducer,
	usuarioUpdatePerfil: usuarioUpdatePerfilReducer,
	usuarioLista: usuarioListaReducer,
	usuarioEliminar: usuarioEliminarReducer,
	usuarioUpdate: usuarioUpdateReducer,
	listaBecarios: listaBecariosReducer,
	valeCreado: valeCrearReducer,
	valeDetalles: valeDetallesReducer,
	valeEntregado: valeEntregarReducer,
	misVales: misValesReducer,
	listaVales: listaValesReducer,
	listaValesTipo: listaValesTipoReducer,
	valePendienteUpdate: valePendienteUpdateReducer,
});

const valeItemsFromStorage = localStorage.getItem('valeItems')
	? JSON.parse(localStorage.getItem('valeItems'))
	: [];

const infoUsuarioFromStorage = localStorage.getItem('infoUsuario')
	? JSON.parse(localStorage.getItem('infoUsuario'))
	: null;

const initialState = {
	vale: { valeItems: valeItemsFromStorage, valeInfo: {} },
	usuarioLogin: { infoUsuario: infoUsuarioFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
