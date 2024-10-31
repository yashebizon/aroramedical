"use client";
import React, { useState } from "react";

const Dropdown = ({ items, onSelect, coursePackage, isOpen, toggleDropdown }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onSelect(item, coursePackage); // Call the function passed as a prop when an item is clicked
    toggleDropdown(); // Close the dropdown after selecting an item
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="border-none px-4  ms-[-50px] cursor-pointer hover:scale-125 transition-transform duration-200"
      >
      <svg
          className=""
          width="15"
          height="9"
          viewBox="0 0 15 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.0615234 2.19895C0.079941 2.26777 0.10245 2.33536 0.128968 2.4013C0.213823 2.61228 0.337859 2.80166 0.4932 2.9574V2.9574C0.337859 2.80166 0.213823 2.61228 0.128968 2.40129C0.102451 2.33536 0.0799408 2.26776 0.0615234 2.19895ZM1.67582 0L1.67156 0.999986C1.51599 0.999324 1.34828 1.06263 1.20687 1.20671L1.20124 1.21245C1.14401 1.26982 1.0932 1.34483 1.05675 1.43547C1.02026 1.5262 1.00029 1.62738 1.00029 1.73181C1.00029 1.83625 1.02026 1.93743 1.05675 2.02816C1.0932 2.1188 1.14399 2.19383 1.20122 2.2512L1.20657 2.25657L7.53051 8.79194C7.67329 8.93582 7.84228 8.99982 7.9997 8.99982C8.15715 8.99982 8.32618 8.93579 8.46898 8.79186L14.7992 2.25231C14.8565 2.19466 14.9074 2.11946 14.9439 2.02863C14.9803 1.93772 15.0003 1.83638 15.0003 1.73181C15.0003 1.62724 14.9803 1.52591 14.9439 1.435C14.9074 1.34417 14.8566 1.2689 14.7993 1.21126L14.7985 1.21048C14.654 1.0648 14.4828 0.999817 14.323 0.999817C14.1645 0.999817 13.9947 1.06376 13.8509 1.207L8.00506 7.24611L2.15014 1.20132C2.00809 1.06026 1.84069 0.998506 1.68511 0.999952L1.67582 0Z"
            fill="#fff"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-2  mt-6 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[999]">
          <div className="py-1">
            {items?.options?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className={`block px-4 py-2 text-sm text-gray-700 w-full text-left hover:text-white hover:font-bold hover:bg-[#079561] ${
                  selectedItem === item ? "text-white font-bold bg-[#079561]" : "text-black"
                }`} 
              >
              
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
