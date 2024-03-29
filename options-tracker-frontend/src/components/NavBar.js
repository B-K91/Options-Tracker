import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
            <Link className="navbar-brand" to="/open">Options Tracker</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link className="nav-link ms-3" to="/open">Open Options</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link ms-3" to="/closed">Closed Options</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link ms-3" to="/add">Add Option</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link ms-3" to="/calculator">Options Calculator</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link ms-3" to="/performance">Performance</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
		);
	};
		
export default NavBar;
