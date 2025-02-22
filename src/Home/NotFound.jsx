import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Go back to <NavLink to="/">Weed Search - Homepage</NavLink> or <br/>
      to <NavLink to="https://farmguide.com.au/">Farmguide - Homepage</NavLink>
      </p>
    </div>
  );
}

export default NotFound;