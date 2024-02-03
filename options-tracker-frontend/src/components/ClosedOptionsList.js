import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { formatDate, getNumberDays } from '../utils/date_utility';

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
		<table className="table table-striped text-center">
		<thead>
		<tr>
		<th scope="col">Symbol</th>
		<th scope="col">Strike Price</th>
		<th scope="col">Realized Profit/Loss</th>
		<th scope="col">Collateral</th>
		<th scope="col">Option Type</th>
		<th scope="col">Date Opened</th>
		<th scope="col">Date of Expiry</th>
		<th scope="col">Days Open</th>
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
			<td>{formatDate(option.date_opened)}</td>
			<td>{formatDate(option.date_of_expiry)}</td>
			<td>{getNumberDays(option.date_opened, option.date_of_expiry)}</td>
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
		