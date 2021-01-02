import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
	listaHerramientasDetalles,
	updateHerramienta,
	resetUpdateHerramienta,
} from '../actions/herramientaActions';
import moment from 'moment-timezone';

const HerramientaEditarScreen = ({ match, history }) => {
	const herramientaId = match.params.id;

	const [nombre, setNombre] = useState('');
	const [cantidadEnStock, setCantidadEnStock] = useState('');
	const [imagen, setImagen] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [caseta, setCaseta] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	const detallesHerramienta = useSelector((state) => state.detallesHerramienta);
	const { loading, error, herramienta } = detallesHerramienta;

	const herramientaUpdate = useSelector((state) => state.herramientaUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		exito: exitoUpdate,
	} = herramientaUpdate;

	useEffect(() => {
		if (exitoUpdate) {
			dispatch(resetUpdateHerramienta());
			history.push('/admin/herramientas');
		} else {
			if (!herramienta.nombre || herramienta._id !== herramientaId) {
				dispatch(listaHerramientasDetalles(herramientaId));
			} else {
				setNombre(herramienta.nombre);
				setImagen(herramienta.imagen);
				setCantidadEnStock(herramienta.cantidadEnStock);
				setDescripcion(herramienta.descripcion);
				setCaseta(herramienta.caseta);
			}
		}
	}, [dispatch, history, herramientaId, herramienta, exitoUpdate]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);
		try {
			const config = {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/upload', formData, config);
			setImagen(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateHerramienta({
				_id: herramientaId,
				nombre,
				imagen,
				cantidadEnStock,
				descripcion,
				caseta,
			})
		);
	};

	return (
		<>
			<Link to='/admin/herramientas' className='btn btn-light my-3'>
				Atrás
			</Link>
			<FormContainer>
				<h3>Editar Herramienta</h3>
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
								placeholder='Ej. Pinzas'
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='imagen'>
							<Form.Label>Imagen</Form.Label>
							<Form.Control
								type='text'
								placeholder='URL Imagen'
								value={imagen}
								onChange={(e) => setImagen(e.target.value)}
							></Form.Control>
							<Form.File
								id='image-file'
								label='Seleccione un imagen'
								custom
								className='mt-3'
								onChange={uploadFileHandler}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId='cantidadEnStock'>
							<Form.Label>Cantidad en Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='# Stock'
								value={cantidadEnStock}
								onChange={(e) => setCantidadEnStock(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='descripcion'>
							<Form.Label>Descripción</Form.Label>
							<Form.Control
								type='text'
								placeholder='Descripción de la herramienta'
								value={descripcion}
								onChange={(e) => setDescripcion(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='caseta'>
							<Form.Label>Caseta</Form.Label>
							<Form.Control
								type='text'
								placeholder='DX-XXX'
								value={caseta}
								onChange={(e) => setCaseta(e.target.value)}
							></Form.Control>
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

export default HerramientaEditarScreen;
