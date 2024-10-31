import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookSquare,
} from "react-icons/fa";
import Link from "next/link";

const Introduction = ({ IntroData }) => {
  return (
    <div className=" section-wrap">
      <div className="container">
        <div className="flex testimonial-sec justify-between items-center ">
          <div className="wrap-img-box">
            <div className="profile-block">
              <img
                src={IntroData.introfeaturedimg}
                alt="Profile"
                className="w-full mb-4"
              />
            </div>

            <div className="mt-8 md:mt-0 description-box">
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* <img src={image} alt="Profile" className="w-full rounded-lg mb-4" /> */}
                <h3 className=" font-bold">{IntroData.introtitle}</h3>
                <p className="text-gray-600 des-content">
                  {IntroData.introdesignation}
                </p>
                <p className="text-gray-500 mt-2 des-details">
                  {IntroData.education}
                </p>
                {/* <div className="flex mt-4 space-x-2 social-icon-block">

                <Link href={IntroData.fblink ? (
                      IntroData.fblink
                    ) : '#'}>
                      { <FaFacebookSquare  className="w-5 h-5" /> ? (
                      <FaFacebookSquare  className="w-5 h-5" />
                    ) : 'View'}
                      
                    </Link>
                    <Link href={IntroData.twitterlink ? (
                      IntroData.twitterlink
                    ) : '#'}>
                      {  <FaTwitter className="w-5 h-5" /> ? (
                      <FaTwitter className="w-5 h-5" />
                    ) : 'View'}
                      
                    </Link>

                    <Link href={IntroData.Instalink ? (
                      IntroData.Instalink
                    ) : '#'}>
                      {  <FaInstagram className="w-5 h-5" /> ? (
                     <FaInstagram className="w-5 h-5" />
                    ) : 'View'}
                      
                    </Link>
                    <Link href={IntroData.linkdinlink ? (
                      IntroData.linkdinlink
                    ) : '#'}>
                      { <FaLinkedinIn className="w-5 h-5" /> ? (
                    <FaLinkedinIn className="w-5 h-5" />
                    ) : 'View'}
                      
                    </Link>
             
               
                </div> */}
              </div>
            </div>
          </div>

          <div className=" mt-8 md:mt-0 right-details">
            <h2 className=" font-bold">{IntroData.introtitle}</h2>
            <h2 className=" mb-4">{IntroData.introdesignation}</h2>
            <p className="text-gray-700 mb-6 intro-grid">
              {IntroData.introdescription}
            </p>
            <div className=" flex flex-wrap">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 intro-Btn-pre">
                <Link href={IntroData?.aboutlink ? IntroData?.aboutlink : "#"}>
                  {IntroData.AboutLinktext
                    ? IntroData.AboutLinktext
                    : "View Details"}
                </Link>
              </button>
              <button className="bg-white text-blue-600 px-4 py-2 rounded border border-blue-600 hover:bg-blue-100 transition duration-300 intro-Btn-next">
                <Link
                  href={
                    IntroData?.whoworkwithlink
                      ? IntroData?.whoworkwithlink
                      : "#"
                  }
                >
                  {IntroData?.whoworkwithtext
                    ? IntroData?.whoworkwithtext
                    : "View Details"}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
