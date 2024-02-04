import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { RadialChart, XYPlot, VerticalBarSeries, XAxis, YAxis, ChartLabel } from 'react-vis';
import 'react-vis/dist/style.css';
import Footer from './Footer';

const Performance = () => {
  const [closedOptions, setClosedOptions] = useState([]);
  const [monthlyPerformance, setMonthlyPerformance] = useState({});
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
  
    options.forEach((option) => {
      // Extract month and year from the date
      const date = new Date(option.date_closed); // Assuming date_closed is the relevant date
      const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
  
      // Initialize the month if not present
      if (!monthlyData[monthYearKey]) {
        monthlyData[monthYearKey] = 0;
      }
  
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

  const renderBarGraph = () => {
    const data = Object.keys(monthlyData).map((key) => ({
      x: key,
      y: monthlyData[key],
    }));
  
    return (
      <XYPlot xType="ordinal" width={150} height={400} margin={{ bottom: 70 }}>
        <VerticalBarSeries data={data} />
        <XAxis tickLabelAngle={-45} tickFormat={(v) => v.split('-').join('/')} />
        <YAxis />
        <ChartLabel
          text="Months"
          className="alt-x-label"
          includeMargin={false}
          xPercent={0.5}
          yPercent={1.15}
        />
        <ChartLabel
          text="Realized Gain/Loss"
          className="alt-y-label"
          includeMargin={false}
          xPercent={-0.15}
          yPercent={0.5}
          style={{
            transform: 'rotate(-90)',
            textAnchor: 'end',
          }}
        />
      </XYPlot>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <div className="row mt-4">
          <div className="col-md-9">
            <h4>Monthly Performance</h4>
            {renderBarGraph()}
          </div>
          <div className="col-md-3">
            <h4>Stock Performance</h4>
            {renderPieChart()}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <h4>Biggest Winner</h4>
            {/* Render information about the biggest winner */}
            {/* Access the details from biggestWinner object */}
            {biggestWinner && (
              <p>{`Symbol: ${biggestWinner.symbol}, Gain/Loss: ${biggestWinner.realized_gain_loss}`}</p>
            )}
            <h4>Biggest Loser</h4>
            {/* Render information about the biggest loser */}
            {/* Access the details from biggestLoser object */}
            {biggestLoser && (
              <p>{`Symbol: ${biggestLoser.symbol}, Gain/Loss: ${biggestLoser.realized_gain_loss}`}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Performance;
