// "use client";
// import React, { useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import Image from "next/image";
// import OurTeamData from "./OurTeamData";

// type TeamMember = {
//   image: string;
//   name: string;
//   qualifications: string;
// };

// type Props = {
//   data: TeamMember[]; // Accepting the array of team members as props
// };


// const MeetOurTeam = ({ data }: Props) => {
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     if (swiperRef?.current) {
//       // swiperRef?.current?.swiper?.navigation?.update();
//     }
//   }, [swiperRef]);

//   return (
//     <section className="w-full flex justify-center items-center bg-white p-5 overflow-hidden">
//       <div className="w-full max-w-[1360px] flex justify-center items-center gap-[76px] py-[86px] flex-col relative">
//         <h5 className="text-[#1A1E1C] text-[30px] leading-[35px] text-center lg:text-left lg:text-[38px] lg:leading-[46px]">
//           Meet our team
//         </h5>

//         {/* Swiper Section */}
//         <div className="flex gap-[60px] relative w-full justify-center">
//           {/* Swiper */}
//           <Swiper
//             ref={swiperRef}
//             spaceBetween={30}
//             centeredSlides={true}
//             slidesPerView={1}
//             breakpoints={{
//               640: {
//                 slidesPerView: 1,
//                 spaceBetween: 20,
//               },
//               768: {
//                 slidesPerView: 3,
//                 spaceBetween: 20,
//               },
//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 30,
//               },
//               1025: {
//                 slidesPerView: 5,
//                 spaceBetween: 30,
//               },
//             }}
//             loop
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             navigation={{
//               nextEl: ".swiper-button-next",
//               prevEl: ".swiper-button-prev",
//             }}
//             modules={[Autoplay, Navigation, Pagination]}
//             className="w-full z-10"
//           >
//             {/* Swiper Slides */}
//             {data.map((data,index) => (
//               <SwiperSlide key={index} className="">
//                 <div className="flex flex-col justify-center items-center ">
//                   <div className="relative rounded-[15px] overflow-hidden h-full w-full max-w-[300px] lg:max-w-[215px] min-h-[300px] lg:min-h-[240px] mb-[23px]">
//                     <Image src={data?.image} alt={data.name} fill />
//                   </div>
//                   <div className="">
//                     <h4 className="text-[#1A1E1C] text-[18px] leading-[34px] font-bold text-start">
//                       {data?.name}
//                     </h4>
//                     <h4 className="text-[#5C5C5C] text-[15px] leading-[30px]">
//                       {data?.qualifications}
//                     </h4>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           <div className="swiper-button-next"></div>
//           <div className="swiper-button-prev"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MeetOurTeam;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import TeamMemberModal from "./TeamMemberModal";



const MeetOurTeam = ({ data }) => {
  const swiperRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (swiperRef?.current) {
      // swiperRef?.current?.swiper?.navigation?.update();
    }
  }, [swiperRef]);

  // Function to open modal with selected team member's details
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <section className="w-full flex justify-center items-center bg-white p-5 overflow-hidden relative">
      <div className="w-full max-w-[1360px] flex justify-center items-center gap-[76px] py-[86px] flex-col relative">
        <h5 className="text-[#1A1E1C] text-[30px] leading-[35px] text-center lg:text-left lg:text-[38px] lg:leading-[46px]">
          Meet our team
        </h5>

        {/* Swiper Section */}
        <div className="flex gap-[60px] relative w-full justify-center">
          {/* Swiper */}
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            centeredSlides={false}
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
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1536: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className="w-full z-10"
          >
            {/* Swiper Slides */}
            {data.map((member, index) => (
              <SwiperSlide key={index}>
                <div
                  className="flex flex-col justify-center items-center cursor-pointer"
                  onClick={() => handleMemberClick(member)}
                >
                  <div className="relative group rounded-[15px] overflow-hidden h-full w-full max-w-[300px] lg:max-w-[240px] min-h-[300px] lg:min-h-[240px] mb-[23px]">
                    <Image
                      src={member?.image}
                      alt={member.name}
                      fill
                      // className="object-contain"
                      style={{ objectFit: "contain !important" }}
                    />
                    <div className="absolute hidden group-hover:flex h-full justify-center items-center w-full bg-black opacity-70 left-0 right-0 ">
                      <p className="text-white font-bold mt-4">View Detail</p>
                    </div>
                  </div>
                  <div className="">
                    <h4 className="text-[#1A1E1C] text-[18px] leading-[34px] font-bold text-start">
                      {member?.name}
                    </h4>
                    <h4 className="text-[#5C5C5C] text-[15px] leading-[30px]">
                      {member?.qualifications}
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>


      {isModalOpen && selectedMember && (
        <TeamMemberModal member={selectedMember} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default MeetOurTeam;

