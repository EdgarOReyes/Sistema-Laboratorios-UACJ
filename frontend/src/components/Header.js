import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/usuarioActions';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';

const Header = () => {
	const dispatch = useDispatch();
	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>Labs UACJ</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mr-auto'>
							<LinkContainer to='/herramientas'>
								<Nav.Link>
									<i className='fas fa-hammer mx-1'></i>Herramientas
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/vale'>
								<Nav.Link>
									<i className='fas fa-shopping-cart mx-1'></i>Vale
								</Nav.Link>
							</LinkContainer>
						</Nav>
						<Nav>
							{infoUsuario ? (
								<NavDropdown title={infoUsuario.nombre} id='username'>
									<LinkContainer to='/perfil'>
										<NavDropdown.Item>Perfil</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Cerrar Sesión
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i>Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{infoUsuario && infoUsuario.esAdmin && (
								<NavDropdown title='Admin' id='menuadmin'>
									<LinkContainer to='/admin/lista-usuarios'>
										<NavDropdown.Item>Usuarios</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/herramientas'>
										<NavDropdown.Item>Herramientas</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/listaVales'>
										<NavDropdown.Item>Vales</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
