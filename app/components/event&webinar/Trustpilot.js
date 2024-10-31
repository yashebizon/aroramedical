'use client'
import { useEffect, useRef } from "react";


const Trustpilot = () => {
  const trustBoxRef = useRef(null);

  useEffect(() => {
    if(typeof window !== undefined)
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(trustBoxRef.current, true);
    }
  }, []);

  return (
    
      
     <div className="trusted-homesection">
      <div className="container">
        <h2 className="Trust_heading">Trusted by Thousands of Happy Customers</h2>
        <div
          ref={trustBoxRef}
          className="trustpilot-widget my-14"
          data-locale="en-GB"
          data-template-id="53aa8912dec7e10d38f59f36" // Use the appropriate template ID for the review slider
          data-businessunit-id="5f2d0db13dc806000191b48e" // Your business unit ID
          data-style-height="150px" // Adjust height as needed
          data-style-width="100%"
          data-theme="light"
          data-tags="gen"
          data-stars="5"
          data-review-languages="en"
        >
          <a
            href="https://uk.trustpilot.com/review/aroramedicaleducation.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trustpilot
          </a>
        </div>
      </div>
      </div> 
  
  );
};

export default Trustpilot;
