import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { getCurrentDate } from '../utils/date_utility'

const AddOptionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symbol: '',
    strike_price: '',
    date_opened: getCurrentDate(),
    date_of_expiry: '',
    type: 'Buy Call',
    premium: '',
    collateral: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/option/add`, formData)
      .then(response => {
        console.log('Option added successfully!');
        // Redirect to OptionsList
        navigate('/');
      })
      .catch(error => console.error('Error updating option:', error));
  };

  return (
    <div>
		 <NavBar />
     <div className="d-flex justify-content-center align-items-center vh-300">
      <form onSubmit={handleSubmit} className="w-50">
        <h1 className="text-center mb-4">Add Option</h1>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="symbol" className="form-label">Symbol</label>
            <input
              type="text"
              className="form-control"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="strike_price" className="form-label">Strike Price</label>
            <input
              type="number"
              className="form-control"
              id="strike_price"
              name="strike_price"
              value={formData.strike_price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="date_opened" className="form-label">Date Opened</label>
            <input
              type="date"
              className="form-control"
              id="date_opened"
              name="date_opened"
              value={formData.date_opened}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="date_of_expiry" className="form-label">Date of Expiry</label>
            <input
              type="date"
              className="form-control"
              id="date_of_expiry"
              name="date_of_expiry"
              value={formData.date_of_expiry}
              onChange={handleInputChange}
            />
          </div>

        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="premium" className="form-label">Premium</label>
            <input
              type="number"
              className="form-control"
              id="premium"
              name="premium"
              value={formData.premium}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="collateral" className="form-label">Collateral</label>
            <input
              type="number"
              className="form-control"
              id="collateral"
              name="collateral"
              value={formData.collateral}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="type" className="form-label">Option Type</label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
            <option value="Buy Call">Buy Call</option>
            <option value="Buy Put">Buy Put</option>
            <option value="Cash Secured Put">Cash Secured Put</option>
            <option value="Covered Call">Covered Call</option>
            <option value="Put Credit Spread">Put Credit Spread</option>
            <option value="Call Credit Spread">Call Credit Spread</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <button type="cancel" className="btn btn-primary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddOptionForm;
