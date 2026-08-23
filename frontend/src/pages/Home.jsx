import React, { useState, useEffect, useRef } from 'react';
import '../App.css';


import SwiperCarousel from '../components/dashboard/SwiperCarousel';
import KpiCard from '../components/dashboard/KpiCard';
import InfoPanel from '../components/dashboard/InfoPanel';
import NewsPanel from '../components/dashboard/NewsPanel';
import Chartwork from '../components/chart/ForecastChart';
import fetchStockPrediction from '../services/api';

const Home = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);
  
  const welcomeRef = useRef(null);

  useEffect(() => {
    let t1, t2, t3;
    if (loading) {
      setLoadingStep(0);
      t1 = setTimeout(() => setLoadingStep(1), 600);
      t2 = setTimeout(() => setLoadingStep(2), 1200);
      t3 = setTimeout(() => setLoadingStep(3), 1800);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [loading]);

  useEffect(() => {
    const { gsap } = window;
    
    if (gsap && welcomeRef.current) {
      let ctx = gsap.context(() => {

        let hero_tl = gsap.timeline();

        hero_tl.from(".textonhero>p:nth-child(1)", {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0 
        })
        hero_tl.from(".textonhero>p:nth-child(2)", {
            y: -20,
            opacity: 0,
            duration: 1,
            delay: -0.5 
        })

        hero_tl.from(".textonhero>p:nth-child(3)", {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: -0.5
        });
        

        gsap.from(".textonhero", {
            x: -60,
            opacity: 0,
            duration: 1.5,
            delay: 0 
        });

        gsap.fromTo(".vectors > div:nth-child(1)", 
          { width: "20%", opacity: 0 }, 
          { width: "90%", opacity: 1, duration: 1.5, delay: 0 }
        );

        gsap.from(".vectors>div:nth-child(2)", { 
            opacity: 0,
            duration: 1,
            delay: 0 
        });

        gsap.from("#hero-input-group", { 
            opacity: 0,
            duration: 1,
            delay: 0
        });
        
        gsap.from("#swiper-box", { 
            y: 10,
            opacity: 0,
            duration: 1,
            delay: 0
        });


      }, welcomeRef); 

      return () => ctx.revert();
    }
  }, [data, loading, error]);

  const handleRunPipeline = async (overrideTicker = null) => {
    const targetTicker = overrideTicker || ticker;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchStockPrediction(targetTicker);
      setLoadingStep(4);
      setTimeout(() => {
        setData(result);
        setLoading(false);
      }, 500); 
    } catch (err) {
      setError("Failed to fetch prediction. Is your FastAPI server running?");
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!data) return;
    const headers = "Date,Actual_Price,Predicted_Price,Upper_CI,Lower_CI\n";
    const rows = data.history.map(r => 
      `${r.date},${r.actual_price || ''},${r.future_prediction || r.predicted_price || ''},${r.ci_upper || ''},${r.ci_lower || ''}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.ticker}_AI_Forecast.csv`;
    a.click();
  };

  return (
    <div className="home-page-container" ref={welcomeRef}>
      
      <div className="dashboard-content">
        {error && <div className="error">{error}</div>}

        {/* --- INITIAL RENDER / HERO SCREEN --- */}
        {!data && !loading && !error && (
          <div className="welcome-container">
            <div className="hero">
              <div className="textonhero">
                <p>NeuralStock AI</p>
                <p>Intelligent Financial Forecasting Platform</p>
                <p>
                  LSTM-powered stock forecasting using historical market data and technical indicators to predict seven-day price trends.
                </p>

                <div className="vectors">
                  <div></div>
                  <div><img src="/whiteaistars.png" alt="" /></div>
                </div>

                <div id="hero-input-group">
                  <p className="enterticker">Enter Stock Ticker:</p>
                  <div className="inputs">
                    <input 
                      id="heroinput"
                      type="text" 
                      value={ticker}
                      onChange={(e) => setTicker(e.target.value.toUpperCase())}
                      placeholder="ENTER TICKER (E.G. AAPL)"
                    />
                    <button id="herobuton" onClick={() => handleRunPipeline()}>
                      FORECAST PRICE
                    </button>
                  </div>
                </div>
              </div>
              
              <SwiperCarousel setTicker={setTicker} handleRunPipeline={handleRunPipeline} />
            </div>
          </div>
        )}

        {/* --- LOADING SCREEN --- */}
        {loading && (
          <div className="loading-top-container">
            <div className="loading-container">
              <h3>Initializing AI Pipeline...</h3>
              <ul className="loading-list">
                <li className={loadingStep >= 0 ? "active" : ""}>Downloading Data {loadingStep >= 1 && "✔"}</li>
                <li className={loadingStep >= 1 ? "active" : ""}>Feature Engineering {loadingStep >= 2 && "✔"}</li>
                <li className={loadingStep >= 2 ? "active" : ""}>Normalization {loadingStep >= 3 && "✔"}</li>
                <li className={loadingStep >= 3 ? "active" : ""}>LSTM Prediction {loadingStep >= 4 && "✔"}</li>
              </ul>
            </div>
          </div>
        )}

        {/* --- DASHBOARD / PREDICTION RESULT SCREEN --- */}
        {data && !loading && (

          <div className="supreme-box">

            <div className="first-row-box">
              <div className="first-row-container">
                <InfoPanel title="Company Profile">
                  <div className="company-name">{data.company.name}</div>
                  <div className="company-sub">{data.company.exchange} • {data.company.sector}</div>
                  
                  <div className="dashboard-search">
                    <input 
                      type="text" 
                      value={ticker} 
                      onChange={(e) => setTicker(e.target.value.toUpperCase())}
                      placeholder="NEW TICKER"
                    />
                    <button onClick={() => handleRunPipeline()}>FORECAST PRICE</button>
                  </div>
                </InfoPanel>

                <InfoPanel title="Mini Stock Summary">
                  <div className="summary-grid">
                    <div><span>Current:</span> ${data.summary.current}</div>
                    <div><span>Open:</span> ${data.summary.open}</div>
                    <div><span>High:</span> ${data.summary.high}</div>
                    <div><span>Low:</span> ${data.summary.low}</div>
                    <div><span>Volume:</span> {(data.summary.volume / 1000000).toFixed(1)}M</div>
                  </div>
                </InfoPanel>

                <InfoPanel title="Model Settings">
                  <div className="summary-grid">
                    <div><span>Window:</span> {data.model_settings.window} Days</div>
                    <div><span>Features:</span> {data.model_settings.features}</div>
                    <div><span>Epochs:</span> {data.model_settings.epochs}</div>
                    <div><span>Optimizer:</span> {data.model_settings.optimizer}</div>
                  </div>
                </InfoPanel>
              </div>
            </div>

            <div className="second-row-container">
              <div className="title">
                AI Prediction & Performance Metrics
              </div>
              <div className="kpi-grid inner-grid">
                <KpiCard 
                  title="AI SIGNAL (7-Day)" 
                  value={data.signal} 
                  subtext={<span>Proj Return: <span className={data.is_positive ? 'green-text' : 'red-text'}>{data.expected_return > 0 ? '+' : ''}{data.expected_return}%</span></span>}
                  highlight={true} 
                  valueClass={data.is_positive ? 'green' : 'red'} 
                />
                <KpiCard 
                  title="Dir. Accuracy" 
                  value={`${data.metrics.dir_acc}%`} 
                  subtext="Trend correctly predicted" 
                  highlight={false} 
                />
                <KpiCard 
                  title="Error Margin (MAPE)" 
                  value={`${data.metrics.mape}%`} 
                  subtext="Avg price variance" 
                  highlight={false} 
                />
                <KpiCard 
                  title="R² Score" 
                  value={data.metrics.r2} 
                  subtext="Model fit quality" 
                  highlight={false} 
                />
              </div>
            </div>

              
            <div className="chart-wrapper">
              <div className="chart-header">
                <h2>Forecasting Engine Visualization</h2>
                <button className="export-btn" onClick={handleExportCSV}>Export to CSV</button>
              </div>
              <Chartwork history={data.history} is_positive={data.is_positive} />
            </div>

            <NewsPanel news={data.news} ticker={data.ticker} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;