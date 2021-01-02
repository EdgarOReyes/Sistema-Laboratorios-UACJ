import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { registro } from '../actions/usuarioActions';

const RegistroScreen = ({ location, history }) => {
	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [contrasena, setContrasena] = useState('');
	const [confirmarContrasena, setConfirmarContrasena] = useState('');
	const [mensaje, setMensaje] = useState('');

	const dispatch = useDispatch();

	const usuarioRegistro = useSelector((state) => state.usuarioRegistro);
	const { loading, error, infoUsuario } = usuarioRegistro;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (infoUsuario) {
			history.push(redirect);
		}
	}, [history, infoUsuario, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (contrasena !== confirmarContrasena) {
			setMensaje('Las contraseñas no coinciden');
		} else {
			dispatch(registro(nombre, correo, contrasena));
		}
	};

	return (
		<FormContainer>
			<h1>Registrarse</h1>
			{mensaje && <Message variant='danger'>{mensaje}</Message>}
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
				<Button type='submit' variant='primary'>
					Registrarse
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Ya tienes cuenta?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Iniciar Sesión
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegistroScreen;
