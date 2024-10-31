import dynamic from 'next/dynamic';
import React from 'react';
import { getEvents } from '../../../lib/woredpressApi'; 
import Content from '../../components/event&webinar/Content';

// Dynamically load the component
const TicketBooking = dynamic(() => import('../../components/event&webinar/TicketBooking'), {
  ssr: false, // Disable server-side rendering for this component
});

const ImageComponent = dynamic(() => import('../../components/Sharedimage/SharedImage'), {
  ssr: false, // Ensure this component also renders only on the client if it uses window/document
});

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map(event => ({
    slug: event.slug,  // Ensure slug is returned
  }));
}

export default async function EventDetails({ params }) {
  const events = await getEvents(); 
  const event = events.find(event => event.slug === params.slug);  // Match by slug

  if (!event) {
    return <div>Event not found</div>;
  }

  const title = event.title;
  const eventTitle = title.replace(/\(.*?\)/g, '').split('|')[0].trim();
  // let eventDate = title.split('|').pop().trim();
 let eventDate = title.split('|').pop().trim(); 

  if (eventDate.includes('-')) {
    const [startDate, , month, year] = eventDate.split(/[\s\-]+/);
    eventDate = `${startDate} ${month} ${year}`;
  }

  return (
    <section className='w-full justify-center items-center my-4 px-5 py-4 flex'>
      <div className='max-w-[1280px] w-full'>
        <div className='w-full flex justify-center items-center flex-col'>
          <p className='text-[18px] leading-[30px] text-[#5C5C5C]'>{eventDate}</p>
          <div className="border-b-[1px] border-[#B2B4B6] w-full mt-2">
            <h6 className="text-[50px] leading-[70px] md:mt-4 mt-0 text-center">{eventTitle}</h6>
            <Content htmlContent={event.content} />
          </div>
          <div className='w-full flex gap-10 mt-[50px] flex-col lg:flex-row'>
            {/* Left container */}
            <div className="w-full lg:w-[60%]">
              <ImageComponent 
                src={event.featured_image}
                className="w-full h-full"
                alt="event-img"
              />
            </div>
            {/* Right container */}
            <div className='w-full lg:w-[40%]'>
              <TicketBooking event={event} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
