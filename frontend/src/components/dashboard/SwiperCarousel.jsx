import React, { useEffect } from 'react';

const SwiperCarousel = ( props) => {

  useEffect(() => {
    const { Swiper } = window;

    if (Swiper) {
      new Swiper('.swiper', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: { delay: 3000, disableOnInteraction: false},
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        // breakpoints: {
        //   768: { slidesPerView: 2 },
        //   1024: { slidesPerView: 4 }
        // }
      });
    }

  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div id="full-return-div-for-swiper">

      <div id="asteriskbox">
        <img src="/8spookasterisk.png" alt="" />
      </div>

      <div id="swiper-box">

        <p className="popular-title">Forecast price for popular stocks:</p>

        <div className="wrapallswipers">
          <div className="swiper stockdiv">
            <div className="swiper-wrapper">

              <div className="swiper-slide" onClick={() => { props.setTicker('MSFT'); props.handleRunPipeline('MSFT'); }}>
                
                <div className="company">
                    <div><img src="/msft.jpg" alt="MSFT" /></div>
                    <div className="companydes">
                        <p className="ticker-sym">MSFT</p>
                        <p className="company-name">Microsoft Corp.</p>
                    </div>
                </div>

              </div>

              <div className="swiper-slide" onClick={() => { props.setTicker('CRM'); props.handleRunPipeline('CRM'); }}>
                
                <div className="company">
                    <div><img src="/salesforce.jpg" alt="CRM" /></div>
                    <div className="companydes">
                        <p className="ticker-sym">CRM</p>
                        <p className="company-name">Salesforce Inc.</p>
                    </div>
                </div>

              </div>
              <div className="swiper-slide" onClick={() => { props.setTicker('JPM'); props.handleRunPipeline('JPM'); }}>
                
                <div className="company">
                    <div><img src="/jpmorgan.jpg" alt="JPM" /></div>
                    <div className="companydes">
                        <p className="ticker-sym">JPM</p>
                        <p className="company-name">JPMorgan Chase</p>
                    </div>
                </div>

              </div>

            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-pagination"></div>
          </div> 

          <div className="swiper stockdiv">
            <div className="swiper-wrapper">

            <div className="swiper-slide" onClick={() => { props.setTicker('AMZN'); props.handleRunPipeline('AMZN'); }}>
                
                <div className="company">
                    <div><img src="/amazon.jpg" alt="AMZN"/></div>
                    <div className="companydes">
                        <p className="ticker-sym">AMZN</p>
                        <p className="company-name">Amazon.com, Inc.</p>
                    </div>
                </div>

              </div>

              <div className="swiper-slide" onClick={() => { props.setTicker('GS'); props.handleRunPipeline('GS'); }}>
                
                <div className="company">
                    <div><img src="/gs.jpg" alt="GS"/></div>
                    <div className="companydes">
                        <p className="ticker-sym">GS</p>
                        <p className="company-name">Goldman Sachs Group Inc.</p>
                    </div>
                </div>

              </div>

            
              
              <div className="swiper-slide" onClick={() => { props.setTicker('AXP'); props.handleRunPipeline('AXP'); }}>
                
                <div className="company">
                    <div><img src="/amex.jpg" alt="AXP" /> </div>
                    <div className="companydes">
                        <p className="ticker-sym">AXP</p>
                        <p className="company-name">American Express Co.</p>
                    </div>
                </div>

              </div>

            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-pagination"></div>
          </div> 

          <div className="swiper stockdiv">
            <div className="swiper-wrapper">

              <div className="swiper-slide" onClick={() => { props.setTicker('TSLA'); props.handleRunPipeline('TSLA'); }}>
                
                <div className="company">
                    <div><img src="/tesla.jpg" alt="TSLA"/></div>
                    <div className="companydes">
                        <p className="ticker-sym">TSLA</p>
                        <p className="company-name">Tesla, Inc.</p>
                    </div>
                </div>

              </div>

              <div className="swiper-slide" onClick={() => { props.setTicker("GOOGL"); props.handleRunPipeline('GOOGL'); }}>
                
                <div className="company">
                    <div><img src="/google.jpg" alt="GOOGL" /></div>
                    <div className="companydes">
                        <p className="ticker-sym">GOOGL</p>
                        <p className="company-name">Alphabet Inc.</p>
                    </div>
                </div>

              </div>

              <div className="swiper-slide" onClick={() => { props.setTicker("WMT"); props.handleRunPipeline('WMT'); }}>
                
                <div className="company">
                    <div><img src="/walmart.jpg" alt="WMT" /></div>
                    <div className="companydes">
                        <p className="ticker-sym">WMT</p>
                        <p className="company-name">Walmart</p>
                    </div>
                </div>

              </div>

            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-pagination"></div>
          </div> 
        </div>
      </div>


    </div>
  );
};

export default SwiperCarousel;