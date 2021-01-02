import React, { useEffect, useState } from 'react';
import { Col, Dropdown } from 'react-bootstrap';
import Vale from '../components/Vale';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerValesTipo } from '../actions/valeActions';
import { CardDeck } from 'react-bootstrap';

const HomeScreen = ({ match }) => {
	const dispatch = useDispatch();

	const [valesTipo, setValesTipo] = useState('pendientes');

	const listaValesTipo = useSelector((state) => state.listaValesTipo);
	const { vales, loading, error } = listaValesTipo;

	useEffect(() => {
		dispatch(obtenerValesTipo(valesTipo));
	}, [dispatch, valesTipo]);

	const pendientesHandler = () => {
		setValesTipo('pendientes');
	};

	const entregadosHandler = () => {
		setValesTipo('entregados');
	};

	const adeudosHandler = () => {
		setValesTipo('adeudos');
	};

	return (
		<>
			<Dropdown className='ml-4'>
				<Dropdown.Toggle variant='warning' id='dropdown-basic'>
					Vales {valesTipo}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item onClick={pendientesHandler}>
						Vales Pendientes
					</Dropdown.Item>
					<Dropdown.Item onClick={entregadosHandler}>
						Vales Entregados
					</Dropdown.Item>
					<Dropdown.Item onClick={adeudosHandler}>
						Vales con Adeudos
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<h3 className='m-4'>Vales {valesTipo}</h3>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<CardDeck className='mx-1'>
					{vales.map((vale) => (
						<Col key={vale._id} sm={12} md={4}>
							<Vale key={vale._id} vale={vale} />
						</Col>
					))}
				</CardDeck>
			)}
			{/*<div className='mx-4'>
						<Paginate
							pages={pages}
							page={page}
							keyword={keyword ? keyword : ''}
						/>
					</div>*/}
		</>
	);
};

export default HomeScreen;
