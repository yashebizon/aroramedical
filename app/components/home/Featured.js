// components/Feature.js
import React from "react";
import "./home.css";

const Featured = ({ featuredIn }) => {
  return (
    <>
      <div className="featuredBlock px-4 sm:px-6 lg:px-8">
        <div className="container">
          <div className=" mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="feature-block feature-group">
                <h2 className=" font-semibold">{featuredIn?.featuredtitle}</h2>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src={featuredIn?.["featured-image1"] || "null"}
                      alt="Featured Image 1"
                    />
                  </div>

                  <div className="flex-shrink-0">
                    <img
                      src={featuredIn?.["featured-image2"] || "null"}
                      alt="Featured Image 1"
                    />
                  </div>
                </div>
              </div>
              <div className="feature-block">
                <h2 className=" font-semibold mb-6">
                  {featuredIn?.Excellencetitle}
                </h2>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={featuredIn?.["Excellenceimg1"] || "null"}
                      alt="Featured Image 1"
                    />
                  </div>

                  <div className="flex-shrink-0">
                    <img
                      src={featuredIn?.["Excellenceimg2"] || "null"}
                      alt="Featured Image 1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
