/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { getAllCategories, getPosts, getPostsById } from "@/lib/woredpressApi";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Trustpilot from "../components/home/Trustpilot";
import Select from "react-select";
import SearchResult from "../components/blogs/SearchResult";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([{ value: "", label: "" }]);
  const [loading, setLoading] = useState(true);

  // Get the query string part from the current page URL
  const params = useSearchParams()

  const search = params.get('search');


  useEffect(() => {
    const scrollToTop = () => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 100); // Delay by 100ms to ensure everything is rendered
    };

    scrollToTop();
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const showResult = async () => {
    if (!selectedOption.value) {
      fetchBlogs();
      return;
    }

    if (selectedOption.value) {
      setLoading(true);
      const blogs = await getPostsById(selectedOption.value);
      setLoading(false);
      if (blogs.length) {
        const featureData = blogs.filter((blog) => blog.is_featured);
        const latest = blogs
          .filter((blog) => !blog.is_featured)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setBlogs(latest);
        setFeaturedBlogs(featureData.slice(1, featureData.length));
        setFeaturedBlog(featureData[0]);
      }
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    const categories = await getAllCategories();

    setLoading(false);
    if (categories.length) {
      const arr = categories
        ?.map((category, _) => ({
          value: category?.id,
          label: category?.name,
        }))
        .filter((category, _) => category.label !== "Featured");
      arr.unshift({ value: "", label: "All" });
      setOptions(arr);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    const blogs = await getPosts();

    setLoading(false);
    if (blogs.length) {
      const featureData = blogs.filter((blog) => blog.is_featured);
      const latest = blogs
        .filter((blog) => !blog.is_featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setBlogs(latest);
      setFeaturedBlogs(featureData.slice(1, featureData.length));
      setFeaturedBlog(featureData[0]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (search) {
    return (
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResult />
      </Suspense>
    );
  }


  return (
    <>
      <div className="container">
        <h1 className="text-center text-[60px] leading-[74px] py-[51px] font-[700]">
          Arora Blogs
        </h1>
        <div className="border-b-[1px] border-[#B2B4B6]"></div>

        <div className="grid grid-cols-[112px,574px,auto] max-[1199px]:grid-cols-[112px,1fr,1fr] max-[648px]:grid-cols-1 justify-start gap-[16px] items-center mt-[49px] mb-[47px]">
          <label className="text-[#5C5C5C]">Search Blog:</label>
          <Select
            value={selectedOption}
            className="custom-select"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderWidth: "2px",
                borderColor: state.isFocused ? "#079561" : "",
                boxShadow: state.isFocused ? "0 0 0 1px #079561" : "",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                borderRadius: "40px",
                paddingLeft: "15px"
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: "14px",
                backgroundColor: state.isSelected
                  ? "#079561" // Active selection color
                  : state.isFocused // Hover state
                    ? "#079561"
                    : "#fafafa",
                color: state.isSelected ? "#fff" : "#000", // Change text color for selected option
                cursor: "pointer", // Change cursor to pointer on hover
                transition: "background-color 0.2s", // Optional: smooth transition for background color
              }),
            }}
            onChange={(option) => {
              setSelectedOption(option);
            }}
            options={options}
          />
          <button
            onClick={showResult}
            className="rounded-[40px] font-[700] lg:max-w-[200px] w-full text-[18px] leading-[18px] text-[#079561] border-[#079561] border-[1px] px-[36px] py-[15px] hover:bg-[#079561] hover:text-[#fff] transition-all duration-300"
          >
            Show Result
          </button>
        </div>
        {featuredBlogs.length ? (
          <div className="mb-[94.8px] max-[648px]:mb-5 ">
            <h2 className="text-[38px] leading-[74px] font-[700] mb-[29.3px]">
              Featured Blogs
            </h2>
            <div className="grid grid-cols-2 max-[991px]:grid-cols-1 gap-[54px]">
              <div className="w-full">
                <Link href={"/blog-details/" + featuredBlog?.id}>
                  <img
                    className="block w-full mb-[35.4px]"
                    src={featuredBlog?.fimg_url}
                  />
                </Link>
                {/* date */}
                <div
                  className="text-[18px] leading-[30px] font-[400] text-[#5C5C5C]"
                  dangerouslySetInnerHTML={{
                    __html:
                      new Date(featuredBlog?.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) || "",
                  }}
                ></div>
                {/* title */}
                <Link href={"/blog-details/" + featuredBlog?.id}>
                  <h3
                    className="text-[25px] leading-[34px] pt-[16px] pb-[20px] font-[700] text-[#1A1E1C] hover:text-[#079561]"
                    dangerouslySetInnerHTML={{
                      __html: featuredBlog?.title?.rendered,
                    }}
                  ></h3>
                </Link>
                {/* excerpt */}
                <div
                  className="text-[18px] leading-[30px] font-[400] text-[#5C5C5C] mb-[24px]"
                  dangerouslySetInnerHTML={{
                    __html: featuredBlog?.excerpt?.rendered,
                  }}
                ></div>
                {/* read more */}
                <Link
                  className=" custom-underline  leading-[30px] font-[400] text-[#079561] "
                  href={"/blog-details/" + featuredBlog?.id}
                >
                  Read More
                </Link>
              </div>
              <div className="grid grid-flow-row gap-[30px]">
                {featuredBlogs?.map((featuredBlog, key) => (
                  <div
                    className="w-full grid grid-cols-2 max-[648px]:grid-cols-1 gap-[27px] border-b-[1px] border-[#B2B4B6] featured-list"
                    key={key}
                  >
                    <Link href={"/blog-details/" + featuredBlog?.id}>

                      <img
                        className="block w-full  max-[648px]:mb-0 "
                        src={featuredBlog?.fimg_url}
                      />
                    </Link>
                    <div>
                      {/* date */}
                      <div
                        className="text-[18px] leading-[30px] font-[400] text-[#5C5C5C]"
                        dangerouslySetInnerHTML={{
                          __html:
                            new Date(featuredBlog?.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            ) || "",
                        }}
                      ></div>
                      {/* title */}
                      <Link href={"/blog-details/" + featuredBlog?.id} >
                        <h3
                          className="text-[18px] leading-[28px] pt-[14px] hover:text-[#079561] pb-[9px] font-[700] text-[#1A1E1C]"
                          dangerouslySetInnerHTML={{
                            __html: featuredBlog?.title?.rendered,
                          }}
                        ></h3>
                      </Link>
                      {/* read more */}
                      <Link
                        className="inline-block text-[18px] leading-[30px] font-[400] text-[#079561] custom-underline max-[648px]:mb-[27px]"
                        href={"/blog-details/" + featuredBlog?.id}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-[18px] leading-[74px] font-[500] mb-[29.3px]">
            No Featured Blogs Found
          </h2>
        )}
      </div>
      <div className="bg-[#EAEAEA] py-[80px] max-[767px]:pb-[47px] max-[767px]:pt-[0px]">
        <div className="container">
          <h2 className="text-[38px] leading-[74px]  pt-[30px] lg:pt-0 font-[700] mb-[29.3px]">
            Latest Blogs
          </h2>
          {blogs.length ? (
            <div className="grid grid-cols-3 max-[768px]:grid-cols-2 max-[648px]:grid-cols-1 gap-x-[27px] gap-y-[66px] max-[991px]:gap-[20px]">
              {blogs?.map((blog, key) => (
                <div className="" key={key}>
                  <Link href={"/blog-details/" + blog?.id}>

                    <div className="relative  h-[244px] w-[100%] ">

                      <Image className="object-contain block" src={
                        blog?.fimg_url
                          ? blog?.fimg_url
                          : "https://placehold.jp/eeeeee/cccccc/200x150.png?text=No%20Image"
                      } fill alt="blog img" />
                    </div>
                  </Link>
                  {/* title */}
                  <Link href={"/blog-details/" + blog?.id}>

                    <h3
                      className="text-[20px] max-[991px]:text-[14px] max-[991px]:leading-[25px] hover:text-[#079561] py-[1px] leading-[34px] mt-[25px] mb-[11px] font-bold text-[#1A1E1C]"
                      dangerouslySetInnerHTML={{
                        __html: blog?.title?.rendered,
                      }}
                    ></h3>
                  </Link>
                  {/* read more */}
                  <Link
                    className="inline-block text-[18px] leading-[30px] font-[400] text-[#079561] custom-underline "
                    href={"/blog-details/" + blog?.id}
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-[18px] leading-[74px] font-[500] mb-[29.3px]">
              No Latest Blogs Found
            </h2>
          )}
        </div>
      </div>
      <Trustpilot />
    </>
  );
}



export default function Blogs() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsPage />
    </Suspense>
  );
}
