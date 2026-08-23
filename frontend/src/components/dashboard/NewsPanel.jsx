import React from 'react';

const NewsPanel = (props) => {
  if (!props.news || props.news.length === 0) return null;

  return (
    <div className="news-panel">
      <h3>Latest {props.ticker} Headlines</h3>
      <div className="news-grid">
        {props.news.map((item, idx) => (
          <a key={idx} href={item.link} target="_blank" rel="noreferrer" className="news-card">
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsPanel;