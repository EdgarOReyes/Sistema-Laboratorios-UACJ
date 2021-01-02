import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col, Row } from 'react-bootstrap';

const Vale = ({ vale }) => {
	const creado = new Date(vale.createdAt).toLocaleString('es-MX', {
		timeZone: 'America/Chihuahua',
	});

	const fecha = creado.split(' ')[0];
	const hora = creado.split(' ')[1];

	return (
		<Card
			className='mx-4 my-2'
			border={
				vale.estatus === 'Entregado'
					? 'success'
					: vale.estatus === 'Pendiente'
					? 'warning'
					: 'danger'
			}
		>
			<Card.Header
				style={
					({ fontSize: '14px' },
					vale.estatus === 'Entregado'
						? { backgroundColor: '#02b875' }
						: vale.estatus === 'Pendiente'
						? { backgroundColor: '#f0ad4e' }
						: { backgroundColor: '#d9534f' })
				}
			></Card.Header>
			<Card.Body style={{ fontSize: '14px' }}>
				<Row style={{ justifyContent: 'center' }}>
					<Col className='mx-4'>
						<strong>{fecha}</strong>
					</Col>
					<Col>
						<strong>{hora}</strong>
					</Col>
				</Row>
				<Row style={{ justifyContent: 'center' }} className='mt-2'>
					<strong># Herramientas: </strong>{' '}
					{vale.valeItems.length > 0
						? vale.valeItems.length
						: vale.itemsEntregados.length}
				</Row>

				<Row style={{ justifyContent: 'center' }} className='mt-2'>
					<strong>Solicitante: </strong> {vale.nombreSolicitante}
				</Row>

				<Row style={{ justifyContent: 'center' }}>
					<strong>Becario Préstamo: </strong> {vale.nombrePrestamo}
				</Row>

				{vale.nombreDevolucion !== '' && (
					<Row style={{ justifyContent: 'center' }}>
						<strong>Becario Devolución: </strong> {vale.nombreDevolucion}
					</Row>
				)}

				<Row className='mt-2' style={{ justifyContent: 'center' }}>
					<Link to={`/valefinal/${vale._id}`}>
						<Button variant='outline-primary' size='sm'>
							Detalles
						</Button>
					</Link>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default Vale;
