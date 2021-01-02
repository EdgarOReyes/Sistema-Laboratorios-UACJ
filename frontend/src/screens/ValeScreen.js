import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToVale, removeFromVale } from '../actions/valeActions';

const ValeScreen = ({ match, location, history }) => {
	const herramientaId = match.params.id;

	const cant = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const vale = useSelector((state) => state.vale);
	const { valeItems } = vale;

	useEffect(() => {
		if (herramientaId) {
			dispatch(addToVale(herramientaId, cant));
		}
	}, [dispatch, herramientaId, cant]);

	const removeFromValeHandler = (id) => {
		dispatch(removeFromVale(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=infovale');
	};
	return (
		<Row>
			<Col md={8}>
				<h1>Vale de Herramientas</h1>
				<Link to='/herramientas' className='btn btn-light my-3'>
					{'< Herramientas'}
				</Link>
				{valeItems.length === 0 ? (
					<Message>
						El vale está vacío.
						<Link to='/herramientas'>{'< Herramientas'}</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{valeItems.map((item) => (
							<ListGroup.Item key={item.herramienta}>
								<Row>
									<Col md='2'>
										<Image
											src={item.imagen}
											alt={item.nombre}
											fluid
											rounded
											style={{ height: '50px' }}
										/>
									</Col>
									<Col md='3'>
										<Link to={`/herramienta/${item.herramienta}`}>
											{item.nombre}
										</Link>
									</Col>
									<Col md={2}>{item.caseta}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.cant}
											onChange={(e) =>
												dispatch(
													addToVale(item.herramienta, Number(e.target.value))
												)
											}
										>
											{[...Array(item.cantidadEnStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											onClick={() => removeFromValeHandler(item.herramienta)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4} style={{ display: 'flex', justifyContent: 'center' }}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h5>
								Se han seleccionado (
								{valeItems.reduce((acc, item) => acc + item.cant, 0)}) items
							</h5>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={valeItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceder
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default ValeScreen;
