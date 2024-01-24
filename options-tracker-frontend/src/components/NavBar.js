import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <Link className="navbar-brand" to="/">Options Tracker</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/open">Open Options</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/closed">Closed Options</Link>
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
		);
	};
		
export default NavBar;
