import React, { useState } from 'react';
import NavBar from './NavBar';
import { getOptionReturn, getOptionARRReturn } from '../utils/calculator_utility';

const OptionsReturnCalculator = () => {
  const [premium, setPremium] = useState('');
  const [collateral, setCollateral] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [returnPercentage, setReturnPercentage] = useState(null);
  const [arr, setArr] = useState(null);

  const calculateReturns = () => {
    if (isNaN(premium) || isNaN(collateral)) {
      alert('Please enter valid numbers for Premium and Collateral.');
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select valid start and end dates.');
      return;
    }

    setReturnPercentage(getOptionReturn(premium, collateral));
    setArr(getOptionARRReturn(startDate, endDate, premium, collateral));
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
            className="form-control"
            id="premium"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="collateral" className="form-label">Collateral:</label>
          <input
            type="number"
            className="form-control"
            id="collateral"
            value={collateral}
            onChange={(e) => setCollateral(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3 text-center">
        <div className="col-md-6">
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="endDate" className="form-label">End Date:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12 d-flex justify-content-center">
        <button className="btn btn-primary" onClick={calculateReturns}>Calculate Returns</button>
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
    </div>
  );
};

export default OptionsReturnCalculator;
