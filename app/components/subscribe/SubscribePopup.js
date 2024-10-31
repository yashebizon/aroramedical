import React, { useEffect, useState } from 'react';
import './subscribe.css';

const SubscribePopup = ({onClose}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const isPopupClosed = localStorage.getItem('popupClosed');

    // If popup is not closed, show it after 500ms
    if (!isPopupClosed) {
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('popupClosed', 'true');
    setIsPopupVisible(false);
    onClose()
  };


  if (!isPopupVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content show">
        <button className="close-button" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21L21 3" stroke="#079561" strokeWidth="2" strokeLinecap="square"/>
            <path d="M21 21L3 3" stroke="#079561" strokeWidth="2" strokeLinecap="square"/>
          </svg>
        </button>
        <div className='container'>
          <div className='subs-row'>
            <div className='subs-col'>
              <h2 className='h2-line'>Subscribe to our Newsletter</h2>
              <p>Enter your email address to receive our Free <br/> Newsletter for key Exam and Resource Updates</p>
            </div>
            <div className='subs-col'>
              <div className='subscribe-form'>
                <input type="email" placeholder="Enter your email" />
                <p><button className="subscribe-button">Subscribe</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePopup;
