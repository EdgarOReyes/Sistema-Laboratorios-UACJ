import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import PasosProceso from '../components/PasosProceso';
import Message from '../components/Message';
import { guardarInfoVale } from '../actions/valeActions';
import { obtenerBecarios } from '../actions/usuarioActions';

const InfoValeScreen = ({ history }) => {
	const listaBecarios = useSelector((state) => state.listaBecarios);
	const {
		loading: loadingBecarios,
		error: errorBecarios,
		becarios,
	} = listaBecarios;

	const usuarioLogin = useSelector((state) => state.usuarioLogin);
	const { infoUsuario } = usuarioLogin;

	const [numLab, setNumLab] = useState('Selecciona una caseta...');

	const [nombreSolicitante, setNombreSolicitante] = useState('');

	const [matriculaSolicitante, setMatriculaSolicitante] = useState('');

	const [nombrePrestamo, setNombrePrestamo] = useState(
		'Selecciona tu nombre...'
	);

	const [errorCaseta, setErrorCaseta] = useState(true);

	const [errorBecario, setErrorBecario] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (infoUsuario && infoUsuario.esAdmin) {
			dispatch(obtenerBecarios());
		}
	}, [dispatch, infoUsuario]);

	const cambiarNumLab = (valor) => {
		if (valor !== 'Selecciona una caseta...') {
			setNumLab(valor);
			setErrorCaseta(false);
		} else {
			setNumLab(valor);
			setErrorCaseta(true);
		}
	};

	const cambiarNombrePrestamo = (valor) => {
		if (valor !== 'Selecciona tu nombre...') {
			setNombrePrestamo(valor);
			setErrorBecario(false);
		} else {
			setNombrePrestamo(valor);
			setErrorBecario(true);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		numLab === 'Selecciona una caseta...' && setErrorCaseta(true);
		nombrePrestamo === 'Selecciona tu nombre...' && setErrorBecario(true);
		dispatch(
			guardarInfoVale({
				numLab,
				nombreSolicitante,
				matriculaSolicitante,
				nombrePrestamo,
			})
		);
		history.push('/finalizar');
	};

	return (
		<FormContainer>
			<PasosProceso paso1 paso2 />
			<h3>Información del Vale</h3>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='numLab'>
					<Form.Label># Laboratorio</Form.Label>
					{errorCaseta && (
						<Message variant='danger'>Por favor selecciona una caseta</Message>
					)}
					<Form.Control
						as='select'
						placeholder='# Laboratorio / Salón'
						value={numLab}
						required
						onChange={(e) => cambiarNumLab(e.target.value)}
					>
						<option>Selecciona una caseta...</option>
						<option>D1-105</option>
						<option>D1-106</option>
						<option>D2-105</option>
					</Form.Control>
				</Form.Group>

				<Form.Group controlId='nombreSolicitante'>
					<Form.Label>Nombre del Solicitante</Form.Label>
					<Form.Control
						type='nombreSolicitante'
						placeholder='Nombre'
						value={nombreSolicitante}
						required
						onChange={(e) => setNombreSolicitante(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='matriculaSolicitante'>
					<Form.Label>Matricula / # Empleado del Solicitante</Form.Label>
					<Form.Control
						type='matriculaSolicitante'
						placeholder='Matricula / # Empleado'
						value={matriculaSolicitante}
						required
						onChange={(e) => setMatriculaSolicitante(e.target.value)}
					></Form.Control>
				</Form.Group>

				{loadingBecarios === false && (
					<Form.Group controlId='nombrePrestamo'>
						<Form.Label>Becario</Form.Label>
						{errorBecario && (
							<Message variant='danger'>Por favor selecciona tu nombre</Message>
						)}
						<Form.Control
							as='select'
							value={nombrePrestamo}
							onChange={(e) => cambiarNombrePrestamo(e.target.value)}
							required
						>
							<option>Selecciona tu nombre...</option>
							{becarios.map((becario) => (
								<option key={becario._id}>{becario.nombre}</option>
							))}
						</Form.Control>
					</Form.Group>
				)}

				<Button
					type='submit'
					variant='primary'
					disabled={loadingBecarios || errorCaseta || errorBecario}
				>
					Siguiente
				</Button>
			</Form>
		</FormContainer>
	);
};

export default InfoValeScreen;
