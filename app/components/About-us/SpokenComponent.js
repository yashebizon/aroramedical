'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import greendot from '../../../public/images/green-dot.png'


import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import Image from 'next/image';




const SpokenComponent = ({ data }) => {



  return (
    <section className='w-full flex justify-center items-center bg-[#EAEAEA] p-5 overflow-hidden'>

      <div className='w-full max-w-[1360px] flex justify-center items-center gap-[76px] py-[86px]   flex-col relative'>
        <div className='flex justify-between w-full lg:flex-row flex-col gap-5'>

          <h5 className='text-[#1A1E1C] text-[30px] leading-[35px] text-center lg:text-left lg:text-[38px] lg:leading-[46px]'>Where Dr. Aman has spoken</h5>
          <h5 className='max-w-[554px] text-[#5C5C5C] text-[18px] leading-[30px] font-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac eu et ac elit senectus mauris blandit tempore gestas.</h5>
        </div>

        {/* Swiper Section */}

        <div className='flex gap-[60px] relative  w-full justify-center '>
          {/* Blue Dots on the Left */}
          <div className='absolute bottom-[-28px] right-[0px] xl:right-[200px]  z-0 '>
            <Image src={greendot} alt='green_dots' />
          </div>

          {/* green Dots on the Right */}
          <div className='absolute top-[-40px] left-[0px] xl:left-[430px] z-0 '>
            <Image src={greendot} alt='green_dots' />
          </div>

          {/* Swiper */}
          <Swiper
            spaceBetween={106}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}


            modules={[Autoplay]}
            className=" w-full  z-10"
          >
            {/* Swiper Slides */}
            {data?.map((el, id) => {
              return <SwiperSlide key={id}>
                <div className='flex justify-center  bg-white   max-w-[414px] flex-col px-10 py-10 min-h-[632px] ' >
                  <div className='relative rounded-[15px] max-h-[99px] w-full max-w-[300px] lg:max-w-[238px] min-h-[99px] lg:max-h-[400px] mb-[27px]'>
                    <Image
                      src={el?.spoken_at_img}
                      alt={`Spoken at ${id + 1}`}
                      fill
                      style={{ objectFit: "contain !important" }}
                      className='object-contain'

                    />
                  </div>
                  <h5 className='text-[#5C5C5C] text-[14px] leading-[30px] font-normal '>{el?.description}</h5>
                  {Array.isArray(el?.keypoints) && el.keypoints.length > 0 && (
                    <ul className="text-[#079561] text-[14px] leading-[30px] mt-[23px] font-normal list-inside list-disc">
                      {el?.keypoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
                  <h5 className='text-[#5C5C5C] text-[18px] leading-[20px] font-normal mt-[23px]'>{el?.date}</h5>

                </div>
              </SwiperSlide>
            })}


          </Swiper>

        </div>
        {/* <div className='custom-pagination flex justify-center items-center gap-2'></div> */}

      </div>
    </section>

  )
}

export default SpokenComponent
