import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import CustomTooltip from './CustomTooltip';

const Chartwork = (props) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={props.history} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis dataKey="date" stroke="#888" tick={{fontSize: 12}} />
          <YAxis domain={['auto', 'auto']} stroke="#888" tick={{fontSize: 12}} tickFormatter={(v) => `$${v}`} />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#444', strokeWidth: 1, strokeDasharray: '3 3' }} />
          
          <Brush dataKey="date" height={25} stroke="#333" fill="#151515" travellerWidth={10} />
          
          <Area type="Linear" dataKey="ci_upper" stroke="none" fill="#bb86fc" fillOpacity={0.15} activeDot={false} />
          <Area type="Linear" dataKey="ci_lower" stroke="none" fill="#0f0f0f" fillOpacity={1} activeDot={false} />
          <Line type="Linear" dataKey="actual_price" stroke="#03dac6" strokeWidth={2} dot={false} name="Actual" />
          <Line type="Linear" dataKey="predicted_price" stroke="#bb86fc" strokeWidth={1} strokeDasharray="3 3" dot={false} name="Backtest" />
          <Line 
            type="Linear" 
            dataKey="future_prediction" 
            stroke={props.is_positive ? "#03dac6" : "#ff5252"} 
            strokeWidth={3} 
            dot={true} 
            name="7-Day Forecast" 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chartwork;