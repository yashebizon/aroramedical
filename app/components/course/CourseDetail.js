import Link from "next/link";
import React, { useState } from "react";

const CourseDetail = ({ courseDetail }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="courseDetails-sec">
        <div className="container flex flex-wrap">
          <div className="details-img">
            <img src={courseDetail.image} alt={courseDetail.heading} />
          </div>
          <div className="details-content">
            <h2 className=" h2-line mb-[24px]">{courseDetail.heading}</h2>
            <p
              className="details-course-content"
              dangerouslySetInnerHTML={{ __html: courseDetail.content }}
            />
            {isExpanded && (
              <p
                className="details-course-collapse mt-[10px] text-[#5c5c5c]"
                dangerouslySetInnerHTML={{
                  __html: courseDetail.collapseabtText,
                }}
              />
            )}
            <div className="action-btn">
              <p>
                <button className="white-fillbtn" onClick={toggleReadMore}>
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </p>
              {/* <p>
                <Link href="#">
                  <button className='green-fillbtn'>Buy Now</button>
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
