import React from 'react';

 
const Partners = ({ partnersData }) => {
  return (
    <div className="  partners-section">
      <div className='container flex justify-center items-center '>
      <h2 className="text-center font-bold justify-center partner-heading mb-0"> {partnersData[0]?.post_type_plural_name}:</h2>
      <ul className="flex flex-wrap justify-center gap-8">
        {partnersData.map((src, index) => (
          <li key={index} className="flex justify-center items-center">
            <a href={src?.our_partner_link} target="_blank" rel="noopener noreferrer">
              <img src={src?.featured_image} alt={src?.featured_title} className="max-w-xs mx-2" />
            </a>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};
 
export default Partners;