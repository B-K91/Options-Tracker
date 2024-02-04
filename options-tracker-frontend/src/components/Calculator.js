import React, { useState } from 'react';
import NavBar from './NavBar';
import { getOptionReturn, getOptionARRReturn } from '../utils/calculator_utility';
import Footer from './Footer';

const OptionsReturnCalculator = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    premium: '',
    collateral: '',
  });

  const [validation, setValidation] = useState({
    startDate: true,
    endDate: true,
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

  const [returnPercentage, setReturnPercentage] = useState(null);
  const [arr, setArr] = useState(null);

  const calculateReturns = () => {
    const isValid = Object.values(validation).every((isValid) => isValid);
    if (!isValid) {
      console.log('Form is invalid. Please fill in all required fields.');
      return;
    }

    setReturnPercentage(getOptionReturn(formData.premium, formData.collateral));
    setArr(getOptionARRReturn(formData.startDate, formData.endDate, formData.premium, formData.collateral));
  };

  return (
    <div>
    <NavBar />
    <div className="d-flex justify-content-center">
    <div className="container mt-4">
      <h2 className="text-center mb-4">Options Return Calculator</h2>
      <div className="row mb-3 text-center">
        <div className="col-md-6">
          <label htmlFor="premium" className="form-label">Premium:</label>
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
          <label htmlFor="collateral" className="form-label">Collateral:</label>
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
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input
            type="date"
            className={`form-control ${validation.startDate ? '' : 'is-invalid'}`}
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {!validation.startDate && (
            <div className="invalid-feedback">Start Date is required.</div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="endDate" className="form-label">End Date:</label>
          <input
            type="date"
            className={`form-control ${validation.endDate ? '' : 'is-invalid'}`}
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {!validation.endDate && (
            <div className="invalid-feedback">End Date is required.</div>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={calculateReturns}>Calculate Returns</button>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <button type="button" className="btn btn-primary" onClick={() => setFormData({ startDate: '', endDate: '', premium: '', collateral: '' })}>Clear Form</button>
        </div>
      </div>
      <div className="row mb-3">
      {returnPercentage !== null && arr !== null && (
        <div className="mt-12 mb-6 text-center">
          <p><strong>Return Percentage:</strong> {returnPercentage}%</p>
          <p><strong>Annualized Return (ARR):</strong> {arr}%</p>
        </div>
      )}
      </div>
    </div>
    </div>
    <Footer />
    </div>
  );
};

export default OptionsReturnCalculator;
