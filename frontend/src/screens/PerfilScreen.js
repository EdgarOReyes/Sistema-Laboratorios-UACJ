import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	getUsuarioDetalles,
	updatePerfilUsuario,
} from '../actions/usuarioActions';

import { obtenerMisVales } from '../actions/valeActions';

const PerfilScreen = ({ location, history }) => {
	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [contrasena, setContrasena] = useState('');
	const [confirmarContrasena, setConfirmarContrasena] = useState('');
	const [mensaje, setMensaje] = useState('');

	const dispatch = useDispatch();

	const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
	const { loading, error, usuario } = usuarioDetalles;

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	const usuarioUpdatePerfil = useSelector((state) => state.usuarioUpdatePerfil);
	const { exito } = usuarioUpdatePerfil;

	const misVales = useSelector((state) => state.misVales);
	const { vales, loading: cargarVales, error: errorVales } = misVales;

	useEffect(() => {
		if (!infoUsuario) {
			history.push('/login');
		} else {
			if (!usuario.nombre) {
				dispatch(getUsuarioDetalles('perfil'));
				dispatch(obtenerMisVales());
			} else {
				setNombre(usuario.nombre);
				setCorreo(usuario.correo);
			}
		}
	}, [dispatch, history, infoUsuario, usuario]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (contrasena !== confirmarContrasena) {
			setMensaje('Las contraseñas no coinciden');
		} else {
			dispatch(
				updatePerfilUsuario({
					id: usuario._id,
					nombre,
					correo,
					contrasena,
				})
			);
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>Perfil del Usuario</h2>
				{mensaje && <Message variant='danger'>{mensaje}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{exito && (
					<Message variant='success'>Se ha actualizado con éxito!</Message>
				)}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='nombre'>
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type='name'
							placeholder='Juan Pérez'
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='correo'>
						<Form.Label>Correo electrónico</Form.Label>
						<Form.Control
							type='email'
							placeholder='juan@correo.com'
							value={correo}
							onChange={(e) => setCorreo(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='contrasena'>
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type='password'
							placeholder='Ingresa contraseña'
							value={contrasena}
							onChange={(e) => setContrasena(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmarContrasena'>
						<Form.Label>Confirmar Contraseña</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirmar contraseña'
							value={confirmarContrasena}
							onChange={(e) => setConfirmarContrasena(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Actualizar
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>Mis vales</h2>
				{cargarVales ? (
					<Loader />
				) : errorVales ? (
					<Message variant='danger'>{errorVales}</Message>
				) : (
					<Table bordered hover responsive className='table-sm'>
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
										<LinkContainer to={`valefinal/${vale._id}`}>
											<Button variant='light'>Detalles</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default PerfilScreen;
