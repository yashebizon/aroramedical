'use client'
import React, { useState, useEffect } from 'react';

const ContentPreview = ({ htmlContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [displayContent, setDisplayContent] = useState('');

  
  const truncateContent = (content) => {
    const text = content.replace(/<\/?[^>]+>/gi, ''); 
    const words = text.split(/\s+/); 
    return words.slice(0, 70).join(' '); 
  };

  const checkContentLength = (content) => {
    const text = content.replace(/<\/?[^>]+>/gi, ''); 
    const words = text.split(/\s+/); 
    return words.length > 70; 
  };

  useEffect(() => {
    if (!htmlContent) {
      setDisplayContent(''); // Empty content
      setShowReadMore(false);
      return;
    }

    if (checkContentLength(htmlContent)) {
      setDisplayContent(isExpanded ? htmlContent : truncateContent(htmlContent));
      setShowReadMore(true);
    } else {
      setDisplayContent(htmlContent);
      setShowReadMore(false);
    }
  }, [htmlContent, isExpanded]);

  return (
    <div className="event-content text-[12px] leading-[18px] lg:text-[18px] lg:leading-[30px] text-[#5C5C5C] py-10">
      <div 
        className={`content-preview ${isExpanded ? 'expanded' : 'truncated'}`}
        dangerouslySetInnerHTML={{ __html: displayContent }} 
        />
      {showReadMore && (
    <div className='flex justify-center items-center w-full mt-3' > 

          <button 
          className="text-white px-10 bg-[#079561] text-[15px] font-bold rounded-[66px] py-2 leading-[28px]"
          onClick={() => setIsExpanded(prev => !prev)}
          >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
        </div>
      )}
    </div>
  );
};

export default ContentPreview;
