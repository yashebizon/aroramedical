import React, { useState } from "react";
import Modal from "./courseModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "./home.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const Banner = ({ dataBanner, courseData }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleModal = (content) => {
    setModalContent(content);
    setShowModal(!showModal);
  };

  return (
    <>
      <Swiper
        speed={1000}
        loop={true}
        simulateTouch={false}
        autoHeight={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {dataBanner?.map((value, index) => {
          // Check if the category name 'Course' exists in the categories of the current item
          const hasCourseCategory = value.categories.some(
            (cat) => cat.name === "Course"
          );

          return (
            <SwiperSlide key={index}>
              <section className="hero-section">
                <div className="container">
                  <div className="wrap-main">
                    <div className="slider-block flex">
                      <div className="slide-content">
                        <h1>{value.title}</h1>
                        <p
                          dangerouslySetInnerHTML={{ __html: value.content }}
                        ></p>
                       <ul className="trustpiolot-icon">
                          <li className="mx-2">
                            <Link
                              target="_blank"
                              href={value?.acf_fields?.trust_pilot_link || "#"}
                            >
                              <img src={value.acf_fields.bannger_logo1.url} />
                            </Link>
                          </li>
                          <li className="mx-2">
                            <img src={value.acf_fields.banner_logo2.url} />
                          </li>
                        </ul>
 
                        {hasCourseCategory && (
                          <button
                            className="hero_btn font-Fdefault"
                            onClick={() =>
                              toggleModal(value.acf_fields.banner_link_text)
                            }
                          >
                            {value.acf_fields.banner_link_text}
                          </button>
                        )}
                        {!hasCourseCategory && (
                          <a href="/events-webinar">
                            <button className="hero_btn font-Fdefault">
                              {value?.acf_fields?.banner_link_text}
                            </button>
                          </a>

                        )}
                      </div>
                      {value.featured_image && (
                        <div className="image-box">
                          <div className="banner-featurebox">
                            <div className="img-inner-box">
                              <img src={value.featured_image} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Modal
        courseData={courseData}
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default Banner;
