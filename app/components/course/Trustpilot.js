import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const Trustpilot = ({trustpilot}) =>{ 

  return (
    <>
    <div className="trusted-block">
    <div className="container">
      <div className="text-center" >
      <h2 className="text-center h2-line mb-[45px]"> {trustpilot.heading} </h2>
      </div>
      <div className="flex justify-center flex-wrap trusted-row desktop-view-only">
        <img src={trustpilot.image1}></img>
        <img src={trustpilot.image2}></img>
        <img src={trustpilot.image3}></img>
      </div>

      </div>


{/*---- mobile view --*/}
<Swiper
        speed={1000}
        loop={false}
        simulateTouch={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        slidesPerView="auto"
        spaceBetween={15}   
        modules={[Pagination, Autoplay]}
        className="course-trust-slider"
      >  
   
    
            <SwiperSlide key={'1'}>
            <img src={trustpilot.image1}></img>
    
            </SwiperSlide>
            <SwiperSlide key={'2'}>
        
            <img src={trustpilot.image2}></img>
         
            </SwiperSlide>
            <SwiperSlide key={'3'}>
           
            <img src={trustpilot.image3}></img>
            </SwiperSlide>

        </Swiper>
     
      </div>
    </>
  );
};

export default Trustpilot;
