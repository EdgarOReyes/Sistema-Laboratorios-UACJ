import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import HerramientasScreen from './screens/HerramientasScreen';
import HerramientaScreen from './screens/HerramientaScreen';
import ValeScreen from './screens/ValeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegistroScreen';
import PerfilScreen from './screens/PerfilScreen';
import InfoValeScreen from './screens/InfoValeScreen';
import FinalizarValeScreen from './screens/FinalizarValeScreen';
import ValeFinalScreen from './screens/ValeFinalScreen';
import ListaUsuariosScreen from './screens/ListaUsuariosScreen';
import UsuarioEditarScreen from './screens/UsuarioEditarScreen';
import ListaHerramientasScreen from './screens/ListaHerramientasScreen';
import HerramientaEditarScreen from './screens/HerramientaEditarScreen';
import ListaValesScreen from './screens/ListaValesScreen';

function App() {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/valefinal/:id' component={ValeFinalScreen} />
					<Route path='/infovale' component={InfoValeScreen} />
					<Route path='/finalizar' component={FinalizarValeScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/registro' component={RegistroScreen} />
					<Route path='/perfil' component={PerfilScreen} />
					<Route path='/herramienta/:id' component={HerramientaScreen} />
					<Route path='/vale/:id?' component={ValeScreen} />
					<Route path='/admin/lista-usuarios' component={ListaUsuariosScreen} />
					<Route
						path='/admin/herramientas'
						component={ListaHerramientasScreen}
						exact
					/>
					<Route
						path='/admin/herramientas/:pageNumber'
						component={ListaHerramientasScreen}
						exact
					/>
					<Route
						path='/admin/usuarios/:id/editar'
						component={UsuarioEditarScreen}
					/>
					<Route
						path='/admin/herramienta/:id/editar'
						component={HerramientaEditarScreen}
					/>
					<Route path='/admin/listaVales' component={ListaValesScreen} />
					<Route path='/herramientas/' component={HerramientasScreen} exact />
					<Route path='/buscar/:keyword' component={HerramientasScreen} exact />
					<Route path='/caseta/:caseta' component={HerramientasScreen} exact />
					<Route path='/page/:pageNumber' component={HerramientasScreen} />

					<Route
						path='/buscar/:keyword/caseta/:caseta'
						component={HerramientasScreen}
					/>

					<Route
						path='/buscar/:keyword/page/:pageNumber'
						component={HerramientasScreen}
					/>

					<Route
						path='/caseta/:caseta/page/:pageNumber'
						component={HerramientasScreen}
					/>
					<Route
						path='/buscar/:keywordpage/caseta/:caseta/:pageNumber'
						component={HerramientasScreen}
					/>
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
