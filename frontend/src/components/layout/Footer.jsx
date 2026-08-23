import React from 'react';

const Footer = () => {
  return (
    <>
      <section id="footer">
        
        <div className="footercol">
          <div id="footercompanylogo">
              <div id="companyname">
                  <a href="/">NeuralStock AI</a>
              </div>
              <sup id="registeredmark">®</sup>
          </div>
          <div><span>Contact</span> </div>
          <div><span>Address:</span> 21st Avenue, Times Square, NYC</div>
          <div><span>Phone:</span> +24 7768699333</div>
          <div><span>Hours:</span> 11:00 to 19:00 Mon-Fri</div>
          <div><span>Follow Us</span></div>
          <div id="socialmediaicons">
                    
            <div>
                <a href="https://www.instagram.com"><img src="public/instalogo.png" alt=""/></a>
            </div>
            <div>
                <a href="https://www.facebook.com"><img src="public/fblogo.png" alt=""/></a>
            </div>
            <div>
                <a href="https://x.com"><img src="public/twitterlogo.png" alt=""/></a>
            </div>
            <div>
                <a href="https://www.pinterest.com"><img src="public/pinterestlogo.png" alt=""/></a>
            </div>
            <div>
                <a href="https://www.youtube.com"><img src="public/youtubelogo.png" alt=""/></a>
            </div>
          </div>    
        </div>
          
        <div className="footercol">
          <div><span>About</span></div>
          <div>About Us</div>
          <div>Model Architecture</div>
          <div>Privacy Policy</div>
          <div>Terms & Conditions</div>
          <div>Contact Us</div>
        </div>

        <div className="footercol">
          <div><span>My Account</span></div>
          <div>Sign In</div>
          <div>My Portfolio</div>
          <div>API Access</div>
          <div>Help</div>
        </div>

        <div className="footercol">
          <div><span>Install App</span></div>
          <div>From App Store or Google Play</div>
          <div id="wheretofindapp">
              <div><a href="#"><img src="public/getitongplay.jpg" alt="Play Store"/></a></div>
              <div><a href="#"><img src="public/getitonappstore.jpg" alt="App Store"/></a></div>
          </div>
        </div>
      </section>
      
      <div id="footerrow">
        © 2026 NeuralStock AI : Intelligent financial forecasting platform by ABHINAV.
        Icon Credits:
        <a href="https://www.flaticon.com/free-icons/clean" title="clean icons">Clean icons created by Good Ware - Flaticon</a>
        <a target="_blank" href="https://icons8.com/icon/8KyV9OMAYowJ/asterisk">Asterisk</a> icon by  <a target="_blank" href="https://icons8.com">Icons8</a>
      </div>
    </>
  );
};

export default Footer;