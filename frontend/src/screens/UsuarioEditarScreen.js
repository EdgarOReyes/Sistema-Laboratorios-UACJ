import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
	getUsuarioDetalles,
	updateUsuario,
	resetUsuarioUpdate,
} from '../actions/usuarioActions';

const UsuarioEditarScreen = ({ match, history }) => {
	const usuarioId = match.params.id;
	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [esAdmin, setEsAdmin] = useState(false);
	const [esBecario, setEsBecario] = useState(false);

	const dispatch = useDispatch();

	const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
	const { loading, error, usuario } = usuarioDetalles;

	const usuarioUpdate = useSelector((state) => state.usuarioUpdate);
	const { loading: loadingUpdate, error: errorUpdate, exito } = usuarioUpdate;

	useEffect(() => {
		if (exito) {
			dispatch(resetUsuarioUpdate());
			history.push('/admin/lista-usuarios');
		} else {
			if (!usuario.nombre || usuario._id !== usuarioId) {
				dispatch(getUsuarioDetalles(usuarioId));
			} else {
				setNombre(usuario.nombre);
				setCorreo(usuario.correo);
				setEsAdmin(usuario.esAdmin);
				setEsBecario(usuario.esBecario);
			}
		}
	}, [dispatch, history, usuarioId, usuario, exito]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUsuario({
				_id: usuarioId,
				nombre,
				correo,
				esAdmin,
				esBecario,
			})
		);
	};

	return (
		<>
			<Link to='/admin/lista-usuarios' className='btn btn-light my-3'>
				Atrás
			</Link>
			<FormContainer>
				<h3>Editar Usuario</h3>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
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
									<Form.Check
										disabled={esBecario === true}
										type='checkbox'
										label='Admin'
										checked={esAdmin}
										onChange={(e) => setEsAdmin(e.target.checked)}
									></Form.Check>
								</Col>
							</Row>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Actualizar
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UsuarioEditarScreen;
