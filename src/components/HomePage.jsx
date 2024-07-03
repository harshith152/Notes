import React from 'react';
import homeImage from '../assets/home-image.png';

const HomePage = ({ className }) => {
  return (
    <div className={`home-page ${className}`}>
      <img src={homeImage} alt="Illustration" className="home-image" />
      <h1>Pocket Notes</h1>
      <p>Send and receive messages without keeping your phone online.</p>
      <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
      <div className="encryption-message">
        <p>🔒 end-to-end encrypted</p>
      </div>
    </div>
  );
};

export default HomePage;
