import React, { useEffect, useRef } from 'react';
import '../App.css';

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    const { gsap } = window;
    
    if (gsap && contactRef.current) {
      let ctx = gsap.context(() => {

        gsap.from("#iframebox",{
          y:-40,
          duration:1.2,
          delay:0.15,
          opacity:0,
        })
      
        let aboutcontent_tl = gsap.timeline();
      
        aboutcontent_tl.from("#contactinformation>p:nth-child(1)",{
          y:-20,
          duration:0.5,
          delay:0.15,
          opacity:0,
        })
        aboutcontent_tl.from(".foranimset2",{
          y:-20,
          opacity:0,
          duration:0.7,
          delay:-0.3,
          stagger:0.2
        })
        aboutcontent_tl.from("#contactinformationtext>div",{
          y:20,
          opacity:0,
          duration:0.7,
          delay:-0.5
        })
        

      }, contactRef); 

      return () => ctx.revert(); 
    }
  }, []);

  return (
    <div ref={contactRef}>
      <section id="contactheader">
        <div>@CONTACT US</div>
      </section>

      <section id="reachusmain">
        <div id="contactinformation">
          <p>GET IN TOUCH...</p>
          <p className="foranimset2">Connect with our quantitative research team or get support today</p>
          <p className="foranimset2">Head Office:</p>

          <div id="contactinformationtext">
            <div>
              <div>
                <img src="/contactimgs/location.png" alt="Location Icon" />
              </div>
              <div>
                <div>Address:</div>
                <div>21st Avenue, Times Square, New York City</div>
              </div>
            </div>

            <div>
              <div>
                <img src="/contactimgs/callicon.jpg" alt="Phone Icon" />
              </div>
              <div>
                <div>Phone:</div>
                <div>+24 7768699333 / +24 7455366622</div>
              </div>
            </div>

            <div>
              <div>
                <img src="/contactimgs/finalhoursicon.png" alt="Hours Icon" />
              </div>
              <div>
                <div>Hours:</div>
                <div>11:00 to 19:00 Mon-Fri</div>
              </div>
            </div>
          </div>
          
        </div>

        <div id="iframebox">
          <iframe
            title="Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.18394901736!2d-73.98811752441128!3d40.75797873480029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sin!4v1758114063546!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;