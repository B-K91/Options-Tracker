import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { getCurrentDate, getNumberDays, hasDatePassed, formatDate } from '../utils/date_utility'
import '../styles.css';

const OpenOptionsList = () => {
	const [options, setOptions] = useState([]);
	const [sortBy, setSortBy] = useState('dateOpened');
	const [sortOrder, setSortOrder] = useState('asc');

	useEffect(() => {
        axios.get('http://localhost:3000/option/open')
            .then(response => {
                let sortedOptions = response.data;
				if (sortBy === 'symbol') {
					sortedOptions.sort((a, b) => compareValues(a.symbol, b.symbol, sortOrder));
				} else if (sortBy === 'strike_price') {
                    sortedOptions.sort((a, b) => compareValues(a.strike_price, b.strike_price, sortOrder));
                } else if (sortBy === 'premium') {
					sortedOptions.sort((a, b) => compareValues(a.premium, b.premium, sortOrder));
				} else if (sortBy === 'collateral') {
                    sortedOptions.sort((a, b) => compareValues(a.collateral, b.collateral, sortOrder));
				} else if (sortBy === 'option_type') {
                    sortedOptions.sort((a, b) => compareValues(a.type, b.type, sortOrder));
				} else if (sortBy === 'dateOpened') {
					sortedOptions.sort((a, b) => compareValues(new Date(a.date_opened), new Date(b.date_opened), sortOrder));
				} else if (sortBy === 'dateExpiry') {
					sortedOptions.sort((a, b) => compareValues(new Date(a.date_of_expiry), new Date(b.date_of_expiry), sortOrder));
				} else if (sortBy === 'return') {
                    sortedOptions.sort((a, b) => compareValues(a.option_return, b.option_return, sortOrder));
                } else if (sortBy === 'arr') {
                    sortedOptions.sort((a, b) => compareValues(a.option_arr, b.option_arr, sortOrder));
                }
                setOptions(sortedOptions);
            })
            .catch(error => console.error('Error fetching options:', error));
    }, [sortBy, sortOrder]);

	var handleDaysToExpiry = function(date_of_expiry) {
		if (hasDatePassed(date_of_expiry)) {
			return -1;
		}
		const curr_date = getCurrentDate();
		return getNumberDays(curr_date, date_of_expiry);
	};

	// Function to compare two values based on sort order
	const compareValues = (value1, value2, sortOrder) => {
		if (sortOrder === 'asc') {
			return value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
		} else {
			return value1 > value2 ? -1 : value1 < value2 ? 1 : 0;
		}
	};

	const handleSortBy = (value) => {
        if (value === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortOrder('asc');
            setSortBy(value);
        }
    };
	
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
		<div>
		<NavBar />
		<div className="d-flex justify-content-center align-items-center vh-300">
		<div className="container">
		<h1 className="text-center mb-4">All Open Options</h1>
		<div className="table-responsive">
		<div className="row">
		<div className="col">
		<table className="table table-striped text-center">
		<thead>
		<tr>
		<th scope="col" className="table-header">
			Symbol
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('symbol')}>
				{sortBy === 'symbol' && sortOrder === 'asc' && <i className="fas fa-arrow-up"></i>}
				{sortBy === 'symbol' && sortOrder === 'desc' && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'symbol' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">
			Strike Price
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('strike_price')}>
				{sortBy === 'strike_price' && sortOrder === 'asc' && <i className="fas fa-arrow-up"></i>}
				{sortBy === 'strike_price' && sortOrder === 'desc' && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'strike_price' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">
			Premium
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('premium')}>
				{sortBy === 'premium' && sortOrder === 'asc' && <i className="fas fa-arrow-up"></i>}
				{sortBy === 'premium' && sortOrder === 'desc' && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'premium' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">
			Collateral
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('collateral')}>
				{sortBy === 'collateral' && sortOrder === 'asc' && <i className="fas fa-arrow-up"></i>}
				{sortBy === 'collateral' && sortOrder === 'desc' && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'collateral' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">
			Option Type
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('option_type')}>
				{sortBy === 'option_type' && sortOrder === 'asc' && <i className="fas fa-arrow-up"></i>}
				{sortBy === 'option_type' && sortOrder === 'desc' && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'option_type' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">
			Date Opened
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('dateOpened')}>
				{(sortBy === 'dateOpened' && sortOrder === 'asc') && <i className="fas fa-arrow-up"></i>}
				{(sortBy === 'dateOpened' && sortOrder === 'desc') && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'return' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">
			Date of Expiry
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('dateExpiry')}>
				{(sortBy === 'dateExpiry' && sortOrder === 'asc') && <i className="fas fa-arrow-up"></i>}
				{(sortBy === 'dateExpiry' && sortOrder === 'desc') && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'return' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">Days to Expiry</th>
		<th scope="col" className="table-header">
			Return
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('return')}>
				{sortBy === 'return' && sortOrder === 'asc' && <i className="fas fa-arrow-up"></i>}
				{sortBy === 'return' && sortOrder === 'desc' && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'return' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">
			ARR
			<button className="btn btn-link arrow-button" onClick={() => handleSortBy('arr')}>
				{sortBy === 'arr' && sortOrder === 'asc' && <i className="fas fa-arrow-up"></i>}
				{sortBy === 'arr' && sortOrder === 'desc' && <i className="fas fa-arrow-down"></i>}
				{sortBy !== 'arr' && <i className="fas fa-arrow-up invisible"></i>}
			</button>
		</th>
		<th scope="col" className="table-header">Actions</th>
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
			<td>{formatDate(option.date_opened)}</td>
			<td>{formatDate(option.date_of_expiry)}</td>
			<td>{handleDaysToExpiry(option.date_of_expiry)}</td>
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
		</div>
		<Footer />
		<div style={{ minHeight: '100px' }}></div>
		</div>
		);
	};
		
export default OpenOptionsList;
		