import React, { useEffect, useRef } from 'react';
import '../App.css';

const AboutUs = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const { gsap } = window;
    
    if (gsap && aboutRef.current) {
      let ctx = gsap.context(() => {
        
        gsap.from("#aboutcontent>div:nth-child(1) img",{
            y:-30,
            duration:1.2,
            delay:0.1,
            opacity:0,
        })
    
        let aboutcontent_tl = gsap.timeline();
    
        aboutcontent_tl.from("#aboutcontent .foranimationset0",{
            y:-20,
            duration:0.5,
            delay:0.15,
            opacity:0,
        })
        aboutcontent_tl.from("#aboutcontent .foranimationset1",{
            y:-20,
            opacity:0,
            duration:1,
            delay:-0.3,
            stagger:0.2
        })
        aboutcontent_tl.from("#aboutcontent .foranimationset2",{
            y:20,
            opacity:0,
            duration:1,
            delay:-0.5
        })

        gsap.from("#appdemo",{
            x:625,
            y:-360,
            scale:0.2,
            duration:3,
            delay:0,
            ease: "none",
            scrollTrigger:{
                trigger:"#appvideo video",
                scroller:"body",
                markers:false,
                start:"top 84%",
                end:"top 60%",
                scrub:2
            }   
        })
        
    
        gsap.from("#downloadappbox",{
        x:-300,
        duration:2,
        delay:0,
        opacity:0,
        scrollTrigger:{
            trigger:"#appdemo",
            scroller:"body",
            markers:false,
            start:"top 69%",
            end:"top 50%",
            scrub:2
        }
        })

      }, aboutRef); 

      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={aboutRef}>
      <section id="aboutusheader">
        <div>#KNOW US</div>
      </section>

      <section id="aboutcontent">
        <div>
          <div>
            <img src="/nsbuilding.png" alt="NeuralStock Headquarters" />
          </div>
        </div>

        <div>
          <p className="foranimationset0">Who We Are?</p>
          <p className="foranimationset1">
            NeuralStock AI is an intelligent financial forecasting platform that applies deep learning to historical financial market data.
          </p>
          <p className="foranimationset1">
            By combining technical indicators, market features, and sequential price patterns, the platform uses LSTM-based modeling to learn temporal relationships within market data and generate seven-day forward stock price forecasts.
          </p>
          <p className="foranimationset2">
            It provides users with an accessible view of AI-driven predictions, supporting data, and forecast confidence.
          </p>

          <marquee loop="-1" scrollamount="7" behavior="" direction="">
            ✨ NeuralStock AI is live! Featuring 60-day sequence modeling, multi-feature technical analysis, seven-day price forecasting, historical backtesting, and financial news aggregation.
          </marquee>
        </div>
      </section>

      <section id="aboutcontent2">

        <div className="about-info-segment">
            <div>Data Processing & Feature Engineering</div>
            <p>
            NeuralStock AI retrieves historical market data including Open, High, Low, Close, and Volume, and derives technical indicators such as SMA, EMA, RSI, MACD, and Bollinger Bands. Additional features including daily returns, price variation, and volume changes are normalized and organized into 60-day sequences for the forecasting model.
            </p>
        </div>

        <div className="about-info-segment">
            <div>LSTM Forecasting Engine</div>
            <p>
            At the core of NeuralStock AI is a two-layer LSTM network with 64 hidden units and 0.2 dropout, implemented using PyTorch. The model learns temporal patterns from 60 consecutive trading days and generates a seven-day future price trajectory. It is trained using historical data with MSE loss, Adam optimization, validation monitoring, and early stopping.
            </p>
        </div>

        <div className="about-info-segment">
            <div>Evaluation, Confidence & Market Insights</div>
            <p>
            NeuralStock AI evaluates its forecasts through historical backtesting using RMSE, MAE, MAPE, R², and directional accuracy. It also generates confidence ranges from historical prediction errors and converts forecasted price movement into interpretable Strong Buy, Buy, Hold, Sell, or Strong Sell signals, alongside technical indicators and recent financial news.
            </p>
        </div>
        
        



      </section>
      
    </div>
  );
};

export default AboutUs;