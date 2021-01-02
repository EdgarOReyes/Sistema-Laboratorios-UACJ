import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { obtenerVales, resetListaVales } from '../actions/valeActions';

const ListaValesScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	const listaVales = useSelector((state) => state.listaVales);
	const { vales, loading, error } = listaVales;

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	useEffect(() => {
		if (infoUsuario && infoUsuario.esAdmin) {
			dispatch(obtenerVales());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, infoUsuario]);

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Vales</h1>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table stripped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>SOLICITANTE</th>
							<th>BECARIO</th>
							<th>ESTATUS</th>
							<th>FECHA</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{vales.map((vale) => (
							<tr key={vale._id}>
								<td>{vale._id}</td>
								<td>{vale.nombreSolicitante}</td>
								<td>{vale.nombrePrestamo}</td>
								<td>{vale.estatus}</td>
								<td>{vale.createdAt.substring(0, 10)}</td>

								<td>
									<LinkContainer to={`/valefinal/${vale._id}/`}>
										<Button variant='light' className='btn-sm'>
											Detalles
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ListaValesScreen;
