import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Hero() {

  return (
    <div className="hero">
      <h1>FarmGuide WeedSearch </h1>
      <div className="herolinks">
      <NavLink to="/about">About WeedSearch</NavLink>
        <NavLink to="/ListofPlants">Full Weeds List</NavLink>
        <NavLink to="/Wons">Weeds of National Significance</NavLink>

      </div>

    </div>
  )
}
