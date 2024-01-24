import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import OpenOptionsList from './OpenOptionsList';
import ClosedOptionsList from './ClosedOptionsList';
import EditOptionForm from './EditOptionForm';
//import OptionsCalculator from './OptionsCalculator';

const Home = () => {
  return (
    <div>
      <div>
        <NavBar />
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <h2>Open Options</h2>
              <OpenOptionsList />
            </div>
          </div>
        </div>
      </div>
	</div>
  );
};

export default Home;
