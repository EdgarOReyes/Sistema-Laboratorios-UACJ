import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const PasosProceso = ({ paso1, paso2, paso3 }) => {
	return (
		<Nav className='justify-content-center mb-4'>
			<Nav.Item>
				{paso1 ? (
					<LinkContainer to='/login'>
						<Nav.Link>Iniciar Sesión</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Iniciar Sesión</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{paso2 ? (
					<LinkContainer to='/infovale'>
						<Nav.Link>Info Vale</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Info Vale</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{paso3 ? (
					<LinkContainer to='/finalizar'>
						<Nav.Link>Finalizar</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Finalizar</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default PasosProceso;
