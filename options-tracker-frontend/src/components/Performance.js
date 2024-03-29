import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { RadialChart } from 'react-vis';
import 'react-vis/dist/style.css';
import Footer from './Footer';
import RenderBarGraph from './BarGraph';

const Performance = () => {
  const [, setClosedOptions] = useState([]);
  const [biggestWinner, setBiggestWinner] = useState(null);
  const [biggestLoser, setBiggestLoser] = useState(null);
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    // Fetch closed options data
    axios.get('http://localhost:3000/option/closed')
      .then(response => {
        setClosedOptions(response.data);
        calculateMonthlyPerformance(response.data);
        findBiggestWinnerAndLoser(response.data);
      })
      .catch(error => console.error('Error fetching closed options:', error));
  }, []);

  const calculateMonthlyPerformance = (options) => {
    const monthlyData = {};
    
    // Create an array of all months in the current year
    const monthsInYear = Array.from({ length: 12 }, (_, index) => {
      const monthNumber = index + 1;
      return `${monthNumber < 10 ? '0' : ''}${monthNumber}`;
    });
  
    monthsInYear.forEach((month) => {
      monthlyData[`${month}-${new Date().getFullYear()}`] = 0;
    });
  
    options.forEach((option) => {
      const date = new Date(option.date_closed); // Assuming date_closed is the relevant date
    
      // Ensure the month part is represented with two digits
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      
      const monthYearKey = `${month}-${date.getFullYear()}`;
      
      // Add realized gain/loss to the corresponding month
      monthlyData[monthYearKey] += option.realized_gain_loss;
    });    
  
    setMonthlyData(monthlyData);
  };

  const findBiggestWinnerAndLoser = (options) => {
    if (options.length === 0) {
      // Handle the case when there are no options
      return;
    }
  
    let biggestWinner = options[0];
    let biggestLoser = options[0];
  
    options.forEach((option) => {
      // Compare realized gain/loss values
      if (option.realized_gain_loss > biggestWinner.realized_gain_loss) {
        biggestWinner = option;
      }
  
      if (option.realized_gain_loss < biggestLoser.realized_gain_loss) {
        biggestLoser = option;
      }
    });
    if (biggestLoser.realized_gain_loss >= 0) {
      biggestLoser = null;
    }
  
    setBiggestWinner(biggestWinner);
    setBiggestLoser(biggestLoser);
  };

  const renderPieChart = () => {
    const data = [
      { angle: 90/* dynamically calculated Profit percentage */, label: 'Profit', color: '#36A2EB' },
      { angle: 90/* dynamically calculated Loss percentage */, label: 'Loss', color: '#FF6384' },
    ];
  
    return <RadialChart data={data} width={300} height={300} />;
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4 mb-3">
        <div className="row mt-4">
          <div className="col-md-12">
            <h4>Monthly Performance</h4>
            <RenderBarGraph monthlyData={monthlyData} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-3">
            <h4>Stock Performance</h4>
            {renderPieChart()}
          </div>
          <div className="col-md-3">
            <h4>Stock Performance</h4>
            {renderPieChart()}
          </div>
          <div className="col-md-3">
            <h4>Biggest Winner YTD</h4>
            <ul>
              { biggestWinner && ['symbol', 'strike_price', 'date_opened', 'date_closed', 'type', 'collateral', 'realized_gain_loss', 'option_return', 'option_arr'].map((key) => (
                <li key={key}>{`${key}: ${biggestWinner[key]}`}</li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Biggest Loser YTD</h4>
            <ul>
              { biggestLoser && ['symbol', 'strike_price', 'date_opened', 'date_closed', 'type', 'collateral', 'realized_gain_loss', 'option_return', 'option_arr'].map((key) => (
                <li key={key}>{`${key}: ${biggestLoser[key]}`}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
      <div style={{ minHeight: '100px' }}></div>
    </div>
  );
};

export default Performance;
