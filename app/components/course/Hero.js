"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./course.css"; // Import the CSS file for custom styles
import { toast } from "react-toastify";

import ImageGallery from "react-image-gallery";
import Link from "next/link";
import { addToCart } from "@/lib/woredpressApi";
import Spinner from "../micro/spinner/Spinner";
import { useRouter } from "next/navigation";

const Hero = ({ hero }) => {
  const [loading, setLoading] = useState(false);
  const slides = hero.slider_images || [];
  const router = useRouter();
  const [token, setToken] = useState("");
  const slug = window.location.pathname;


  useEffect(() => {
    if (typeof window !== undefined) {
      const tk = localStorage.getItem("token");
      setToken(tk);
    }
  }, []);

  const images = slides.map((slide) => ({
    original: slide.thumbnail_image,
    thumbnail: slide.thumbnail_image,
  }));

  function processText(text) {
    if (!text) return null;
    return text.split("\r\n").map((line, index) => (
      <React.Fragment key={index}>
        <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />{" "}
        {line}
        {index < text.split("\r\n").length - 1 && <br />}
      </React.Fragment>
    ));
  }

  const handleAddToCart = async () => {
    setLoading(true);
    const tk = localStorage.getItem("token")
    if (!tk) {
      const courses = JSON.parse(localStorage.getItem("courses"));
      if (courses?.length) {
        const temp = [...courses];
        const index = temp.findIndex(
          (course, key) => course.id == hero.ultimate_package_id
        );

        if (index !== -1) {
          temp[index].quantity += 1;
          temp[index].price = temp[index].price * temp[index].quantity;
          localStorage.setItem("courses", JSON.stringify(temp));
        }

        if (index == -1) {
          temp.push({
            id: hero?.ultimate_package_id,
            // package: hero?.heading,
            package:"AKT Ultimate Package-12 Months",
            quantity: 1,
            price: hero?.packageOldPrice.replace("£", ""),
            // imgUrl:
            //   images[0]?.original ||
            //   "https://via.placeholder.com/150/808080/808080",
            imgUrl: "https://aroramedical.ebizonstaging.com/wp-content/uploads/2023/05/AKT-Ultimate-Package-300x300-1.jpg" || "https://via.placeholder.com/150/808080/808080",
            slug

          });
          localStorage.setItem("courses", JSON.stringify(temp));
        }
      } else {
        const courses = [];
        courses.push({
          id: hero?.ultimate_package_id,
          // package: hero?.heading,
          package:"AKT Ultimate Package-12 Months",
          quantity: 1,
          price: hero?.packageOldPrice.replace("£", ""),
          // imgUrl:
          //   images[0]?.original ||
          //   "https://via.placeholder.com/150/808080/808080",
          imgUrl: "https://aroramedical.ebizonstaging.com/wp-content/uploads/2023/05/AKT-Ultimate-Package-300x300-1.jpg" || "https://via.placeholder.com/150/808080/808080",
          slug

        });
        localStorage.setItem("courses", JSON.stringify(courses));
      }

      toast("Item added to cart", {
        type: "success",
        position: "top-center",
      });
      router.push("/cart");
      setLoading(false);
      return;
    }

    const res = await addToCart(hero.ultimate_package_id, 1, slug);
    if (res?.items?.length) {
      toast("Item added to cart", {
        type: "success",
        position: "top-center",
      });
      router.push("/cart");
      setLoading(false);
    } else {
      toast("Failed to add item", {
        type: "error",
        position: "top-center",
      });
      setLoading(false);
    }
  };

  return (
    <div className="course-banner-sec">
      <div className="container ">
        <div className="hero-sections">
          <div className=" hero-sectio-inner">
            <h1 className="hero-heading">{hero.heading}</h1>
            <h5 className="hero-subHeading">{hero.subheading}</h5>
            <p
              className="hero-content"
              dangerouslySetInnerHTML={{ __html: hero.features }}
            ></p>
            <div className="hero-pricearea">
              <div className="price-wrap">
                <p className="package-price">{hero.packageOldPrice}</p>
                <p className="package-newprice">
                  <del>{hero.packageNewPrice}</del>
                </p>
              </div>
              <h4 className="package-save">{hero.packageSave}</h4>
            </div>
            <Link
              onClick={async (e) => {
                e.preventDefault();
                handleAddToCart();
              }}
              href="#"
              className="inline-block whitespace-nowrap green-fillbtn mt-[55px] hover:text-[#fff]"
            >
              {!loading ? (
                hero.buyButton
              ) : (
                <div className="flex justify-center items-center">
                  <Spinner /> Processing...
                </div>
              )}
            </Link>
          </div>
          <div className="relative herobanner-slide">
            <div className="relative herobanner-slide-content">
              <ImageGallery items={images} showPlayButton={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
