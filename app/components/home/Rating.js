import React from "react";
import "./home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const RatingSection = ({ ratingData }) => {
  return (
    <section className="rating Z-[99999] relative">
      <div className="container Z-[99999]">
        <div className="rating-wrap desktop-show-rating ">
          <div className="rate_block ">
            <img src={ratingData?.firstcologo} alt="Medical Education" />
            <div className="header-below-strip">
              {" "}
              <span>{ratingData?.firstcol}</span> {ratingData?.firstcoldes}
            </div>
          </div>
          <div className="rate_block excellent-row">
            <Link
              target="_blank"
              href={ratingData?.trustpilotlink}
              className="rate_block_outer"
            >
              <div className="header-below-strip">
                <span>{ratingData?.seccoltitle}</span>
              </div>
              <img src={ratingData?.seccollogo} alt="Medical Education" />
            </Link>
          </div>
          <div className="flex justify-center items-center px-[40px] gap-3">
            <img src={ratingData?.thirdcollogo} alt="Medical Education" />
            <div className="header-below-strip flex flex-col">
              <span className="text-[15px] font-bold leading-[15px]">{ratingData?.thirdcoltitle}</span> <span className="text-[12px]">{ratingData?.thirdcoldes}</span>
            </div>
          </div>
          {/* <div className="rate_block last">
            <img src={ratingData?.fourthcollogo} alt="Medical Education" />
            <div className="header-below-strip">
              <span>{ratingData?.fourthcoltitle}</span>
              {ratingData?.fourthcoldes}
            </div>
          </div> */}
        </div>
        <Swiper
          speed={1000}
          loop={false}
          simulateTouch={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          slidesPerView="auto"
          spaceBetween={10}
          modules={[Autoplay]}
          className="header-toprating-slider Z-[99999]"
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            }
          }}
        >
          <SwiperSlide key={"1"}>
            <div className="rate_block">
              <img src={ratingData?.firstcologo} alt="Medical Education" />
              <div className="header-below-strip">
                {" "}
                <span>{ratingData?.firstcol}</span> {ratingData?.firstcoldes}
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide key={"2"}>
            <div className="rate_block excellent-row ">
              <Link
                target="_blank"
                href={ratingData?.trustpilotlink}
                className="rate_block_outer gap-[4px] flex justify-center items-center"
              >
                <div className="header-below-strip">
                  <span>{ratingData?.seccoltitle}</span>
                </div>
                <img src={ratingData?.seccollogo} alt="Medical Education" className="w-[150px]" />
              </Link>
            </div>
          </SwiperSlide>

          <SwiperSlide key={"3"}>
            <div className="rate_block">
              <img src={ratingData?.thirdcollogo} alt="Medical Education" />
              <div className="header-below-strip">
                <span>{ratingData?.thirdcoltitle}</span>{" "}
                {ratingData?.thirdcoldes}
              </div>
            </div>
          </SwiperSlide>

          {/* <SwiperSlide key={"4"}>
            <div className="rate_block last">
              <img src={ratingData?.fourthcollogo} alt="Medical Education" />
              <div className="header-below-strip">
                <span>{ratingData?.fourthcoltitle}</span>
                {ratingData?.fourthcoldes}
              </div>
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </section>
  );
};

export default RatingSection;
