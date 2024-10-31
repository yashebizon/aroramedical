import React from "react";
import "./home.css";
import Link from "next/link";

const Resources = ({ courseData, couseBlock }) => {
  return (
    <section className="how-learn">
      <div className="container">
        <div className="learn-wrap">
          <div className="content_learn_heading">
            <h2
              dangerouslySetInnerHTML={{ __html: couseBlock.blocktitle }}
            ></h2>
          </div>
          <div className="content_learn_details">
            <p
              dangerouslySetInnerHTML={{ __html: couseBlock.blockdescription }}
            ></p>
            {/* <p>
                            {courseData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Link href={item.acf_fields.linkurl ? item.acf_fields.linkurl : '#'}>
                                        {item.title ? item.title : 'View Details'}
                                    </Link>
                                    {index < courseData.length - 1 && ', '}
                                </React.Fragment>
                            ))}
                        </p> */}
          </div>
        </div>
        <div className="learn_grid">
          {courseData.slice(0, 6).map((item, index) => (
            <Link key={index} href={item?.acf_fields?.linkurl}>
              <div key={index} className="learn_block_box">
                <div className="inner-custom">
                  <p className="hover-show">{item.acf_fields.linktext}</p>
                  <div className="learn_icon">
                    <img
                      src={item.featured_image}
                      alt={item.title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <h3 className="caption">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
