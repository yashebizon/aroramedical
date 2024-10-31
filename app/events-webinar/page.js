"use client";
import React, { useEffect, useState } from 'react';
import Events from "../../app/components/event&webinar/Events";
import Trustpilot from "../components/event&webinar/Trustpilot";
import { getEvents } from '../../lib/woredpressApi';

const HomePage = () => {
  const [homeData] = useState(null);
  const [events, setEvents] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
      console.log(eventsData, "events data:::::::::::::::::::::")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  if (!events) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className='w-full flex flex-col  justify-center items-center'>
      <div className='max-w-[1300px] w-full'>

        <Events events={events} eventData={homeData?.acf_groups?.eventsBlock} />
        <Trustpilot />
      </div>
    </section>
  );
};

export default HomePage;
