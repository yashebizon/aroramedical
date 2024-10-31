import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import "./home.css";
 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
 
import { Pagination, Autoplay } from 'swiper/modules';
 
const slides = [
  {
    title: 'The only partner you need in medical education.',
    description: 'With over 10 years of teaching experience, we offer 50+ resources in 5 learning styles to suit you, and boast a remarkable 5-star Trustpilot rating.',
    image: './images/slide-1.png',
  },
  {
    title: 'The only partner you need in medical education.',
    description: 'With over 10 years of teaching experience, we offer 50+ resources in 5 learning styles to suit you, and boast a remarkable 5-star Trustpilot rating.',
    image: './images/slide-1.png',
  },
  {
    title: 'The only partner you need in medical education.',
    description: 'With over 10 years of teaching experience, we offer 50+ resources in 5 learning styles to suit you, and boast a remarkable 5-star Trustpilot rating.',
    image: './images/slide-1.png',
  },
];
 
const Banner = () => {
  return (
    <Swiper
      speed={1000}  // Transition duration in milliseconds
      loop={true}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <section className="hero-section">
            <div className="container">
              <div className="wrap-main">
                <div className="slider-block flex">
                  <div className="content">
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <ul className='trustpiolot-icon'>
                      <li className='mx-2'><img src = './images/slider-trust-piolat.png' /></li>
                      <li className='mx-2'><img src = './images/slider-icon-2.png' /></li>

                      
                    </ul>
                    <button className="hero_btn">Select Course</button>
                  </div>
                  <div className="image-box">
                    <div className='img-inner-box'>
                      <img src={slide.image} alt="Medical Education" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
 
export default Banner;