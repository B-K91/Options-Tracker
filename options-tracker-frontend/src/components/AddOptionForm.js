import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { getCurrentDate } from '../utils/date_utility'

const AddOptionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialFormData = location.state ? location.state.prepopulatedData : {
    symbol: '',
    strike_price: '',
    date_opened: getCurrentDate(),
    date_of_expiry: getCurrentDate(),
    type: 'Buy Call',
    premium: '',
    collateral: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const [validation, setValidation] = useState({
    symbol: true,
    strike_price: true,
    date_opened: true,
    date_of_expiry: true,
    premium: true,
    collateral: true,
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setValidation((prevValidation) => ({
      ...prevValidation,
      [name]: value.trim() !== '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.values(validation).every((isValid) => isValid);
    if (!isValid) {
      console.log('Form is invalid. Please fill in all required fields.');
      return;
    }

    axios.post(`http://localhost:3000/option/add`, formData)
      .then(response => {
        console.log('Option added successfully!');
        // Redirect to OptionsList
        navigate('/open');
      })
      .catch(error => console.error('Error updating option:', error));
  };

  return (
    <div>
		 <NavBar />
     <div className="d-flex justify-content-center align-items-center vh-300">
      <form onSubmit={handleSubmit} className="w-50">
        <h1 className="text-center mb-4">Add Option</h1>
        <div className="row mb-3 text-center">
          <div className="col-md-6">
            <label htmlFor="symbol" className="form-label">Symbol</label>
            <input
              type="text"
              className={`form-control ${validation.symbol ? '' : 'is-invalid'}`}
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {!validation.symbol && (
              <div className="invalid-feedback">Symbol is required.</div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="strike_price" className="form-label">Strike Price</label>
            <input
              type="number"
              className={`form-control ${validation.strike_price ? '' : 'is-invalid'}`}
              id="strike_price"
              name="strike_price"
              value={formData.strike_price}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {!validation.strike_price && (
              <div className="invalid-feedback">Strike Price is required.</div>
            )}
          </div>
        </div>

        <div className="row mb-3 text-center">
          <div className="col-md-6">
            <label htmlFor="date_opened" className="form-label">Date Opened</label>
            <input
              type="date"
              className={`form-control ${validation.date_opened ? '' : 'is-invalid'}`}
              id="date_opened"
              name="date_opened"
              value={formData.date_opened}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {!validation.date_opened && (
              <div className="invalid-feedback">Date Opened is required.</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="date_of_expiry" className="form-label">Date of Expiry</label>
            <input
              type="date"
              className={`form-control ${validation.date_of_expiry ? '' : 'is-invalid'}`}
              id="date_of_expiry"
              name="date_of_expiry"
              value={formData.date_of_expiry}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {!validation.date_of_expiry && (
              <div className="invalid-feedback">Date of Expiry is required.</div>
            )}
          </div>
        </div>

        <div className="row mb-3 text-center">
          <div className="col-md-6">
            <label htmlFor="premium" className="form-label">Premium / Profit</label>
            <input
              type="number"
              className={`form-control ${validation.premium ? '' : 'is-invalid'}`}
              id="premium"
              name="premium"
              value={formData.premium}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {!validation.premium && (
              <div className="invalid-feedback">Premium is required.</div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="collateral" className="form-label">Option Collateral / Maximum Loss</label>
            <input
              type="number"
              className={`form-control ${validation.collateral ? '' : 'is-invalid'}`}
              id="collateral"
              name="collateral"
              value={formData.collateral}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {!validation.collateral && (
              <div className="invalid-feedback">Collateral is required.</div>
            )}
          </div>
        </div>

        <div className="row mb-3 text-center">
          <div className="col-md-6">
            <label htmlFor="type" className="form-label">Option Type</label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            >
            <option value="Buy Call">Buy Call</option>
            <option value="Buy Put">Buy Put</option>
            <option value="Cash Secured Put">Cash Secured Put</option>
            <option value="Covered Call">Covered Call</option>
            <option value="Put Credit Spread">Put Credit Spread</option>
            <option value="Call Credit Spread">Call Credit Spread</option>
            </select>
            {!validation.type && (
              <div className="invalid-feedback">Option Type is required.</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <button type="button" className="btn btn-primary" onClick={() => navigate('/open')}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <Footer />
    </div>
  );
};

export default AddOptionForm;
