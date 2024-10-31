import React from "react";
import "./home.css";
import Link from "next/link";

const Mobile = ({ mobileData }) => {
  return (
    <section className="mobile-app-section">
      <div className="container">
        <div className="mobile-wrap">
          <div className="app_content">
            <h1 dangerouslySetInnerHTML={{ __html: mobileData?.title }}></h1>
            <p>{mobileData?.description}</p>
            <ul className="app_btn_list desktop-show-block-apps">
              <li>
                <Link href={mobileData?.androidlink}>
                  <img
                    src={mobileData?.["androidlogo"] || "null"}
                    alt="android logo"
                    style={{ height: "40px", width: "120px" }}
                  />
                </Link>
              </li>
              <li>
                <Link href={mobileData?.ioslink}>
                  <img src={mobileData?.["ioslogo"] || "null"} alt="ios logo" />   
                </Link>
              </li>
            </ul>
          </div>
          <div className="app_img ">
            <div className="hmoblogs-app mobile-show-block">
              <div className="logos-block">
              <Link href={mobileData?.androidlink}>
            <img
              src={mobileData?.["android_mobile_logo"] || "null"}
              alt="mobile feature logo"
            />
            </Link>
            </div>
            <div className="logos-block">
            <Link href={mobileData?.ioslink}>
            <img
              src={mobileData?.["ios_mobile_logo"] || "null"}
              alt="mobile feature logo"
            />
            </Link>
            </div>
            </div>
            <img
              src={mobileData?.["featuredlogo"] || "null"}
              alt="mobile feature logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mobile;
