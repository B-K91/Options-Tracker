/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Footer = () => {
  return (
    <footer className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom">
      <div className="container">
        <div className="row w-100 text-center">
          <div className="col-md-6">
            <ul className="navbar-nav me-auto list-inline mb-0">
               <li className="nav-item list-inline-item">
                <a href="#" className="nav-link ms-3">&copy; 2024 Options Tracker Inc</a>
              </li>
            </ul>
          </div>
          <div className="col-md-6 text-end">
            <ul className="navbar-nav me-auto list-inline mb-0">
              <li className="nav-item list-inline-item">
                <a href="#" className="nav-link ms-3">Privacy Policy</a>
              </li>
              <li className="nav-item list-inline-item">
                <a href="#" className="nav-link ms-3">Terms of Service</a>
              </li>
              <li className="nav-item list-inline-item">
                <a href="https://www.linkedin.com/in/abhishekbhave26/" className="nav-link ms-3">Contact Me</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
