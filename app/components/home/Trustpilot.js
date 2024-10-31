'use client'
import { useEffect, useRef, useState } from "react";
import "./home.css";

const Trustpilot = () => {
  const trustBoxRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount

  useEffect(() => {
    setIsMounted(true); // Set to true after component mounts on client-side
  }, []);

  useEffect(() => {
    if (isMounted && window.Trustpilot) {
      window.Trustpilot.loadFromElement(trustBoxRef.current, true);
    }
  }, [isMounted]);

  if (!isMounted) {
    // Return nothing (or a loader) while the component hasn't been mounted on the client
    return null;
  }

  return (
    <div className="trusted-homesection">
      <div className="container">
        <h2 className="Trust_heading">
          Trusted by Thousands of Happy Customers
        </h2>
        <div
          ref={trustBoxRef}
          className="trustpilot-widget my-14"
          data-locale="en-GB"
          data-template-id="53aa8912dec7e10d38f59f36"
          data-businessunit-id="5f2d0db13dc806000191b48e"
          data-style-height="150px"
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
