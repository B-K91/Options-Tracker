import React from 'react';
import { Link } from 'react-router-dom';
import OpenOptionsList from './OpenOptionsList';
import ClosedOptionsList from './ClosedOptionsList';
import EditOptionForm from './EditOptionForm';
//import OptionsCalculator from './OptionsCalculator';

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      {/*
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Options Tracker</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/open-options">Open Options</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/closed-options">Closed Options</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-option">Add Option</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/options-calculator">Options Calculator</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/performance">Performance</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      */}

      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          {/* Open Options Section */}
          <div className="col-md-6">
            <h2>Open Options</h2>
            <OpenOptionsList />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
