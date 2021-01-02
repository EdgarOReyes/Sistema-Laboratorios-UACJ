import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	registro,
	listaUsuarios,
	eliminarUsuario,
} from '../actions/usuarioActions';

const ListaUsuariosScreen = ({ history }) => {
	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [esAdmin, setEsAdmin] = useState(false);
	const [esBecario, setEsBecario] = useState(false);
	const [contrasena, setContrasena] = useState('');
	const [confirmarContrasena, setConfirmarContrasena] = useState('');
	const [mensaje, setMensaje] = useState('');

	const dispatch = useDispatch();

	const usuarioLista = useSelector((state) => state.usuarioLista);
	const { usuarios, loading, error } = usuarioLista;

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	const usuarioRegistro = useSelector((state) => state.usuarioRegistro);
	const { exito: exitoRegistro } = usuarioRegistro;

	const usuarioEliminar = useSelector((state) => state.usuarioEliminar);
	const { exito } = usuarioEliminar;

	const eliminarHandler = (usuario) => {
		if (
			window.confirm(`¿Está seguro de que desea el usuario ${usuario.nombre}?`)
		) {
			dispatch(eliminarUsuario(usuario._id));
		}
	};

	const valoresDefault = () => {
		setNombre('');
		setCorreo('');
		setEsAdmin(false);
		setEsBecario(false);
		setContrasena('');
		setConfirmarContrasena('');
		setTimeout(() => setMensaje(''), 3000);
	};

	useEffect(() => {
		if (infoUsuario && infoUsuario.esAdmin) {
			dispatch(listaUsuarios());
		} else {
			history.push('/login');
		}

		if (exitoRegistro) {
			setMensaje('Usuario registrado con éxito');
			valoresDefault();
		}
	}, [dispatch, history, infoUsuario, usuarioEliminar, exito, exitoRegistro]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (contrasena !== confirmarContrasena) {
			setMensaje('Las contraseñas no coinciden');
		} else {
			dispatch(registro(nombre, correo, esAdmin, esBecario, contrasena));
		}
	};

	return (
		<Row>
			<Col md={4}>
				<h3>Registrar Usuario</h3>
				{mensaje &&
					(mensaje === 'Usuario registrado con éxito' ? (
						<Message variant='success'>{mensaje}</Message>
					) : (
						<Message variant='danger'>{mensaje}</Message>
					))}
				{error && <Message variant='danger'>{error}</Message>}
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

					<Form.Group controlId='esAdmin'>
						<Row>
							<Col>
								<Form.Check
									disabled={esAdmin === true}
									type='checkbox'
									label='Becario'
									checked={esBecario}
									onChange={(e) => setEsBecario(e.target.checked)}
								></Form.Check>
							</Col>
							<Col>
								<Form.Group controlId='esAdmin'>
									<Form.Check
										disabled={esBecario === true}
										type='checkbox'
										label='Admin'
										checked={esAdmin}
										onChange={(e) => setEsAdmin(e.target.checked)}
									></Form.Check>
								</Form.Group>
							</Col>
						</Row>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Registrar Usuario
					</Button>
				</Form>
			</Col>
			<Col md={8}>
				<h3>Lista de Usuarios</h3>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Table bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NOMBRE</th>
								<th>EMAIL</th>
								<th>BECARIO</th>
								<th>ADMIN</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{usuarios.map((usuario) => (
								<tr key={usuario._id}>
									<td>{usuario._id}</td>
									<td>{usuario.nombre}</td>
									<td>{usuario.correo}</td>
									<td>
										{usuario.esBecario ? (
											<i
												className='fas fa-check'
												style={{ color: 'green' }}
											></i>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{usuario.esAdmin ? (
											<i
												className='fas fa-check'
												style={{ color: 'green' }}
											></i>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/admin/usuarios/${usuario._id}/editar`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>

										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => eliminarHandler(usuario)}
										>
											<i className='fas fa-trash'></i>
										</Button>
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

export default ListaUsuariosScreen;
