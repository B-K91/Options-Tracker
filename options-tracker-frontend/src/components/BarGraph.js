import React, { useState } from 'react';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, ChartLabel, Hint } from 'react-vis';

const RenderBarGraph = ({ monthlyData }) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  const data = Object.keys(monthlyData).map((key) => ({
    x: key,
    y: monthlyData[key],
  }));

  return (
    <div>
      <XYPlot xType="ordinal" width={1200} height={400} margin={{ bottom: 70 }}>
        <VerticalBarSeries
          data={data}
          onValueMouseOver={(v) => setHoveredBar(v)}
          onValueMouseOut={() => setHoveredBar(null)}
        />
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
        {hoveredBar && (
          <Hint value={hoveredBar}>
            <div style={{ background: 'white', padding: '10px', border: '1px solid #ddd' }}>
              {`Month: ${hoveredBar.x}`}
              <br />
              {`Value: ${hoveredBar.y}`}
            </div>
          </Hint>
        )}
      </XYPlot>
    </div>
  );
};

export default RenderBarGraph;
