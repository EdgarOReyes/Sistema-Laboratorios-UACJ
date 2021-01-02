import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Herramienta = ({ herramienta }) => {
	const creado = new Date(herramienta.createdAt).toLocaleString('es-MX', {
		timeZone: 'America/Chihuahua',
	});

	return (
		<Card style={{ width: '14rem', height: '20rem' }} className='m-4'>
			<Link to={`/herramienta/${herramienta._id}`}>
				<Card.Img
					variant='top'
					src={herramienta.imagen}
					style={{ height: '150px' }}
					className='py-2 px-5 '
				/>
			</Link>
			<Card.Body>
				<Link to={`/herramienta/${herramienta._id}`}>
					<Card.Title>{herramienta.nombre}</Card.Title>
				</Link>
				<Card.Subtitle
					className={
						herramienta.cantidadEnStock > 0 ? 'text-success' : 'text-danger'
					}
				>
					Unidades en Stock: {herramienta.cantidadEnStock}
				</Card.Subtitle>
			</Card.Body>
			<Card.Footer style={{ height: '3rem' }}>
				<small className='text-muted'>Creado: {creado}</small>
			</Card.Footer>
		</Card>
	);
};

export default Herramienta;
