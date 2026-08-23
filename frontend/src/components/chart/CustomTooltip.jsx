import React from 'react';

const CustomTooltip = (props) => {
  if (props.active && props.payload && props.payload.length) {
    const forecast = props.payload.find(p => p.dataKey === 'future_prediction');
    const actual = props.payload.find(p => p.dataKey === 'actual_price');
    const backtest = props.payload.find(p => p.dataKey === 'predicted_price');
    const ciUpper = props.payload.find(p => p.dataKey === 'ci_upper');
    const ciLower = props.payload.find(p => p.dataKey === 'ci_lower');

    return (
      <div className="custom-tooltip">
        {forecast ? (
          <>
            <div className="tooltip-header">7-Day Forecast</div>
            <div className="tooltip-main">
              {props.label} : <strong>${forecast.value.toFixed(2)}</strong>
            </div>
            <div className="tooltip-sub">ci_upper : ${ciUpper ? ciUpper.value.toFixed(2) : '---'}</div>
            <div className="tooltip-sub">ci_lower : ${ciLower ? ciLower.value.toFixed(2) : '---'}</div>
          </>
        ) : (
          <>
            <div className="tooltip-main border-bottom">{props.label}</div>
            {actual && <div className="tooltip-actual">Actual : ${actual.value.toFixed(2)}</div>}
            {backtest && <div className="tooltip-backtest">Backtest : ${backtest.value.toFixed(2)}</div>}
          </>
        )}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;