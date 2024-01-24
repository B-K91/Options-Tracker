import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const OpenOptionsList = () => {
	const [options, setOptions] = useState([]);
	
	useEffect(() => {
		axios.get('http://localhost:3000/option/open')
		.then(response => setOptions(response.data))
		.catch(error => console.error('Error fetching options:', error));
	}, []);
	
	const handleDelete = (id) => {
		Swal.fire({
			title: 'Delete Option',
			text: 'Are you sure you want to delete this option?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
			// If the user confirms, proceed with the deletion
			axios.delete(`http://localhost:3000/option/${id}`)
				.then(response => {
					console.log(response.data);
					// Refresh the options list after deletion
					setOptions(options.filter(option => option._id !== id));
				})
				.catch(error => console.error('Error deleting option:', error));
			}
		});
	};

	return (
		<div className="d-flex justify-content-center align-items-center vh-300">
		<div className="container">
		<h1 className="text-center mb-4">All Open Options</h1>
		<div className="row">
		<div className="col">
		<table className="table table-striped">
		<thead>
		<tr>
		<th scope="col">Symbol</th>
		<th scope="col">Strike Price</th>
		<th scope="col">Premium</th>
		<th scope="col">Collateral</th>
		<th scope="col">Type</th>
		<th scope="col">Date opened</th>
		<th scope="col">Date of expiry</th>
		<th scope="col">Return</th>
		<th scope="col">ARR</th>
		<th scope="col">Actions</th>
		</tr>
		</thead>
		<tbody>
		{options.map(option => (
			<tr key={option._id}>
			<td>{option.symbol}</td>
			<td>${option.strike_price}</td>
			<td>${option.premium}</td>
			<td>${option.collateral}</td>
			<td>{option.type}</td>
			<td>{option.date_opened}</td>
			<td>{option.date_of_expiry}</td>
			<td>{option.option_return} %</td>
			<td>{option.option_arr} %</td>
			<td>
			<Link to={`/edit/${option._id}`} className="btn btn-primary btn-sm me-2"> Edit </Link>
			<button className="btn btn-danger btn-sm" onClick={() => handleDelete(option._id)}> Delete </button>
			</td>
			</tr>
			))}
		</tbody>
		</table>
		</div>
		</div>
		</div>
		</div>
		);
	};
		
export default OpenOptionsList;
		