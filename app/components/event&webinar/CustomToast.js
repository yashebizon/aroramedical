'use client'
import {useEffect } from 'react';

function CustomToast({ message, onClose, duration = 50000 }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-5">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-[550px] w-full text-center   relative">
        <div className="flex justify-center flex-col items-center">
        {message}

        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className=" text-white px-4 py-2 rounded-lg shadow-sm absolute top-2 right-2"
          >
           <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6L6 18M6 6l12 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomToast;
