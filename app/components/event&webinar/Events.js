
import React, { useState, useEffect } from 'react';
import './event.css';
import Link from 'next/link';
import Select from "react-select";
import Image from 'next/image';


const Events = ({ events }) => {
  const [showAll, setShowAll] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showResult, setShowResult] = useState(false);

  // const parseDate = (dateString, timeString) => {
  //   const [dayName, dayWithSuffix, month] = dateString.split(' ');
  //   const day = dayWithSuffix.replace(/[^0-9]/g, '');
  //   const [hours, minutes, period] = timeString.match(/(\d+):(\d+) (am|pm)/i).slice(1);
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

  // const getUpcomingEvents = (events) => {
  //   const currentDate = new Date();
  //   return events.filter(event => {
  //     const eventDate = parseDate(event.start_date, event.$start_time);
  //     return eventDate;
  //   });
  // };


  const parseDate = (dateString) => {
    const eventDate = new Date(dateString);
    if (isNaN(eventDate.getTime())) {
      console.error("Invalid dateString", dateString);
      return null;
    }
    return eventDate;
  };
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


  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    scrollToTop();
  }, []);


  useEffect(() => {
    const upcomingEvents = getUpcomingEvents(events);
    setFilteredEvents(upcomingEvents);
  }, [events]);

  const handleViewAll = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };



  const handleFilter = () => {
    let filtered = getUpcomingEvents(events);

    if (selectedMonth && selectedMonth !== 'all') {
      filtered = filtered.filter(event => {
        const eventDate = event.eventDate;
        return eventDate && eventDate.getMonth() === parseInt(selectedMonth) - 1;
      });
    }

    if (selectedCourse) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(selectedCourse.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
    setShowResult(true);
  };


  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setShowResult(false);
  };

  const handleCourseChange = (selectedOption) => {
    setSelectedCourse(selectedOption.value);
    setShowResult(false);
  };

  const options = [
    { value: 'MSRA', label: 'MSRA' },
    { value: 'Live PLAB 2 Academy', label: 'Live PLAB 2 Academy' },
    { value: 'AKT', label: 'AKT' },
    { value: 'AKT Stats', label: 'AKT Stats' },
    { value: 'SCA Booster Webinar', label: 'SCA Booster Webinar' }
  ];

  return (
    <section className="w-full flex justify-center items-center mt-8 lg:mt-[50px] px-5 flex-col  ">
      <div className="max-w-[1360px] w-full ">
        <div className="border-b-[1px] border-[#B2B4B6] w-full">
          <h2 className="text-6xl text-center pb-8 ">Event and Webinar</h2>
        </div>


        <div className="hidden  lg:flex my-12 gap-5 flex-col  lg:flex-row items-center lg:items-center   lg:my-12 lg:m-auto xl:max-w-full Z-[99999] ">
          <div className="flex gap-5 justify-center items-center  ">
            <span className="text-[#5C5C5C] text-[18px] leading-[30px]">Filter month: </span>
            <div className="relative inline-flex items-center  ">
              <Select
                value={selectedMonth ? { value: selectedMonth, label: selectedMonth === 'all' ? 'All Events' : new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' }) } : null}
                onChange={(option) => handleMonthChange({ target: { value: option.value } })}
                options={[
                  { value: "all", label: "All Events" },
                  ...[...Array(12)].map((_, i) => ({
                    value: (i + 1).toString(),
                    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
                  }))
                ]}
                placeholder="Select month"
                className="custom-select w-[200px] "

                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderWidth: "2px",
                    borderColor: state.isFocused ? "#079561" : "",
                    boxShadow: state.isFocused ? "0 0 0 1px #079561" : "",
                    fontSize: "14px",
                    fontWeight: 700,
                    borderRadius: "40px",
                    paddingLeft: "15px",
                    cursor: "pointer",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: "14px",
                    backgroundColor: state.isSelected ? "#079561" : state.isFocused ? "#079561" : "#fff",
                    color: state.isSelected ? "#fff" : "#333",
                    cursor: "pointer",
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "#5C5C5C4D",
                  }),
                }}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-center items-center">
            <span className="text-[#5C5C5C] text-[16px] leading-[30px]">Course : </span>
            <Select
              className="custom-select w-[250px] lg:w-[190px] xl:w-[319px] z-[10]"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderWidth: "2px",
                  borderColor: state.isFocused ? "#079561" : "",
                  boxShadow: state.isFocused ? "0 0 0 1px #079561" : "",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderRadius: "40px",
                  paddingLeft: "15px",
                  cursor: "pointer",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  fontSize: "14px",
                  backgroundColor: state.isSelected
                    ? "#079561" // Active selection color
                    : state.isFocused // Hover state
                      ? "#079561" // Change background color on hover
                      : "#fafafa",
                  color: state.isSelected ? "white" : "black",
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: "#5C5C5C4D",
                }),
                cursor: "pointer",
              }}
              placeholder="Search course"
              value={options.find(option => option.value === selectedCourse)}
              onChange={handleCourseChange}
              options={[
                { value: "", label: "All Courses" },
                { value: "MSRA", label: "MSRA" },
                { value: "Live PLAB 2 Academy", label: "Live PLAB 2 Academy" },
                { value: "AKT", label: "AKT" },
                { value: "AKT Stats", label: "AKT Stats" },
                { value: "SCA Booster Webinar", label: "SCA Booster Webinar" }
              ]}
            />

          </div>


          <button
            onClick={handleFilter}
            className="px-16 lg:px-9  py-2 text-[#079561] border border-[#079561] rounded-full m-auto lg:m-0 font-bold text-[18px]">
            Show Result
          </button>

        </div>

        <div className="md:flex flex-col my-12 gap-5 lg:hidden  md:flex-row md:flex-wrap md:justify-between md:items-center hidden ">
          <div className="flex flex-col md:flex-row gap-5 items-start md:items-center w-full md:w-auto">
            <div className="flex gap-5 items-center w-full md:w-auto">
              <span className="text-[#5C5C5C] text-[17px] leading-[30px]">Filter month: </span>
              <div className="relative inline-flex items-center ">
                <Select
                  value={selectedMonth ? { value: selectedMonth, label: selectedMonth === 'all' ? 'All Events' : new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' }) } : null}
                  onChange={(option) => handleMonthChange({ target: { value: option.value } })}
                  options={[
                    { value: "all", label: "All Events" },
                    ...[...Array(12)].map((_, i) => ({
                      value: (i + 1).toString(),
                      label: new Date(0, i).toLocaleString('default', { month: 'long' }),
                    }))
                  ]}
                  placeholder="Select month"
                  className="custom-select w-[178px] "
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderWidth: "2px",
                      borderColor: state.isFocused ? "#079561" : "",
                      boxShadow: state.isFocused ? "0 0 0 1px #079561" : "",
                      fontSize: "14px",
                      fontWeight: 700,
                      borderRadius: "40px",
                      paddingLeft: "15px",
                      cursor: "pointer",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: "14px",
                      backgroundColor: state.isSelected ? "#079561" : state.isFocused ? "#079561" : "#fff",
                      color: state.isSelected ? "#fff" : "#333",
                      cursor: "pointer",
                    }),
                  }}
                />
              </div>
            </div>
            <div className="flex gap-5 items-center w-full md:w-auto z-[999]">
              <span className="text-[#5C5C5C] text-[16px] leading-[30px]">Course : </span>
              <Select
                className="custom-select "
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderWidth: "2px",
                    borderColor: state.isFocused ? "#079561" : "",
                    boxShadow: state.isFocused ? "0 0 0 1px #079561" : "",
                    fontSize: "14px",
                    fontWeight: 700,
                    borderRadius: "40px",
                    paddingLeft: "15px",
                    cursor: "pointer",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: "14px",
                    backgroundColor: state.isSelected ? "#079561" : state.isFocused ? "#079561" : "#fff",
                    color: state.isSelected ? "#fff" : "#333",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "#5C5C5C4D",
                  }),
                  cursor: "pointer",
                }}
                placeholder="Search course"
                value={options.find(option => option.value === selectedCourse)}
                onChange={(selectedOption) => setSelectedCourse(selectedOption.value)}
                options={options}
              />
            </div>
          </div>
          <button
            onClick={handleFilter}
            className="px-16 lg:px-9 py-2 text-[#079561] border border-[#079561] rounded-full m-auto lg:m-0 font-bold text-[18px]"
          >
            Show Result
          </button>
        </div>

        <div className="flex flex-col my-12 gap-5 md:hidden z-[9999]">
          <div className="flex w-full flex-col gap-[10px]">
            <div className="flex flex-col gap-2 w-full z-[999]">
              <span className="text-[#5C5C5C] text-[17px] leading-[30px]">Filter month: </span>
              <div className="relative inline-flex items-center w-full">
                <Select
                  value={selectedMonth ? { value: selectedMonth, label: selectedMonth === 'all' ? 'All Events' : new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' }) } : null}
                  onChange={(option) => handleMonthChange({ target: { value: option.value } })}
                  options={[
                    { value: "all", label: "All Events" },
                    ...[...Array(12)].map((_, i) => ({
                      value: (i + 1).toString(),
                      label: new Date(0, i).toLocaleString('default', { month: 'long' }),
                    }))
                  ]}
                  placeholder="Select month"
                  className="custom-select w-full"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderWidth: "2px",
                      borderColor: state.isFocused ? "#079561" : "#E0E0E0",
                      boxShadow: state.isFocused ? "0 0 0 1px #079561" : "none",
                      borderRadius: "40px",
                      cursor: "pointer",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      fontSize: "14px",
                      backgroundColor: state.isSelected ? "#079561" : state.isFocused ? "#079561" : "#fff",
                      color: state.isSelected ? "#fff" : "#333",
                      cursor: "pointer",

                    }),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full z-[99]">
              <span className="text-[#5C5C5C] text-[16px] leading-[30px]">Course : </span>
              <Select
                className="custom-select w-full"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderWidth: "2px",
                    borderColor: state.isFocused ? "#079561" : "#E0E0E0",
                    boxShadow: state.isFocused ? "0 0 0 1px #079561" : "none",
                    fontSize: "14px",
                    fontWeight: 700,
                    borderRadius: "40px",
                    paddingLeft: "15px",
                    transition: "border-color 0.3s",
                    '&:hover': {
                      borderColor: "#079561",
                    },
                    height: '48px',
                    cursor: "pointer",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: "14px",
                    backgroundColor: state.isSelected ? "#079561" : state.isFocused ? "#079561" : "#fff",
                    color: state.isSelected ? "#fff" : "#333",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    cursor: "pointer",
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "#5C5C5C4D",
                  }),
                  container: (provided) => ({
                    ...provided,
                    width: '100%',
                  }),
                }}
                placeholder="Search course"
                value={options.find(option => option.value === selectedCourse)}
                onChange={(selectedOption) => setSelectedCourse(selectedOption.value)}
                options={options}
              />
            </div>
          </div>
          <button
            onClick={handleFilter}
            className="px-16  lg:px-9 py-[8px] text-[#079561] border border-[#079561] rounded-full m-auto lg:m-0 font-bold text-[18px] w-full"
          >
            Show Result
          </button>
        </div>







        <div className=' w-full'>

          {showResult && selectedMonth && selectedMonth !== "Select month" && selectedMonth !== "all" && (
            <h3 className='text-[25px] leading-[30px] text-[#1A1E1C]'>
              {new Date(0, selectedMonth - 1).toLocaleString("default", { month: "long" })}
            </h3>
          )}

        </div>

        <div className="w-full h-full">
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-center">
            {(showAll ? filteredEvents : filteredEvents.slice(0, 6)).length > 0 ? (
              (showAll ? filteredEvents : filteredEvents.slice(0, 6)).map((event, index) => (
                <div key={index} className="flex flex-col min-w-[200px] max-w-[400px] mb-10">
                  <Link href={`events-details/${event.slug}`}>
                    <div className="relative p-5 bg-[#079561] h-[242px] md:h-[230px]">
                      {event.featured_image && (
                        <Image
                          src={event.featured_image || "https://aroramediaclfe.ebizonstaging.com/events-details/live-plab-2-academy-package-2nd-11th-december-2024"}
                          alt="event-img"
                          height={209}
                          width={386}
                          objectFit="cover"
                          className="w-full h-full md:h-[190px]"
                        />
                      )}
                      <div className="absolute top-[-15px] left-3 bg-[#FFD700] p-3 z-[9] ">
                        <p className="text-black font-semibold text-[18px] leading-[18px]">{event.start_date_month.month}</p>
                        <p className="text-black font-bold text-[30px] leading-[30px]">{event.start_date_month.day}</p>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-[25px] flex flex-col flex-grow">
                    <p className="text-[#5C5C5C] text-[16px] leading-[18px]">{event.date_range}</p>
                    <Link href={`events-details/${event.slug}`}>
                      <p className="text-[#1A1E1C] text-[18px] leading-[30px] font-bold mt-3 line-clamp-2">{event.title}</p>
                    </Link>
                    <div className="flex items-center px-4 text-[#5C5C5C] text-[14px] mt-2 bg-[#EAEAEA] rounded-3xl max-w-[200px] gap-2 py-[2px]">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1102_32985)">
                          <path d="M1.66699 10C1.66699 12.2102 2.54497 14.3298 4.10777 15.8926C5.67057 17.4554 7.79019 18.3334 10.0003 18.3334C12.2105 18.3334 14.3301 17.4554 15.8929 15.8926C17.4557 14.3298 18.3337 12.2102 18.3337 10C18.3337 7.78988 17.4557 5.67027 15.8929 4.10746C14.3301 2.54466 12.2105 1.66669 10.0003 1.66669C7.79019 1.66669 5.67057 2.54466 4.10777 4.10746C2.54497 5.67027 1.66699 7.78988 1.66699 10V10Z" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="square" />
                          <path d="M10 9.99999V7.0238" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="square" />
                          <path d="M10.3271 10.7L13.7201 13.7207" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="square" />
                        </g>
                        <defs>
                          <clipPath id="clip0_1102_32985">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {` ${event.$start_time} - ${event.$end_time}`}
                    </div>
                    <Link href={`events-details/${event.slug}`} className="relative text-[#079561] mt-auto pt-4 custom-underline">Join Now</Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="events-details mx-auto col-span-full text-center text-black">No upcoming events found.</p>
            )}
          </div>

          <div className="flex justify-center items-center w-full">
            {filteredEvents.length > 6 && (
              <button
                onClick={handleViewAll}
                className="text-[#079561] text-[18px] leading-[20px] font-bold rounded-[66px] border-[1px] border-[#079561] py-5 px-20 mt-10"
              >
                {showAll ? 'Show Less' : 'Load More Events'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
