import React, { useEffect, useState } from 'react';
import {
	Row,
	Col,
	Image,
	Card,
	ListGroup,
	Button,
	Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	getDetallesVale,
	finalizarVale,
	resetValeFinalizado,
	udpateValePendiente,
	resetUpdateValePendiente,
} from '../actions/valeActions';
import { obtenerBecarios } from '../actions/usuarioActions';

const ValeFinalScreen = ({ match }) => {
	const valeId = match.params.id;

	const dispatch = useDispatch();

	const valeDetalles = useSelector((state) => state.valeDetalles);
	const { ordenVale, loading, error } = valeDetalles;

	const valeEntregado = useSelector((state) => state.valeEntregado);
	const { exito } = valeEntregado;

	const valePendienteUpdate = useSelector((state) => state.valePendienteUpdate);
	const { exito: valePendienteExito } = valePendienteUpdate;

	const listaBecarios = useSelector((state) => state.listaBecarios);
	const {
		loading: loadingBecarios,
		error: errorBecarios,
		becarios,
	} = listaBecarios;

	const [valeItems, setValeItems] = useState([]);
	const [itemsEntregados, setItemsEntregados] = useState([]);

	const [nombreDevolucion, setNombreDevolucion] = useState(
		'Selecciona tu nombre...'
	);

	const [errorDevolucion, setErrorDevolucion] = useState(true);

	useEffect(() => {
		if (!ordenVale || exito || ordenVale._id !== valeId || valePendienteExito) {
			dispatch(resetUpdateValePendiente());
			dispatch(resetValeFinalizado());
			dispatch(getDetallesVale(valeId));
			dispatch(obtenerBecarios());
		} else {
			setValeItems(ordenVale.valeItems);
			setItemsEntregados(ordenVale.itemsEntregados);
			setNombreDevolucion(ordenVale.nombreDevolucion);
		}
	}, [dispatch, valeId, exito, ordenVale, valePendienteExito]);

	const submitHandler = (e) => {
		e.preventDefault();
		actualizarVale();
		dispatch(finalizarVale(valeId, 'Entregado', nombreDevolucion));
	};

	const submitAdeudo = (e) => {
		actualizarVale();
		dispatch(finalizarVale(valeId, 'Adeudo'));
	};

	const editarCantidadHanlder = (id, cant) => {
		const valeItemsClone = [...valeItems];
		valeItemsClone.forEach(
			(item) => item._id === id && (item.cant = Number(cant))
		);
		setValeItems(valeItemsClone);
	};

	const entregarItem = (item) => {
		setValeItems(valeItems.filter((x) => x.herramienta !== item.herramienta));
		setItemsEntregados([...itemsEntregados, item]);
	};

	const actualizarVale = () => {
		dispatch(
			udpateValePendiente({
				_id: valeId,
				valeItems,
				itemsEntregados,
			})
		);
	};

	const cambiarNombreDevolucion = (valor) => {
		if (valor !== 'Selecciona tu nombre...') {
			setNombreDevolucion(valor);
			setErrorDevolucion(false);
		} else {
			setNombreDevolucion(valor);
			setErrorDevolucion(true);
		}
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			{ordenVale.estatus === 'Pendiente' ? (
				<Message variant='warning'>Estatus: {ordenVale.estatus}</Message>
			) : ordenVale.estatus === 'Entregado' ? (
				<Message variant='success'>Estatus: {ordenVale.estatus}</Message>
			) : (
				<Message variant='danger'>Estatus: {ordenVale.estatus}</Message>
			)}
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>Herramientas en el Vale</h3>
							{valeItems.length === 0 ? (
								<Message>No hay herramientas por entregar</Message>
							) : (
								<ListGroup variant='flush'>
									{valeItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.imagen}
														alt={item.nombre}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/herramienta/${item.herramienta}`}>
														{item.nombre}
													</Link>
												</Col>

												<Col md={4}>
													<Form.Control
														as='select'
														value={item.cant}
														onChange={(e) =>
															editarCantidadHanlder(item._id, e.target.value)
														}
													>
														{[...Array(item.cant).keys()].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))}
													</Form.Control>
												</Col>

												<Col>
													<Button
														variant='danger'
														size='sm'
														type='button'
														onClick={() => entregarItem(item)}
													>
														<i className='fas fa-trash-alt'></i>
													</Button>
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h3>Herramientas Entregadas</h3>
							{itemsEntregados.length === 0 ? (
								<Message>No hay herramientas entregadas</Message>
							) : (
								<ListGroup variant='flush'>
									{itemsEntregados.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.imagen}
														alt={item.nombre}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/herramienta/${item.herramienta}`}>
														{item.nombre}
													</Link>
												</Col>

												<Col md={4}>Cantidad: {item.cant}</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>
										<h3>Resumen</h3>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>
										<strong># Herramientas:</strong>
									</Col>
									<Col>
										<strong>
											{valeItems.reduce((acc, item) => acc + item.cant, 0)}
										</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Laboratorio núm. :</Col>
									<Col>{ordenVale.numLab}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Nombre Solicitante :</Col>
									<Col>{ordenVale.nombreSolicitante}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Matícula / #Empleado :</Col>
									<Col>{ordenVale.matriculaSolicitante}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Nombre Préstamo :</Col>
									<Col>{ordenVale.nombrePrestamo}</Col>
								</Row>
							</ListGroup.Item>
							{loadingBecarios === false && (
								<ListGroup.Item>
									{valeItems.length > 0 ? (
										<>
											<Button
												className='btn-block'
												variant='primary'
												onClick={actualizarVale}
											>
												Actualizar Vale
											</Button>
											<Button
												className='btn-block'
												variant='danger'
												onClick={submitAdeudo}
												disabled={ordenVale.estatus === 'Adeudo'}
											>
												Marcar como adeudo
											</Button>
										</>
									) : (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='nombrePrestamo'>
												<Form.Label>Becario Devolución</Form.Label>
												{errorDevolucion && (
													<Message variant='danger'>
														Por favor selecciona tu nombre
													</Message>
												)}
												<Form.Control
													disabled={ordenVale.estatus === 'Entregado'}
													as='select'
													value={nombreDevolucion}
													onChange={(e) =>
														cambiarNombreDevolucion(e.target.value)
													}
												>
													<option>Selecciona tu nombre...</option>
													{becarios.map((becario) => (
														<option key={becario._id}>{becario.nombre}</option>
													))}
												</Form.Control>
											</Form.Group>
											<Button
												disabled={
													ordenVale.estatus === 'Entregado' || errorDevolucion
												}
												type='submit'
												className='btn-block'
												variant='primary'
											>
												Marcar como entregado
											</Button>
										</Form>
									)}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ValeFinalScreen;
