import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/usuarioActions';

const LoginScreen = ({ location, history }) => {
	const [correo, setCorreo] = useState('');
	const [contrasena, setContrasena] = useState('');

	const dispatch = useDispatch();

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { loading, error, infoUsuario } = usuarioLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (infoUsuario) {
			history.push(redirect);
		}
	}, [history, infoUsuario, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(correo, contrasena));
	};

	return (
		<FormContainer>
			<h1>Iniciar Sesión</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
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
				<Button type='submit' variant='primary'>
					Iniciar Sesión
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Nuevo Usuario?{' '}
					<Link to={redirect ? `/registro?redirect=${redirect}` : '/registro'}>
						Registrarse
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
