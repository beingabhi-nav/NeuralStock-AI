import React from 'react';

const KpiCard = (props) => {
  return (
    <div className={`kpi-card ${props.highlight ? 'highlight' : ''}`}>
      <div className="kpi-title">{props.title}</div>
      <div className={`kpi-value ${props.valueClass || ''}`}>
        {props.value}
      </div>
      <div className="kpi-sub">{props.subtext}</div>
    </div>
  );
};

export default KpiCard;