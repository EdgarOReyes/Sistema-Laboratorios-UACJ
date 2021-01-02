import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import PasosProceso from '../components/PasosProceso';
import { crearVale, resetVale, resetValeCreado } from '../actions/valeActions';

const FinalizarValeScreen = ({ history }) => {
	const dispatch = useDispatch();

	const vale = useSelector((state) => state.vale);
	const { valeItems, valeInfo } = vale;

	const valeCreado = useSelector((state) => state.valeCreado);
	const { ordenVale, exito, error } = valeCreado;

	useEffect(() => {
		if (exito) {
			history.push(`/valefinal/${ordenVale._id}`);
			dispatch(resetValeCreado());
			dispatch(resetVale());
		}
	}, [history, exito]);

	const finalizarValeHandler = () => {
		dispatch(
			crearVale({
				valeItems,
				folio: valeInfo.folio,
				numLab: valeInfo.numLab,
				nombreSolicitante: valeInfo.nombreSolicitante,
				matriculaSolicitante: valeInfo.matriculaSolicitante,
				nombrePrestamo: valeInfo.nombrePrestamo,
			})
		);
	};

	return (
		<>
			<PasosProceso paso1 paso2 paso3 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>Herramientas en el Vale</h3>
							{valeItems.length === 0 ? (
								<Message>El vale está vacío</Message>
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
									<Col>{valeInfo.numLab}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Nombre Solicitante :</Col>
									<Col>{valeInfo.nombreSolicitante}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Matícula / #Empleado :</Col>
									<Col>{valeInfo.matriculaSolicitante}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Nombre Préstamo :</Col>
									<Col>{valeInfo.nombrePrestamo}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={valeItems === 0}
									onClick={finalizarValeHandler}
								>
									Confirmar Vale
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default FinalizarValeScreen;
