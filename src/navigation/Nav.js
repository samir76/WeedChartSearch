import { NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../img/FarmGuide_RGB.jpg";
import React, { useState } from 'react';

function Nav() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(true); // Close the navbar
  };

  return (
    <>
      <button className="hamburger" onClick={handleToggle}>
        <RxHamburgerMenu className="burger-icon" />
      </button>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <div>
          <NavLink to="https://farmguide.com.au/"><img src={logo} alt="" /></NavLink>
        </div>
        <div className="mainnav">
        <NavLink to="/" onClick={() => handleLinkClick('/')}>Weed Search Home</NavLink>
        <NavLink to="https://farmguide.com.au" onClick={() => handleLinkClick('https://farmguide.com.au/')}>Farmguide Home</NavLink>        
        <NavLink to="https://farmguide.com.au/flipbook2/" onClick={() => handleLinkClick('https://farmguide.com.au/flipbook2/')}>Publications</NavLink>
        <NavLink to="https://farmguide.com.au/articles/" onClick={() => handleLinkClick('https://farmguide.com.au/articles/')}>Articles</NavLink>
        <NavLink to="http://weedsearch.s3-website-ap-southeast-2.amazonaws.com/?status=all&claes=all&type=all" onClick={() => handleLinkClick('http://weedsearch.s3-website-ap-southeast-2.amazonaws.com/?status=all&claes=all&type=all')}>Weed Search</NavLink>
        <NavLink to="https://farmguide.com.au/agricultural-contacts/" onClick={() => handleLinkClick('https://farmguide.com.au/agricultural-contacts/')}>Ag Info</NavLink>
        <NavLink to="https://farmguide.com.au/contactus/" onClick={() => handleLinkClick('https://farmguide.com.au/contactus/')}>Contact Us</NavLink>
        </div>
      </nav>
    </>
  )
}

export default Nav;
