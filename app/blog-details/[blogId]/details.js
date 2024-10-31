"use client";
// import { getBlogById, getPosts } from "@/lib/woredpressApi";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import he from "he";
// import Image from "next/image";

// function BlogsDetails({ params }) {
//   const [data, setData] = useState([{}]);
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetchBlogDetails();
//   }, [params?.blogId]);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogDetails = async () => {
//     const res = await getBlogById(params?.blogId);
//     if (res) {
//       setData(res);
//     }
//   };

//   const fetchBlogs = async () => {
//     const blogs = await getPosts();
//     if (blogs.length) {
//       const latest = blogs
//         .filter((blog) => !blog.is_featured)
//         .sort((a, b) => new Date(b.date) - new Date(a.date));
//       setBlogs(latest.slice(0, 3));
//     }
//   };

//   if (!data.title) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

import { getBlogById, getPosts } from "@/lib/woredpressApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import he from "he";
import Image from "next/image";


function BlogsDetails({ params }) {
  const [data, setData] = useState({});
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const blogs = await getPosts();
    if (blogs.length) {
      const latest = blogs
        .filter((blog) => !blog.is_featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setBlogs(latest.slice(0, 3));
    }
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const res = await getBlogById(params?.blogId);
      if (res) {
        setData(res);
      }
    };

    fetchBlogDetails();
  }, [params?.blogId]);

  useEffect(() => {
    fetchBlogs();
  }, []);


  if (!data.title) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }


  const acfFields = data.acf_fields_group || {};


  const howAroraCanHelp = Array.isArray(acfFields?.howaroracanhelp?.howwecanpasstextcontent)
    ? acfFields.howaroracanhelp.howwecanpasstextcontent.map(item => item?.howaroracanhelptopasstext)
    : [];

  const howAroraCanHelpTitle = acfFields?.howaroracanhelp?.howaroracanhelpyoutopass || '';

  const stripHtmlTags = (htmlString) => {
    const decodedString = he.decode(htmlString);
    return decodedString.replace(/<[^>]*>/g, '');
  };
  const maintopSectionListItems = data?.acf_fields_group?.maintopsectionlistitems || [];

  return (
    <>
      <div className="container typo-link">
        <h1 className="font-[700] text-[60px] leading-[74px] max-[767px]:text-[33px]  text-center mt-[30px] mb-[38px]">
          {he.decode(data?.title?.rendered)}
        </h1>
        {data?.content?.rendered && (
          <div className=" w-full">
            <h6
              className=" text-center text-[18px] text-[#5C5C5C] font-normal leading-[30px] "

            >{stripHtmlTags(data?.content?.rendered)}</h6>
            <div className="flex flex-col justify-center items-start mt-5 gap-5  max-w-[600px] m-auto  ">
              {maintopSectionListItems.length > 0 && (
                maintopSectionListItems.map((item, id) => (
                  <div key={id} className="flex justify-center flex-col items-center gap-[42px]">
                    <div className="flex justify-center items-center gap-3 w-full">
                      <svg
                        width="18"
                        height="18"
                        className="min-w-[30px]"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0C6.61305 0 4.32387 0.948211 2.63604 2.63604C0.948211 4.32387 0 6.61305 0 9C0 11.3869 0.948211 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948211 11.3869 0 9 0Z"
                          fill="#079561"
                        />
                        <path
                          d="M13.5 5.99997L7.5 12L4.5 8.99997"
                          stroke="white"
                          strokeMiterlimit="10"
                        />
                      </svg>

                      <div dangerouslySetInnerHTML={{ __html: item.listitems }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="flex mt-20 mb-20  gap-5 flex-col lg:flex-row">
          {data?.acf_fields_group?.table_of_contents_details &&
            <div>
              <div className="p-[22px] bg-[#DEF0E999] rounded-[15px] h-full w-full min-w-[300px]">
                <label className="w-full block text-[25px] text-[#1A1E1C] leading-[49px] font-[700] border-b-[1px] border-[#8C8C8C] mb-[23px]">
                  Table of contents
                </label>
                <ul className="grid gap-[10px] max-[767px]:gap-0">
                  {data?.acf_fields_group?.table_of_contents_details &&
                    data?.acf_fields_group?.table_of_contents_details?.map(
                      (item, key) => (
                        <li
                          className="text-[#5C5C5C] text-[18px] leading-[30px] font-[400] table-list mb-2"
                          key={key}
                        >
                          <a className="mb-0" href={"#" + item?.title.trim()}>
                            {item?.title}
                          </a>
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
          }
          <div className="relative  w-full ">
            {data?.acf_fields_group?.video_url ? (
              <iframe
                className="float-right ms-[20px] w-[446px] h-[254px] max-[1199px]:w-full max-[1199px]:mb-5"
                src={data?.acf_fields_group?.video_url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            ) : (
              <div className="relative w-full lg:w-[446px] h-[350px] mb-5 lg:mb-0 float-right  ">
                <Image
                  className=""
                  src={data?.fimg_url}
                  alt={data?.fimg_url}
                  fill
                />
              </div>

            )}
            <h4
              id={data?.acf_fields_group?.intra_title_1.trim()}
              className="mb-[17px] mt-5 font-[700] text-[18.667px] leading-[17px] lg:mt-0"
            >
              {data?.acf_fields_group?.intra_title_1}
            </h4>
            <div
              className="text-[#5C5C5C]"
              dangerouslySetInnerHTML={{
                __html: data?.acf_fields_group?.intra_info,
              }}
            ></div>
            <div className="mt-[40px]">
              <h4
                id={data?.acf_fields_group["inter-deanery_title_1"].trim()}
                className="mb-[17px] font-[700] text-[18.667px] leading-[17px]"
              >
                {data?.acf_fields_group["inter-deanery_title_1"]}
              </h4>

              <div
                className="text-[#5C5C5C]"
                dangerouslySetInnerHTML={{
                  __html: data?.acf_fields_group["inter-deanery_info"],
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#EAEAEA] typo-link pad-section pt-[38px] pb-[60px] flex justify-center items-center gap-[35px] flex-col p-5">

        {data?.howaroracanhelp?.howaroracanhelpyoutopass && (
          <h2 className="mb-[17px] font-[700] text-[25px] leading-[34px]">
            {data.howaroracanhelp.howaroracanhelpyoutopass} hii
          </h2>
        )}
        {data?.howaroracanhelp?.howwecanpasstextcontent ? (
          data.howaroracanhelp.howwecanpasstextcontent.map((content, id) => (
            <div className="" key={id}>
              <div className="flex justify-start flex-col items-start gap-[42px]">
                <div className="flex justify-center items-center gap-3">
                  <svg width="18" height="18" className="min-w-[30px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0C6.61305 0 4.32387 0.948211 2.63604 2.63604C0.948211 4.32387 0 6.61305 0 9C0 11.3869 0.948211 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948211 11.3869 0 9 0Z" fill="#079561" />
                    <path d="M13.5 5.99997L7.5 12L4.5 8.99997" stroke="white" stroke-miterlimit="10" />
                  </svg>
                  <div dangerouslySetInnerHTML={{ __html: content.howaroracanhelptopasstext || "<p>Placeholder text</p>" }} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p> // Display while the data is loading
        )}



      </div> */}



      {data?.acf_fields_group?.details_copy_1 && (
        <div className="container">
          <div
            className={`grid ${data?.acf_fields_group?.details_copy_1.length > 1 ? 'grid-cols-2' : 'grid-cols-1 justify-center'
              } max-[767px]:grid-cols-1 gap-[20px] my-[40px]`}
          >
            {data?.acf_fields_group?.details_copy_1.map((item, key) => (
              <div className="grid" key={key}>
                <div className="relative h-[400px] lg:h-[700px] w-full">
                  <Image
                    className="object-contain block"
                    src={item?.image1?.url}
                    fill
                    alt={item?.image1?.url}
                  />
                </div>

                {/* Button Container */}
                <div
                  className={`${data?.acf_fields_group?.details_copy_1.length > 1 ? '' : 'flex justify-center items-center gap-4 px-[60px]'
                    }`}
                >
                  <Link
                    className="block px-[24px] py-[36px] bg-[#079561] font-[700] text-[18px] leading-[25px] text-center rounded-[40px] my-[18px] text-[#fff] hover:text-[#fff] hover:opacity-[0.85] transition ease-in duration-300"
                    href={item?.url_1}
                  >
                    {item?.title_1}
                  </Link>
                  <Link
                    className="block px-[24px] py-[36px] bg-[#079561] font-[700] text-[18px] leading-[25px] text-center rounded-[40px] text-[#fff] hover:text-[#fff] hover:opacity-[0.85] transition ease-in duration-300"
                    href={item?.url}
                  >
                    {item?.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!data?.acf_fields_group?.table_of_contents_details || data.acf_fields_group.table_of_contents_details.length > 0) && (<div className="bg-[#EAEAEA] typo-link pad-section  my-20 py-20 ">
        <div className="container">
          <h2 className="mb-[17px] font-[700] text-[25px] leading-[34px]">
            {data?.acf_fields_group["idt_application_title"]}
          </h2>
          <h4
            id={data?.acf_fields_group["idt_application_title_1"].trim()}
            className="mb-[17px] font-[700] text-[18.667px] leading-[17px]"
          >
            {data?.acf_fields_group["idt_application_title_1"]}
          </h4>

          <div
            className="text-[#5C5C5C]"
            dangerouslySetInnerHTML={{
              __html: data?.acf_fields_group["idt_application_info"],
            }}
          ></div>
        </div>

        <div className="container mt-10">
          <h2 className="mb-[17px] font-[700] text-[25px] leading-[34px]">
            {data?.acf_fields_group["checking_eligibility_title"]}
          </h2>
          <h4
            id={data?.acf_fields_group["checking_eligibility_title_1"].trim()}
            className="mb-[17px] font-[700] text-[18.667px] leading-[17px]"
          >
            {data?.acf_fields_group["checking_eligibility_title_1"]}
          </h4>

          <div
            className="text-[#5C5C5C]"
            dangerouslySetInnerHTML={{
              __html: data?.acf_fields_group["checking_eligibility_info"],
            }}
          ></div>
        </div>

        <div className="container mt-10">
          <h2 className="mb-[17px] font-[700] text-[25px] leading-[34px]">
            {data?.acf_fields_group["awaiting_outcomes_and_offers_title"]}
          </h2>
          <h4
            id={data?.acf_fields_group["awaiting_outcomes_and_offers_title_1"].trim()}
            className="mb-[17px] font-[700] text-[18.667px] leading-[17px]"
          >
            {data?.acf_fields_group["awaiting_outcomes_and_offers_title_1"]}
          </h4>

          <div
            className="text-[#5C5C5C]"
            dangerouslySetInnerHTML={{
              __html: data?.acf_fields_group["awaiting_outcomes_and_offers_title_info"],
            }}
          ></div>
        </div>
      </div>)}



      {data?.acf_fields_group.length > 0 && (
        <div className="bg-[#EAEAEA] typo-link pad-section pt-[38px] pb-[60px]">
          <div className="container">
            <h2 className="mb-[17px] font-[700] text-[25px] leading-[34px]">
              {data?.acf_fields_group["checking_eligibility_title"]}
            </h2>
            <h4
              id={data?.acf_fields_group["checking_eligibility_title_1"].trim()}
              className="mb-[17px] font-[700] text-[18.667px] leading-[17px]"
            >
              {data?.acf_fields_group["checking_eligibility_title_1"]}
            </h4>

            <div
              className="text-[#5C5C5C]"
              dangerouslySetInnerHTML={{
                __html: data?.acf_fields_group["checking_eligibility_info"],
              }}
            ></div>
          </div>
        </div>
      )}
      {data?.acf_fields_group?.details_copy_3 && (
        <div className="container">
          <div
            className={`grid ${data?.acf_fields_group?.details_copy_3.length > 1 ? 'grid-cols-2' : 'grid-cols-1 justify-center'
              } max-[767px]:grid-cols-1 gap-[20px] my-[40px]`}
          >
            {data?.acf_fields_group?.details_copy_3.map((item, key) => (
              <div className="grid" key={key}>
                <div className="relative h-[400px] lg:h-[700px] w-full">
                  <Image
                    className="object-contain block"
                    src={item?.image3?.url}
                    fill
                    alt={item?.image3?.url}
                  />
                </div>

                {/* Button Container */}
                <div
                  className={`${data?.acf_fields_group?.details_copy_3.length > 1 ? '' : 'flex justify-center items-center gap-4 px-[60px]'
                    }`}
                >
                  <Link
                    className="block px-[24px] py-[36px] bg-[#079561] w-full font-[700] text-[18px] leading-[25px] text-center rounded-[40px] my-[18px] text-[#fff] hover:text-[#fff] hover:opacity-[0.85] transition ease-in duration-300"
                    href={item?.url_1}
                  >
                    {item?.title_1}
                  </Link>
                  <Link
                    className="block px-[24px] py-[36px] w-full bg-[#079561] font-[700] text-[18px] leading-[25px] text-center rounded-[40px] text-[#fff] hover:text-[#fff] hover:opacity-[0.85] transition ease-in duration-300"
                    href={item?.url}
                  >
                    {item?.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {data?.acf_fields_group.length > 0 && (
        <div className="bg-[#EAEAEA] typo-link pt-[38px]">
          <div className="container">
            <h2 className="mb-[17px] mt-[40px] font-[700] text-[25px] leading-[34px]">
              {data?.acf_fields_group["awaiting_outcomes_and_offers_title"]}
            </h2>
            <h4
              id={data?.acf_fields_group[
                "awaiting_outcomes_and_offers_title_1"
              ].trim()}
              className="mb-[17px] font-[700] text-[18.667px] leading-[17px]"
            >
              {data?.acf_fields_group["awaiting_outcomes_and_offers_title_1"]}
            </h4>

            <div
              className="text-[#5C5C5C]"
              dangerouslySetInnerHTML={{
                __html:
                  data?.acf_fields_group[
                  "awaiting_outcomes_and_offers_title_info"
                  ],
              }}
            ></div>
          </div>
        </div>
      )}

      {data?.acf_fields_group?.more_sections_details &&
        <div className="bg-[#EAEAEA] typo-link pb-[60px]">
          <div className="container">
            <div className="grid gap-[20px]">
              {data?.acf_fields_group?.more_sections_details &&
                data?.acf_fields_group?.more_sections_details?.map(
                  (data, key) => (
                    <div key={key}>
                      <h2 className="mb-[17px] mt-[40px] font-[700] text-[25px] leading-[34px]">
                        {data?.title}
                      </h2>
                      <h4
                        id={data?.another_title.trim()}
                        className="mb-[17px] font-[700] text-[18.667px] leading-[17px]"
                      >
                        {data?.another_title}
                      </h4>

                      <div
                        className="text-[#5C5C5C]"
                        dangerouslySetInnerHTML={{
                          __html: data?.info,
                        }}
                      ></div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>}

      {(howAroraCanHelpTitle.length > 0 || howAroraCanHelp.length > 0) && (
        <div className="bg-[#EAEAEA] typo-link pad-section pt-[50px] pb-[60px] flex justify-center items-center gap-[35px] flex-col p-5 w-full">
          {howAroraCanHelpTitle && (
            <h2 className="mb-[17px] font-[700] text-[25px] leading-[34px]">
              {howAroraCanHelpTitle} {/* This should now display correctly */}
            </h2>
          )}

          {/* How Arora Can Help Section */}
          <div className="flex flex-col justify-center items-start  gap-5">
            {howAroraCanHelp.length > 0 && (
              howAroraCanHelp.map((content, id) => (
                <div key={id} className="flex justify-center flex-col items-center gap-[42px]  max-w-[1200px]">
                  <div className="flex justify-center items-center gap-3 w-full">
                    <svg
                      width="18"
                      height="18"
                      className="min-w-[30px] mt-[-12px]"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0C6.61305 0 4.32387 0.948211 2.63604 2.63604C0.948211 4.32387 0 6.61305 0 9C0 11.3869 0.948211 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948211 11.3869 0 9 0Z"
                        fill="#079561"
                      />
                      <path
                        d="M13.5 5.99997L7.5 12L4.5 8.99997"
                        stroke="white"
                        strokeMiterlimit="10"
                      />
                    </svg>
                    {/* HTML Content from howAroraCanHelp */}
                    <div dangerouslySetInnerHTML={{ __html: content || "<p>Placeholder text</p>" }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {data?.acf_fields_group?.author_bio_details &&
        <div className="container">
          <h2 className="my-[45px] py-5 ml-6 font-[700] text-[38px] leading-[34px]">Author Bio</h2>
          <div className="flex flex-wrap gap-[20px] mt-[40px] ">
            {data?.acf_fields_group?.author_bio_details &&
              data?.acf_fields_group?.author_bio_details?.map((data, key) => (
                <div
                  className="flex flex-col author-card p-[20px] flex-grow-0 flex-shrink-0 basis-[calc(50%-20px)] max-[648px]:basis-full max-[648px]:w-full rounded-lg"
                  key={key}
                >
                  <div className="relative h-[400px] lg:h-[700px] w-[100%] ">

                    <Image className="object-cover block" src={data?.image?.url} fill alt={data?.image?.url} />
                  </div>
                  <h2
                    id={data?.title.trim()}
                    className="mb-[17px] mt-[40px] font-[700] text-[25px] leading-[34px]"
                  >
                    {data?.title}
                  </h2>
                  <div
                    className="text-[#5C5C5C]"
                    dangerouslySetInnerHTML={{
                      __html: data?.info,
                    }}
                  ></div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-[40px] w-full">
            <a href='/contact-us' className="bg-[#079561] text-white  hover:text-white  rounded-[40px] px-9 py-6 font-bold flex max-w-[289px] w-full  justify-center">Contact Us</a>
          </div>
        </div>
      }

      {/*  */}

      <div className="py-[80px] ">
        <div className="container">
          <h2 className="text-[38px] leading-[74px] font-[700] mb-[29.3px] text-center">
            Other blogs that may interest you
          </h2>
          <div className="grid grid-cols-3 max-[768px]:grid-cols-2 max-[648px]:grid-cols-1 max-[991px]:gap-[20px] gap-x-[27px] gap-y-[66px]">
            {blogs?.map((blog, key) => (
              <div className="" key={key}>

                <Link className="" href={`/blogs/${blog?.id}`}>
                  <div className="relative h-[244px] w-full aspect-w-4 aspect-h-3">
                    <Image
                      className="object-cover block"
                      src={blog?.fimg_url}
                      width={400}          // Sets a proportional width to height ratio
                      height={200}
                      alt={blog?.fimg_url}
                    />
                  </div>
                </Link>

                {/* title */}
                <Link className="" href={"/blogs/" + blog?.id}>

                  <h3
                    className="text-[25px] max-[991px]:text-[18px] max-[991px]:leading-[25px] leading-[34px] pt-[25px] pb-[11px] font-[700] text-[#1A1E1C]"
                    dangerouslySetInnerHTML={{
                      __html: blog?.title?.rendered,
                    }}
                  ></h3>
                </Link>
                {/* read more */}
                <Link
                  className="inline-block text-[18px] leading-[30px] font-[400] text-[#079561] underline "
                  href={"/blogs/" + blog?.id}
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogsDetails;
