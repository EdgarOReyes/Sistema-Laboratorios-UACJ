import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
	listaHerramientas,
	eliminarHerramienta,
	crearHerramienta,
	resetHerramienta,
} from '../actions/herramientaActions';

const ListaHerramientasScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const listaHerramienta = useSelector((state) => state.listaHerramienta);
	const { herramientas, loading, error, page, pages } = listaHerramienta;

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	const herramientaEliminar = useSelector((state) => state.herramientaEliminar);
	const {
		error: errorEliminar,
		loading: loadingEliminar,
		exito,
	} = herramientaEliminar;

	const herramientaCrear = useSelector((state) => state.herramientaCrear);
	const {
		error: errorCrear,
		loading: loadingCrear,
		exito: exitoCrear,
		herramienta: herramientaCreada,
	} = herramientaCrear;

	useEffect(() => {
		dispatch(resetHerramienta());
		if (!infoUsuario.esAdmin) {
			history.push('/login');
		}

		if (exitoCrear) {
			history.push(`/admin/herramienta/${herramientaCreada._id}/editar`);
		} else {
			dispatch(listaHerramientas('', pageNumber));
		}
	}, [
		dispatch,
		history,
		infoUsuario,
		exito,
		exitoCrear,
		herramientaCreada,
		pageNumber,
	]);

	const eliminarHandler = (id, nombre) => {
		if (window.confirm(`Estás seguro de que deseas eliminar ${nombre}?`)) {
			dispatch(eliminarHerramienta(id));
		}
	};

	const crearHerramientaHandler = () => {
		dispatch(crearHerramienta());
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Herramientas</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={crearHerramientaHandler}>
						<i className='fas fa-plus'></i> Crear herramienta
					</Button>
				</Col>
			</Row>
			{loadingEliminar && <Loader />}
			{errorEliminar && <Message variant='danger'>{errorEliminar}</Message>}
			{loadingCrear && <Loader />}
			{errorCrear && <Message variant='danger'>{errorCrear}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NOMBRE</th>
								<th>CASETA</th>
								<th># STOCK</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{herramientas.map((herramienta) => (
								<tr key={herramienta._id}>
									<td>{herramienta._id}</td>
									<td>{herramienta.nombre}</td>
									<td>{herramienta.caseta}</td>
									<td>{herramienta.cantidadEnStock}</td>

									<td>
										<LinkContainer
											to={`/admin/herramienta/${herramienta._id}/editar`}
										>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>

										<Button
											variant='danger'
											className='btn-sm'
											onClick={() =>
												eliminarHandler(herramienta._id, herramienta.nombre)
											}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ListaHerramientasScreen;
