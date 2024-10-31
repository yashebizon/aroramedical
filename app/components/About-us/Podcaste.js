'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import bluedots from '../../../public/images/blue-dots 1.png'

import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import Image from 'next/image';



const Podcaste = ({ data }) => {



    return (
        <section className='w-full flex justify-center items-center bg-[#EAEAEA] p-5 overflow-hidden'>

        <div className='w-full max-w-[1360px] flex justify-center items-center gap-[76px] py-[86px]   flex-col relative'>
            <h5 className='text-[#1A1E1C] text-[30px] leading-[35px] text-center lg:text-left lg:text-[38px] lg:leading-[46px]'>Dr. Aman Interviews and Podcasts</h5>

            {/* Swiper Section */}

            <div className='flex gap-[60px] relative  w-full justify-center '>
                {/* Blue Dots on the Left */}
                <div className='absolute bottom-[-40px] left-[0px] xl:left-[-48px]  z-0 '>
                    <Image src={bluedots} alt='blue_dots' />
                </div>

                {/* Blue Dots on the Right */}
                <div className='absolute top-[-40px] right-[0px] xl:right-[-50px] z-0 '>
                    <Image src={bluedots} alt='blue_dots' />
                </div>

                {/* Swiper */}
                <Swiper
                     spaceBetween={30}
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
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination',
                    }}
                    
                    modules={[Autoplay , Pagination]}
                    className=" w-full  z-10"
                >
                    {/* Swiper Slides */}
                    {/* {data?.map((el,id)=>{
                        return <SwiperSlide key={id}> 
                        <div className='flex justify-center items-center bg-[#079561] p-3  max-w-[435px]'>
                            <iframe width="100%" height="200" src={el?.src} title={el?.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </SwiperSlide>
                    })} */}

{data?.map((link, id) => (
                            <SwiperSlide key={id}>
                                <div className='flex justify-center items-center bg-[#079561] p-3 max-w-[435px]'>
                                    <iframe
                                        width='100%'
                                        height='200'
                                        src={link.replace('watch?v=', 'embed/')} // Embed format for YouTube links
                                        title={`Podcast ${id + 1}`}
                                        frameBorder='0'
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                        referrerPolicy='strict-origin-when-cross-origin'
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </SwiperSlide>
                        ))}
                    
                    
                </Swiper>

            </div>
            <div className='custom-pagination flex justify-center items-center gap-2'></div>

        </div>
        </section>

    )
}

export default Podcaste
