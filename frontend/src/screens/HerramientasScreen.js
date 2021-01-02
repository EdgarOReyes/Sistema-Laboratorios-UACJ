import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap';
import Herramienta from '../components/Herramienta';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import SearchBox from '../components/SearchBox';
import CasetaSelect from '../components/CasetaSelect';
import { useDispatch, useSelector } from 'react-redux';
import { listaHerramientas } from '../actions/herramientaActions';
import { CardDeck } from 'react-bootstrap';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;

	const pageNumber = match.params.pageNumber || 1;

	const caseta = match.params.caseta;

	const dispatch = useDispatch();

	const listaHerramienta = useSelector((state) => state.listaHerramienta);
	const { loading, error, herramientas, page, pages } = listaHerramienta;

	useEffect(() => {
		dispatch(listaHerramientas(keyword, pageNumber, caseta));
	}, [dispatch, keyword, pageNumber, caseta]);

	return (
		<div>
			<h3 className='mx-4'>Herramientas {caseta}</h3>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<>
					<Row>
						<Col sm={12} md={4}>
							<Route
								render={({ history }) => <CasetaSelect history={history} />}
							/>
						</Col>
						<Col sm={12} md={4}>
							<Route
								render={({ history }) => (
									<SearchBox history={history} caseta={caseta} />
								)}
							/>
						</Col>
					</Row>

					<CardDeck>
						{herramientas.map((herramienta) => (
							<Col key={herramienta._id} sm={12} md={6} lg={4} xl={3}>
								<Herramienta herramienta={herramienta} />
							</Col>
						))}
					</CardDeck>
					<div className='ml-4'>
						<Paginate
							pages={pages}
							page={page}
							keyword={keyword ? keyword : ''}
							caseta={caseta}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default HomeScreen;
