import React from 'react';
import { Link } from 'react-router-dom';
import './ShieldPage.css';

const ShieldPage = () => {
  return (
    <div className="shield-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Shield</h2>
        <div className="nav-links">
         
          <Link to="/suspect" style={{ marginLeft: '20px' }}>Complaint</Link> 
        </div>
      </nav>

      <div className="main-content">
        <h1 className="main-heading">Welcome to Shield</h1>
        <p className="main-subtext">Your safety, our priority. Report incidents or suspicious activities confidently and securely.</p>
        
        <div className="button-group">
          <Link to="/incident" className="main-button">Report an Incident</Link>
          <Link to="/suspect" className="main-button">Report a Suspect</Link> 
        </div>
      </div>
    </div>
  );
};

export default ShieldPage;
