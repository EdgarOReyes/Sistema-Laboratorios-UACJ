import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history, caseta = '' }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(
				caseta ? `/buscar/${keyword}/caseta/${caseta}` : `/buscar/${keyword}`
			);
		} else {
			history.push('/herramientas');
		}
	};
	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='q'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Buscar Herramienta...'
				className='ml-4'
			></Form.Control>
			<Button type='submit' variant='warning' className='p-2 ml-2'>
				Buscar
			</Button>
		</Form>
	);
};

export default SearchBox;
