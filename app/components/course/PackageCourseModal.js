import React from 'react';

const CourseModal = ({ show, onClose, children }) => {
    if (!show) {
      return null;
    }
  

  return (
    <div className="CourseModal  packageModal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white ModalContent">
        <button onClick={onClose} className="modalClose"><img src="/images/Close.png" alt="close"/></button>
        {/* {children} */}
        <div className='ModalContent-list'>
            <div className='w-full' dangerouslySetInnerHTML={{ __html: children }}></div>
          </div>
      </div>
    </div>
  );
};

export default CourseModal;
   