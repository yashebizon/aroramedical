// app/page.js
//  import LoginForm from "./components/login/Login";
"use client";
import React, { useEffect, useState } from "react";
import Banner from "./components/home/Banner1";
import Featured from "./components/home/Featured";
import { getHomePage } from "../lib/woredpressApi";
import Introduction from "./components/home/Introduction";
import Partners from "./components/home/Partners";
import Events from "./components/home/Events";
import Resources from "./components/home/Resources";
import Mobile from "./components/home/Mobile";
import Trustpilot from "./components/home/Trustpilot";
import RatingSection from "./components/home/Rating";
import { gethomeBanner } from "../lib/woredpressApi";
import { getpartner } from "../lib/woredpressApi";
import { getEvents } from "../lib/woredpressApi";
import { getcourselist } from "../lib/woredpressApi";

const Page = ({}) => {
  const [featureData, setFeatureData] = useState(null);
  const [introData, setIntroData] = useState(null);
  const [partnersData, setPartners] = useState(null);
  const [eventsData, setEvents] = useState(null);
  const [courseData, setcourseData] = useState(null);
  const [homebanner, setHomebanner] = useState(null);
  const [homeData, sethomeData] = useState(null);

  const [events, setevents] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const databanner = await gethomeBanner();

      const partnerData = await getpartner();
     

      const dataevents = await getEvents();

      const data = await getHomePage();

      const coursedata = await getcourselist();
      sethomeData(data);
      setHomebanner(databanner);
      setevents(dataevents);
      setPartners(partnerData);
      setcourseData(coursedata);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
  };

  if (!homebanner || !events) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      {/* <RatingSection ratingData={homeData.acf_groups?.HeaderStrip} /> */}

      <Banner dataBanner={homebanner} courseData={courseData} />

      <Trustpilot />

      <Featured featuredIn={homeData.acf_groups?.Featured_Excellence_block} />

      <Mobile mobileData={homeData.acf_groups?.app_download_block} />

      <Resources
        courseData={courseData}
        couseBlock={homeData.acf_groups?.CourseBlock}
      />

      <Introduction IntroData={homeData.acf_groups?.IntroductionSec} />

      <Events events={events} eventData={homeData.acf_groups?.eventsBlock} />

      <Partners partnersData={partnersData} />
    </>
  );
};

export default Page;
