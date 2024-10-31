import React from 'react';
import './home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Events = ({ events, eventData }) => {
  const router = useRouter();
  // Function to parse date strings from the JSON
  // const parseDate = (dateString, timeString) => {
  //   const [dayName, dayWithSuffix, month] = dateString.split(' ');
  //   const day = dayWithSuffix?.replace(/[^0-9]/g, ''); // Remove suffix from day
  //   const [hours, minutes, period] = timeString?.match(/(\d+):(\d+) (am|pm)/i)?.slice(1);

  //   // Convert to 24-hour format
  //   let hours24 = parseInt(hours, 10);
  //   if (period.toLowerCase() === 'pm' && hours24 !== 12) {
  //     hours24 += 12;
  //   }
  //   if (period.toLowerCase() === 'am' && hours24 === 12) {
  //     hours24 = 0;
  //   }

  //   const date = new Date(`${month} ${day}, ${new Date().getFullYear()} ${hours24}:${minutes}`);
  //   return date;
  // };

  const parseDate = (dateString) => {
    const eventDate = new Date(dateString);
    if (isNaN(eventDate.getTime())) {
      console.error("Invalid dateString", dateString);
      return null;
    }
    return eventDate;
  };

  // Function to filter upcoming events
  // const getUpcomingEvents = (events) => {
  //   const currentDate = new Date();
  //   return events.filter(event => {
  //     const eventDate = parseDate(event.start_date, event.$start_time);
  //     return eventDate >= currentDate;
  //   });
  // };

  const getUpcomingEvents = (events) => {
    const currentDate = new Date(); // Get current date

    return events
      .map(event => {
        if (!event.$start_fulldate) {
          console.warn("Missing start date for event", event);
          return null; // Skip events with missing start date
        }

        const eventDate = parseDate(event.$start_fulldate); // Use $start_fulldate
        return eventDate ? { ...event, eventDate } : null; // Add eventDate only if valid
      })
      .filter(event => event && event.eventDate >= currentDate) // Filter out past or invalid events
      .sort((a, b) => a.eventDate - b.eventDate); // Sort events by ascending date
  };

  const upcomingEvents = getUpcomingEvents(events);

  return (
    <div className="upcoming-events">
      <div className="container">
        <h2 className='mb-14'>{eventData.eventtitle}</h2>
        {/* <p className="events-details">{eventData.eventdescription}</p> */}


        <div className="event-cards">

          {upcomingEvents.length > 0 ? (
            upcomingEvents.slice(0, 3).map((event, index) => (
              <div className="event-card cursor-pointer" key={index}>

                {event.featured_image && <img onClick={() => {
                  router.push(`/events-details/${event.slug}`);
                }} src={event.featured_image} alt={event.title} />}

                <p className="start-date">
                  <span className="fontNormal">{event.start_date_month.month}</span>
                  <span>{event.start_date_month.day}</span>
                </p>
                <div className="event-details">
                  <p className="event-date">{event.date_range}</p>
                  <a href={`events-details/${event.slug}`}>
                    <h3 className="event-title hover:text-green-700">{event.title}</h3>
                  </a>
                  <p className="event-time"> ({event.$start_time} - {event.$end_time})</p>
                  <div className="readmore-links"><a className='text-[#3B5998]' href={`events-details/${event.slug}`}>Join Now</a></div>
                </div>
              </div>
            ))
          ) : (
            <p className="events-details mx-auto">No upcoming events found.</p>
          )}
        </div>

        <Swiper
          speed={1000}
          loop={true}
          simulateTouch={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          slidesPerView="auto"
          spaceBetween={18}
          modules={[Autoplay]}
          className="mySwiper events-slider"
        >
          {upcomingEvents.length > 0 ? (
            upcomingEvents.slice(0, 3).map((event, index) => (
              <SwiperSlide className='event-card' key={index}>
                {event.featured_image && <img src={event.featured_image} alt={event.title} />}
                <p className="start-date">
                  <span className="fontNormal">{event.start_date_month.month}</span>
                  <span>{event.start_date_month.day}</span>
                </p>
                <div className="event-details">
                  <p className="event-date">{event.date_range}</p>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-time"> - {`(${event.end_date_month.month} ${event.end_date_month.day}) ${event.$start_time} ${event.$end_time}`}</p>
                  <div className="readmore-links"><a className='text-[#3B5998]' href={`events-details/${event.slug}`}>Join Now</a></div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="events-details mx-auto">No upcoming events found.</p>
          )}
        </Swiper>


        <a href='/events-webinar'><button className="view-all">View All</button></a>
      </div>
    </div>
  );
};

export default Events;
