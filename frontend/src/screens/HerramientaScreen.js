import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Form,
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
} from 'react-bootstrap';
import { listaHerramientasDetalles } from '../actions/herramientaActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HerramientaScreen = ({ history, match }) => {
	const [cant, setCant] = useState(1);

	const dispatch = useDispatch();

	const detallesHerramienta = useSelector((state) => state.detallesHerramienta);
	const { loading, error, herramienta } = detallesHerramienta;

	const creado = new Date(herramienta.createdAt).toLocaleString('es-MX', {
		timeZone: 'America/Chihuahua',
	});

	const actualizado = new Date(herramienta.updatedAt).toLocaleString('es-MX', {
		timeZone: 'America/Chihuahua',
	});

	useEffect(() => {
		dispatch(listaHerramientasDetalles(match.params.id));
	}, [dispatch, match]);

	const agregarAlValeHandler = () => {
		history.push(`/vale/${match.params.id}?cantidad=${cant}`);
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/herramientas'>
				Atrás
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={herramienta.imagen} alt={herramienta.nombre} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{herramienta.nombre}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								Agregado en: <br />
								{creado}
							</ListGroup.Item>
							<ListGroup.Item>
								Última vez actualizado en: {actualizado}
							</ListGroup.Item>
							<ListGroup.Item>{herramienta.descripcion}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col># Inventario:</Col>
										<Col>
											<strong>{herramienta.numInventario}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Caseta:</Col>
										<Col>
											<strong>{herramienta.caseta}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col
											className={
												herramienta.cantidadEnStock > 0
													? 'text-success'
													: 'text-danger'
											}
										>
											{herramienta.cantidadEnStock > 0
												? 'En Stock'
												: 'No hay en Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{herramienta.cantidadEnStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Cantidad</Col>
											<Col>
												<Form.Control
													as='select'
													value={cant}
													onChange={(e) => setCant(e.target.value)}
												>
													{[...Array(herramienta.cantidadEnStock).keys()].map(
														(x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														)
													)}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={agregarAlValeHandler}
										className='btn-block'
										type='button'
										disabled={herramienta.cantidadEnStock === 0}
									>
										Añadir al vale
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default HerramientaScreen;
