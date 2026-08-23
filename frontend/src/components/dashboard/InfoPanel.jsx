import React from 'react';

const InfoPanel = (props) => {
  return (
    <div className="info-panel">
      <div className="panel-header">{props.title}</div>
      {props.children}
    </div>
  );
};
export default InfoPanel;

