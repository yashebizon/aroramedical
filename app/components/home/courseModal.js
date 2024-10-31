import Link from 'next/link';
import React from 'react';

const Modal = ({ show, onClose, children, courseData }) => {
    if (!show) {
      return null;
    }
  return (
    <div className="CourseModal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white ModalContent max-w-lg w-full">
        <button onClick={onClose} className="modalClose"><img src="/images/Close.png" alt="close"/></button>
        {/* {children} */}
        <div className='ModalContent-list'>
        {courseData.map((item, index) => (
                        <div key={index} className="learn_modal_box">
                            <div className="inner-custom">
                          <Link href={item.acf_fields.linkurl}>
                            <p className="caption">{item.title}</p>
                            </Link>
                            </div>
                        </div>
                    ))}
          </div>
      </div>
    </div>
  );
};

export default Modal;
