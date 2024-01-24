import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditOptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symbol: '',
    strike_price: '',
    date_opened: '',
    date_closed: '',
    date_of_expiry: '',
    type: '',
    premium: '',
    collateral: '',
    is_open: '',
    realized_gain_loss: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/option/${id}`)
      .then(response => {
        // Set formData with existing option data
        setFormData(response.data);
      })
      .catch(error => console.error('Error fetching option:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/option/update/${id}`, formData)
      .then(response => {
        console.log('Option updated successfully!');
        // Redirect to OptionsList
        navigate('/');
      })
      .catch(error => console.error('Error updating option:', error));
  };

  return (
    <div>
     <div className="d-flex justify-content-center align-items-center vh-300">
      <form onSubmit={handleSubmit} className="w-50">
        <h1 className="text-center mb-4">Edit Option</h1>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="symbol" className="form-label">Symbol</label>
            <input
              type="text"
              className="form-control"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              readOnly // Make the field read-only
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
              type="text"
              className="form-control"
              id="date_opened"
              name="date_opened"
              value={formData.date_opened}
              readOnly // Make the field read-only
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="date_closed" className="form-label">Date Closed</label>
            <input
              type="date"
              className="form-control"
              id="date_closed"
              name="date_closed"
              value={formData.date_closed}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
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
          <div className="col-md-6">
            <label htmlFor="type" className="form-label">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              value={formData.type}
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
            <label htmlFor="is_open" className="form-label">Is Open</label>
            <input
              type="radio"
              className="form-control"
              id="is_open"
              name="is_open"
              value={formData.is_open}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="realized_gain_loss" className="form-label">Realized Gain/Loss</label>
            <input
              type="number"
              className="form-control"
              id="realized_gain_loss"
              name="realized_gain_loss"
              value={formData.realized_gain_loss}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center vh-300">
        <button type="submit" className="btn btn-primary mb-6">Submit</button>
        <button type="cancel" className="btn btn-primary mb-6">Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditOptionForm;
