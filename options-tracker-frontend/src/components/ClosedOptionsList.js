import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const ClosedOptionsList = () => {
	const [options, setOptions] = useState([]);
	
	useEffect(() => {
		axios.get('http://localhost:3000/option/closed')
		.then(response => setOptions(response.data))
		.catch(error => console.error('Error fetching options:', error));
	}, []);

	return (
		<div>
		<NavBar />
		<div className="d-flex justify-content-center align-items-center vh-300">
		<div className="container">
		<h1 className="text-center mb-4">All Closed Options</h1>
		<div className="row">
		<div className="col">
		<table className="table table-striped">
		<thead>
		<tr>
		<th scope="col">Symbol</th>
		<th scope="col">Strike Price</th>
		<th scope="col">Realized Profit/Loss</th>
		<th scope="col">Collateral</th>
		<th scope="col">Type</th>
		<th scope="col">Date opened</th>
		<th scope="col">Date of expiry</th>
		<th scope="col">Return</th>
		<th scope="col">ARR</th>
		</tr>
		</thead>
		<tbody>
		{options.map(option => (
			<tr key={option._id}>
			<td>{option.symbol}</td>
			<td>${option.strike_price}</td>
			<td>${option.realized_gain_loss}</td>
			<td>${option.collateral}</td>
			<td>{option.type}</td>
			<td>{option.date_opened}</td>
			<td>{option.date_of_expiry}</td>
			<td>{option.option_return} %</td>
			<td>{option.option_arr} %</td>
			</tr>
			))}
		</tbody>
		</table>
		</div>
		</div>
		</div>
		</div>
		</div>
		);
	};
		
export default ClosedOptionsList;
		