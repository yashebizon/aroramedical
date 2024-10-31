// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay} from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import 'swiper/css/navigation';
// import Image from "next/image";
// import partnerlogo1 from '../../../public/images/partner1.png'
// import partnerlogo2 from '../../../public/images/partner2.png'

// import partnerlogo3 from '../../../public/images/partner3.png'

// import partnerlogo4 from '../../../public/images/partner4.png'


// type Ourpartners = {
//   image: string;
// };

// type Props = {
//   data: Ourpartners[]; // Accepting the array of team partners as props
// };



// const Ourpartner = (props: Props) => {




//   return (
//     <section className="w-full flex justify-center items-center bg-white p-5 overflow-hidden">
//       <div className="w-full max-w-[1360px] flex justify-center items-center gap-[76px] py-[86px] flex-col relative">
//         <h5 className="text-[#1A1E1C] text-[30px] leading-[35px] text-center lg:text-left lg:text-[38px] lg:leading-[46px]">
//         Our Partners
//         </h5>

//         {/* Swiper Section */}
//         <div className="flex gap-[60px] relative w-full justify-center ">
//           {/* Swiper */}
//           <Swiper
//             spaceBetween={69}
//             // centeredSlides={true}
//             slidesPerView={1}
//             breakpoints={{
//               640: {
//                 slidesPerView: 1,
//                 spaceBetween: 20,
//               },
//               768: {
//                 slidesPerView: 4,
//                 spaceBetween: 20,
//               },
//               1024: {
//                 slidesPerView: 4,
//                 spaceBetween: 30,
//               },
//             }}
//             loop
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}

//             modules={[Autoplay]}
//             className="w-full z-10"
//           >
//               {data.map()=>{
//                 return(
//                   <SwiperSlide className=" flex justify-center items-center w-full">
//                   <div className="flex flex-col justify-center items-center  h-[110px] bg-white  ">
//                     <div className="relative   h-[94px] w-full  flex justify-center items-center top-[0px]">
//                       <Image
//                         src={partnerlogo1}
//                         alt="team partner img"
//                         fill
//                         objectFit="cover"
//                       />
//                     </div>

//                   </div>
//                 </SwiperSlide>
//                 )
//               }}

//           </Swiper>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Ourpartner;


"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import OurpartnerModal from "./OurpartnerModal";



const Ourpartner = ({ data }) => {
  const [selectedpartner, setSelectedpartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePartnerClick = (partner) => {
    setSelectedpartner(partner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedpartner(null);
  };

  return (
    <section className="w-full flex justify-center items-center bg-white p-5 overflow-hidden">
      <div className="w-full max-w-[1360px] flex justify-center items-center gap-[76px] py-[86px] flex-col relative">
        <h5 className="text-[#1A1E1C] text-[30px] leading-[35px] text-center lg:text-left lg:text-[38px] lg:leading-[46px]">
          Our Partners
        </h5>

        {/* Swiper Section */}
        <div className="flex gap-[60px] relative w-full justify-center">
          {/* Swiper */}
          <Swiper
            spaceBetween={69}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="w-full z-10"
          >
            {data.map((partner, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center w-full">
                <div onClick={() => handlePartnerClick(partner)} className="flex flex-col justify-center items-center h-full overflow-hidden rounded-[12px] bg-white">
                  <div className="relative cursor-pointer group h-[94px] w-full flex justify-center items-center top-[0px]">
                    <Image
                      src={partner.partnerimage}
                      alt={`Partner ${index + 1} logo`}
                      width={300}
                      height={120}
                      objectFit="contain"
                    />
                    <div className="absolute hidden group-hover:flex h-full justify-center items-center w-full bg-black opacity-70 left-0 right-0 ">
                      <p className="text-white font-bold ">View Detail</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {isModalOpen && selectedpartner && (
          <OurpartnerModal partner={selectedpartner} onClose={handleCloseModal} />
        )}

      </div>
    </section>
  );
};

export default Ourpartner;
