import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // 1. Import useLocation

const Navbar = () => {
  const location = useLocation(); 
  const NavRef = useRef(null);

  return (
    <nav className="navbar" ref={NavRef}>
      <div id="companylogo">
          <div id="companyname"><Link to="/">NeuralStock AI</Link></div>
          <sup id="registeredmark">®</sup>
      </div>

      <ul id="navbarlist">
        <li><Link to="/" className={location.pathname === '/' ? 'activated' : ''}>HOME</Link></li>
        <li><Link to="/aboutus" className={location.pathname === '/aboutus' ? 'activated' : ''}>ABOUT US</Link></li>
        <li><Link to="/contact" className={location.pathname === '/contact' ? 'activated' : ''}>CONTACT</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;