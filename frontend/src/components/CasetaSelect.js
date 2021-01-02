import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CasetaSelect = ({ history }) => {
	const [numCaseta, setNumCaseta] = useState('D1-105');

	const submitHandler = (e) => {
		e.preventDefault();

		history.push(`/caseta/${numCaseta}`);
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				as='select'
				defaultValue={numCaseta}
				onChange={(e) => setNumCaseta(e.target.value)}
				className='ml-4'
				style={{ width: '200px' }}
			>
				<option>D1-105</option>
				<option>D1-106</option>
				<option>D2-105</option>
			</Form.Control>
			<Button type='submit' variant='warning' className='p-2 ml-2'>
				Buscar
			</Button>
		</Form>
	);
};

export default CasetaSelect;
