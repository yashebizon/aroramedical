"use client";
import Link from "next/link";
import CourseModal from "./PackageCourseModal";
import React, { useEffect, useState, useContext } from "react";
import {
  addToCart,
  fetchCrossSells,
  getCourseProductDetails,
} from "@/lib/woredpressApi";
import { toast } from "react-toastify";
import Spinner from "../micro/spinner/Spinner";
import { useRouter } from "next/navigation";
import Dropdown from "../dropdown/Dropdown.js";
import { CartContext } from "@/app/layout";

// Function to process text and convert newlines to JSX
function processText(text) {
  if (!text) return null;

  return text.split("\r\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split("\r\n").length - 1 && <br />}
    </React.Fragment>
  ));
}

const CoursePackage = ({ coursePackage }) => {
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [packageopen, setpackageopen] = useState(null);
  const [loadingSilver, setLoadingSilver] = useState(false);
  const [loadingGold, setLoadingGold] = useState(false);
  const [loadingUltimate, setLoadingUltimate] = useState(false);
  const [loadingMockExam, setLoadingMockExam] = useState(false);
  const { cart, setCart, cartCounts, setCartCounts } = useContext(CartContext);
  const router = useRouter();
  const pathname = window.location.pathname;

  const durationMapping = {
    "1 Month": "1-month",
    "3 Months": "3-months",
    "6 Months": "6-months",
    "12 Months": "12-months",
  };

  const [mockItems, setMockItems] = useState({
    id: coursePackage?.mockExam?.mockExam_package_id,
    duration: "12-months",
    price: coursePackage?.mockExam?.packageNewPrice,
    options: [],
  });

  const [goldItems, setGoldItems] = useState({
    id: coursePackage?.goldPackage?.gold_package_id,
    duration: "12-months",
    price: coursePackage?.goldPackage?.packageNewPrice,
    options: [],
  });

  const [silverItems, setSilverItems] = useState({
    id: coursePackage?.silverPackage?.silver_package_id,
    duration: "12-months",
    price: coursePackage?.silverPackage?.packageNewPrice,
    options: [],
  });

  const [ultimateItems, setUltimateItems] = useState({
    id: coursePackage?.ultimatePackage?.ultimate_package_id,
    duration: "12-months",
    price: coursePackage?.ultimatePackage?.packageNewPrice,
    options: [],
  });

  useEffect(() => {
    if (typeof window == undefined) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    getCourseProductDetails()
      .then((res) => {
        const goldPackage = res?.find(
          (course) =>
            course?.id?.toString() ===
            coursePackage?.goldPackage?.gold_package_id?.toString()
        );
        const silverPackage = res?.find(
          (course) =>
            course?.id?.toString() ===
            coursePackage?.silverPackage?.silver_package_id?.toString()
        );
        const ultimatePackage = res?.find(
          (course) =>
            course?.id?.toString() ===
            coursePackage?.ultimatePackage?.ultimate_package_id?.toString()
        );

        const mockExamPackage = res?.find(
          (course) =>
            course?.id?.toString() ===
            coursePackage?.mockExamPackage?.mockExam_package_id?.toString()
        );

        if (goldPackage?.attributes) {
          setGoldItems({
            ...goldItems,
            options: goldPackage?.attributes?.pa_duration,
            variations: goldPackage?.variations,
          });
        }
        if (silverPackage?.attributes) {
          setSilverItems({
            ...silverItems,
            options: silverPackage?.attributes?.pa_duration,
            variations: silverPackage?.variations,
          });
        }
        if (ultimatePackage?.attributes) {
          setUltimateItems({
            ...ultimateItems,
            options: ultimatePackage?.attributes?.pa_duration,
            variations: ultimatePackage?.variations,
          });
        }
        if (mockExamPackage?.attributes) {
          setMockItems({
            ...mockItems,
            options: mockExamPackage?.attributes?.pa_duration,
            variations: mockExamPackage?.variations,
          });
        }
      })
      .catch((err) => {});
  }, []);

  const handleCourseModal = (content) => {
    setModalContent(content);
    setShowModal(!showModal);
  };

  const packageCollapse = (event) => {
    event.preventDefault();
    setpackageopen(!packageopen);
  };

  const handleAddToCart = async ({ pkg, pkgId, qty, from, slug, month }) => {
    console.log({
      pkg,
      pkgId,
      qty,
      from,
      slug,
      month,
    });

    const tk = localStorage.getItem("token"); // Get the user token from localStorage
    let crossSells = await handleCrossSells(pkgId); // Handle cross-sells logic for the package

    // If the user is NOT logged in (i.e., no token in localStorage)
    if (!tk) {
      // Try to fetch existing courses from localStorage
      let courses = JSON.parse(localStorage.getItem("courses")) || [];

      // Find if the course already exists in the cart with the same package ID and month
      const index = courses.findIndex(
        (course) => course.id === pkgId && course.month === month
      );
      const duration = Object.keys(durationMapping).find(
        (key) => durationMapping[key] === month
      );

      if (index !== -1) {
        // If the course with the same ID and month exists, update its quantity
        courses[index].quantity += qty;
        courses[index].price = (
          parseFloat(pkg.packageOldPrice.replace("£", "")) *
          courses[index].quantity
        ).toFixed(2);
      } else {
        // If the course does not exist with the same month, add a new entry
        courses.push({
          id: pkgId,
          package: `${pkg.packageName} - ${duration}`,
          quantity: qty,
          price: pkg?.packageOldPrice.replace("£", ""),
          imgUrl:
            pkg.package_image ||
            "https://via.placeholder.com/150/808080/808080",
          slug: slug.pathname,
          crossSells: crossSells,
          month,
        });
      }

      // Update the localStorage with the new/updated courses array
      localStorage.setItem("courses", JSON.stringify(courses));

      // Show success toast and redirect to cart
      toast("Item added to cart", {
        type: "success",
        position: "top-center",
      });
      setCartCounts(qty)
      router.push("/cart");

      // Set the loading state back to false for the specific package
      if (from === "silver") {
        setLoadingSilver(false);
      } else if (from === "gold") {
        setLoadingGold(false);
      } else if (from === "ultimate") {
        setLoadingUltimate(false);
      } else if (from === "mockExam") {
        setLoadingMockExam(false);
      }

      return; // Stop further execution if the user is not logged in
    }

    // If the user is logged in, call the API to add the item to the cart
    const res = await addToCart(pkgId, qty, slug, crossSells, month);

    if (res?.items?.length) {
      // If the item was successfully added to the cart, show success toast and redirect to cart
      toast("Item added to cart", {
        type: "success",
        position: "top-center",
      });
      localStorage.setItem("cartCount", qty);
      router.push("/cart");
    } else {
      // If adding the item failed, show error toast
      toast("Failed to add item", {
        type: "error",
        position: "top-center",
      });
    }

    // Set loading state to false regardless of the success or failure
    if (from === "silver") {
      setLoadingSilver(false);
    } else if (from === "gold") {
      setLoadingGold(false);
    } else if (from === "ultimate") {
      setLoadingUltimate(false);
    } else if (from === "mockExam") {
      setLoadingMockExam(false);
    }
  };

  const handleSelect = (item, coursePackage) => {
    const mappedDuration = durationMapping[item];
    if (coursePackage === "gold") {
      const pck = goldItems?.variations?.find(
        (el) => el?.attributes?.pa_duration === mappedDuration[item]
      );
      setGoldItems({
        ...goldItems,
        duration: mappedDuration,
        id: pck?.id,
        price: pck?.price,
      });
    }
    if (coursePackage === "silver") {
      const pck = silverItems?.variations?.find(
        (el) => el?.attributes?.pa_duration === mappedDuration[item]
      );

      setSilverItems({
        ...silverItems,
        duration: mappedDuration,
        id: pck?.id,
        price: pck?.price,
      });
    }

    if (coursePackage === "ultimate") {
      const pck = ultimateItems?.variations?.find(
        (el) => el?.attributes?.pa_duration === durationMapping[item]
      );
      setUltimateItems({
        ...ultimateItems,
        duration: mappedDuration,
        id: pck?.id,
        price: pck?.price,
      });
    }

    if (coursePackage === "mock") {
      const pck = mockItems?.variations?.find(
        (el) => el?.attributes?.pa_duration === durationMapping[item]
      );
      setMockItems({
        ...mockItems,
        duration: mappedDuration,
        id: pck?.id,
        price: pck?.price,
      });
    }
  };

  const handleCrossSells = async (pkgId) => {
    const res = await fetchCrossSells(pkgId);
    if (res?.cross_sells?.length) {
      return res.cross_sells;
    }
  };
  function capitalizeFirstLetter(string) {
    if (!string) return ""; // Handle empty strings
    const newString= string.split(" ");
    let finalString=[];
    for(let i=0;i<newString[1].length;i++){
      if(i==0){
        finalString.push(newString[1].charAt(i).toUpperCase());
      }else{
        finalString.push(newString[1].charAt(i).toLowerCase());
      }
    }
    newString[1]= finalString.join("");
    return newString.join(' ');
    // console.log(newString.join(' '),"newString")
    // console.log(newString[1].push(finalString.join("")).join(""),"newString");
    // const result = string
    //   .split(" ")
    //   .map((item, index, arr) =>
    //     index === 1
    //       ? item.split().map((item, index) =>
    //           index == 0 ? item.toUpperCase() : item.toLowerCase()
    //         )
    //       : item
    //   )
    //   .join(" ");

    // console.log(result);

    // return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const toggleDropdown = (course) => {
    setOpenDropdown((prev) => (prev === course ? null : course)); // Toggle dropdown for the specific course
  };

  return (
    <>
      <div className="course-package-block" id="courseBLockSec">
        <div className="container">
          <h2 className="h2-line text-center mb-[86px]">
            Our AKT Course Packages
          </h2>
          <div className="package-row">
            <div className="silver">
              <div className="package-inner-block">
                <h4 className="">
                  {capitalizeFirstLetter(
                    coursePackage.silverPackage.packageName
                  )}
                </h4>
                <p className="package-shortdes">
                  {processText(coursePackage.silverPackage.shortDescription)}
                </p>
                <div className=" price-wrap">
                  <p className="package-price">
                    {coursePackage.silverPackage.packageOldPrice}
                  </p>
                  <p className="package-newprice">
                    <del>{coursePackage.silverPackage.packageNewPrice}</del>
                  </p>
                </div>
                <h4 className="package-save">
                  {coursePackage.silverPackage.packageSave}
                </h4>

                <div
                  className={`${
                    packageopen ? "collapseopen" : "packageclose"
                  } packageclose`}
                >
                  <h5 className="package-videocourse-head">
                    {coursePackage.silverPackage.packageVideoCourseHeading}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.silverPackage.videocoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-vcourse-con">
                    {processText(
                      coursePackage.silverPackage.packageVideoCourseContent
                    )}
                  </p>
                  <h5 className="package-mockexam">
                    {coursePackage.silverPackage.packageMockExamHeading}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.silverPackage.mockcoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-examcon">
                    {processText(
                      coursePackage.silverPackage.packageMockExamContent
                    )}
                  </p>
                </div>
                <div className="packages-links">
                  <Link className="demo-link" href="#">
                    View Demo
                  </Link>
                  <span className="mobile-view-only">|</span>
                  <button
                    onClick={packageCollapse}
                    className="demo-link mobile-view-only"
                  >
                    {packageopen ? "View Less" : "View Details"}
                  </button>
                </div>
                <div className="purchase-links relative">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      if (loadingSilver) return;
                      toggleDropdown("silver");
                    }}
                    className="purchage-linktext"
                    href="#"
                  >
                    {!loadingSilver ? (
                      "Purchase Now"
                    ) : (
                      <div className="flex justify-center items-center">
                        <Spinner /> Processing...
                      </div>
                    )}
                  </Link>
                  <Dropdown
                    isOpen={openDropdown === "silver"} // Control whether the dropdown is open
                    toggleDropdown={() => toggleDropdown("silver")}
                    items={silverItems}
                    onSelect={async (selectedDuration) => {
                      setLoadingSilver(true);
                      const mappedDuration = durationMapping[selectedDuration];
                      if (
                        !silverItems?.variations ||
                        silverItems.variations.length === 0
                      ) {
                        console.error(
                          "Silver Items or Variations are not available"
                        );
                        setLoadingSilver(false);
                        return;
                      }

                      const matchingVariation = silverItems.variations.find(
                        (variation) =>
                          variation?.attributes?.pa_duration === mappedDuration
                      );

                      if (!matchingVariation) {
                        console.error(
                          "No matching variation found for selected duration"
                        );
                        setLoadingSilver(false);
                        return;
                      }

                      console.log("silverVariations: ", matchingVariation);
                      const payload = {
                        pkg: {
                          ...coursePackage.silverPackage,
                          packageOldPrice: matchingVariation?.price,
                        },
                        // pkgId: coursePackage.silverPackage.silver_package_id,
                        pkgId: matchingVariation?.id,
                        qty: 1,
                        from: "silver",
                        slug: { pathname },
                        month: mappedDuration,
                      };
                      try {
                        await handleAddToCart(payload);
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                      } finally {
                        setLoadingSilver(false);
                      }
                    }}
                    coursePackage="silver"
                  />
                </div>
              </div>
            </div>
            <div className="gold">
              <div className="package-inner-block">
                <h4 className="">{capitalizeFirstLetter(coursePackage.goldPackage.packageName)}</h4>
                <p className="package-shortdes">
                  {processText(coursePackage.goldPackage.shortDescription)}
                </p>
                <div className="price-wrap">
                  <p className="package-price">
                    {coursePackage.goldPackage.packageOldPrice}
                  </p>
                  <p className="package-newprice">
                    <del>{coursePackage.goldPackage.packageNewPrice}</del>
                  </p>
                </div>
                <div
                  className={`${
                    packageopen ? "collapseopen" : "packageclose"
                  } packageclose`}
                >
                  <h4 className="package-save">
                    {coursePackage.goldPackage.packageSave}
                  </h4>
                  <h5 className="package-videocourse-head">
                    {coursePackage.goldPackage.packageVideoCourseHeading}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.goldPackage.videocoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-vcourse-con">
                    {processText(
                      coursePackage.goldPackage.packageVideoCourseContent
                    )}
                  </p>
                  <h5 className="package-mockexam">
                    {coursePackage.goldPackage.packageMockExamHeading}

                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.goldPackage.mockcoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-examcon">
                    {processText(
                      coursePackage.goldPackage.packageMockExamContent
                    )}
                  </p>
                  <h5 className="package-mockexam">
                    {coursePackage.goldPackage.packageAudioCourses}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.goldPackage.audiocoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-examcon">
                    {processText(
                      coursePackage.goldPackage.packageAudioCoursesContent
                    )}
                  </p>
                  <h5 className="package-mockexam">
                    {coursePackage.goldPackage.packageFlashcards}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.goldPackage.flashcardcoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-examcon">
                    {processText(
                      coursePackage.goldPackage.packageFlashcardsContent
                    )}
                  </p>
                </div>
                <div className="packages-links">
                  <Link className="demo-link" href="#">
                    View Demo
                  </Link>
                  <span className="mobile-view-only">|</span>
                  <button
                    onClick={packageCollapse}
                    className="demo-link mobile-view-only"
                  >
                    {packageopen ? "View Less" : "View Details"}
                  </button>
                </div>
                <div className="purchase-links">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      if (loadingGold) return;
                      toggleDropdown("gold");
                    }}
                    className="purchage-linktext"
                    href="#"
                  >
                    {!loadingGold ? (
                      "Purchase Now"
                    ) : (
                      <div className="flex justify-center items-center">
                        <Spinner /> Processing...
                      </div>
                    )}
                  </Link>
                  <Dropdown
                    isOpen={openDropdown === "gold"} // Control whether the dropdown is open
                    toggleDropdown={() => toggleDropdown("gold")}
                    items={goldItems}
                    onSelect={async (selectedDuration) => {
                      setLoadingGold(true);
                      const mappedDuration = durationMapping[selectedDuration];

                      if (
                        !goldItems?.variations ||
                        goldItems.variations.length === 0
                      ) {
                        console.error(
                          "Gold Items or Variations are not available"
                        );
                        setLoadingGold(false);
                        return;
                      }

                      const matchingVariation = goldItems.variations.find(
                        (variation) =>
                          variation?.attributes?.pa_duration === mappedDuration
                      );

                      if (!matchingVariation) {
                        console.error(
                          "No matching variation found for selected duration"
                        );
                        setLoadingGold(false);
                        return;
                      }

                      const payload = {
                        pkg: {
                          ...coursePackage.goldPackage,
                          packageOldPrice: matchingVariation?.price,
                        },
                        // pkgId: coursePackage.goldPackage.gold_package_id,
                        pkgId: matchingVariation?.id,
                        qty: 1,
                        from: "gold",
                        slug: { pathname },
                        month: mappedDuration,
                      };
                      try {
                        await handleAddToCart(payload);
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                      } finally {
                        setLoadingGold(false);
                      }
                    }}
                    coursePackage="gold"
                  />
                </div>
              </div>
            </div>
            <div className="Ultimate ultimate-package ">
              <h4 className="block-head">BEST VALUE</h4>
              <div className="package-inner-block">
                <h4 className="">
                  {coursePackage.ultimatePackage.packageName}
                </h4>
                <p className="package-shortdes">
                  {processText(coursePackage.ultimatePackage.shortDescription)}
                </p>
                <div className="price-wrap">
                  <p className="package-price">
                    {coursePackage.ultimatePackage.packageOldPrice}
                  </p>
                  <p className="package-newprice">
                    <del>{coursePackage.ultimatePackage.packageNewPrice}</del>
                  </p>
                </div>
                <h4 className="package-save">
                  {coursePackage.ultimatePackage.packageSave}
                </h4>
                <div
                  className={`${
                    packageopen ? "collapseopen" : "packageclose"
                  } packageclose`}
                >
                  <h5 className="package-videocourse-head">
                    {coursePackage.ultimatePackage.packageVideoCourseHeading}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.ultimatePackage.videocoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-vcourse-con">
                    {processText(
                      coursePackage.ultimatePackage.packageVideoCourseContent
                    )}
                  </p>
                  <h5 className="package-mockexam">
                    {coursePackage.ultimatePackage.packageMockExamHeading}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.ultimatePackage.mockcoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-examcon">
                    {processText(
                      coursePackage.ultimatePackage.packageMockExamContent
                    )}
                  </p>
                  <h5 className="package-mockexam">
                    {coursePackage.ultimatePackage.packageAudioCourses}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.ultimatePackage.audiocoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-examcon">
                    {processText(
                      coursePackage.ultimatePackage.packageAudioCoursesContent
                    )}
                  </p>
                  <h5 className="package-mockexam">
                    {coursePackage.ultimatePackage.packageFlashcards}
                    <span
                      className="qpopup-links inline-block align-sub ml-[10px]"
                      onClick={() =>
                        handleCourseModal(
                          coursePackage.ultimatePackage
                            .flashcardcoursepopupcontent
                        )
                      }
                    >
                      {" "}
                      <img alt="question" src="/images/question.png" />
                    </span>
                  </h5>
                  <p className="package-examcon">
                    {processText(
                      coursePackage.ultimatePackage.packageFlashcardsContent
                    )}
                  </p>
                  <h5 className="package-mockexam add-virtual">
                    {coursePackage.ultimatePackage.packageLiveVirtualCourses}
                  </h5>
                  <p className="package-examcon">
                    {processText(
                      coursePackage.ultimatePackage
                        .packageLiveVirtualCoursesContent
                    )}
                  </p>
                </div>
                <div className="packages-links">
                  <Link className="demo-link" href="#">
                    View Demo
                  </Link>
                  <span className="mobile-view-only">|</span>
                  <button
                    onClick={packageCollapse}
                    className="demo-link mobile-view-only"
                  >
                    {packageopen ? "View Less" : "View Details"}
                  </button>
                </div>
                <div className="purchase-links">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      if (loadingUltimate) return;
                      toggleDropdown("ultimate");
                    }}
                    className="purchage-linktext "
                    href="#"
                  >
                    {!loadingUltimate ? (
                      "Purchase Now"
                    ) : (
                      <div className="flex justify-center items-center">
                        <Spinner /> Processing...
                      </div>
                    )}
                  </Link>
                  <Dropdown
                    isOpen={openDropdown === "ultimate"} // Control whether the dropdown is open
                    toggleDropdown={() => toggleDropdown("ultimate")}
                    items={ultimateItems}
                    onSelect={async (selectedDuration) => {
                      setLoadingUltimate(true);
                      const mappedDuration = durationMapping[selectedDuration];
                      if (
                        !ultimateItems?.variations ||
                        ultimateItems.variations.length === 0
                      ) {
                        console.error(
                          "Ultimate Items or Variations are not available"
                        );
                        setLoadingUltimate(false);
                        return;
                      }

                      const matchingVariation = ultimateItems.variations.find(
                        (variation) =>
                          variation?.attributes?.pa_duration === mappedDuration
                      );

                      if (!matchingVariation) {
                        console.error(
                          "No matching variation found for selected duration"
                        );
                        setLoadingUltimate(false);
                        return;
                      }

                      const payload = {
                        pkg: {
                          ...coursePackage.ultimatePackage,
                          packageOldPrice: matchingVariation?.price,
                        },
                        // pkgId: coursePackage.ultimatePackage.ultimate_package_id,
                        pkgId: matchingVariation?.id,
                        qty: 1,
                        from: "ultimate",
                        slug: { pathname },
                        month: mappedDuration,
                      };
                      try {
                        await handleAddToCart(payload);
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                      } finally {
                        setLoadingUltimate(false);
                      }
                    }}
                    coursePackage="ultimate"
                  />
                </div>
              </div>
            </div>
            <div className="mock-exam ">
              <div className="package-inner-block">
                <h4 className="">{coursePackage.mockExam.packageName}</h4>
                <p className="package-shortdes">
                  {processText(coursePackage.mockExam.shortDescription)}
                </p>
                <div className="price-wrap">
                  <p className="package-price">
                    {coursePackage.mockExam.packageOldPrice}
                  </p>
                  <p className="package-newprice">
                    <del>{coursePackage.mockExam.packageNewPrice}</del>
                  </p>
                </div>
                <div
                  className={`${
                    packageopen ? "collapseopen" : "packageclose"
                  } packageclose`}
                >
                  <p
                    className="package-examcon"
                    dangerouslySetInnerHTML={{
                      __html: coursePackage.mockExam.packageContent,
                    }}
                  ></p>
                </div>
                <div className="packages-links">
                  <button
                    onClick={packageCollapse}
                    className="demo-link mobile-view-only"
                  >
                    {packageopen ? "View Less" : "View Details"}
                  </button>
                </div>
                <div className="purchase-links">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      if (loadingMockExam) return; // Prevent double click if already loading
                      toggleDropdown("mock");
                    }}
                    className="purchage-linktext"
                    href="#"
                  >
                    {!loadingMockExam ? (
                      "Purchase Now"
                    ) : (
                      <div className="flex justify-center items-center">
                        <Spinner /> Processing...
                      </div>
                    )}
                  </Link>
                  <Dropdown
                    isOpen={openDropdown === "mock"} // Control whether the dropdown is open
                    toggleDropdown={() => toggleDropdown("mock")}
                    items={mockItems}
                    onSelect={async (selectedDuration) => {
                      setLoadingMockExam(true);

                      // Map the selected duration to the server's expected format
                      const mappedDuration =
                        durationMapping[selectedDuration] || "12-months"; // Default to '12-months' if no mapping
                      // If no variations exist for the mock exam items
                      if (
                        !mockItems?.variations ||
                        mockItems?.variations.length === 0
                      ) {
                        console.error(
                          "Mock Exam Items or Variations are not available"
                        );
                        setLoadingMockExam(false);
                        return;
                      }

                      const matchingVariation = mockItems.variations.find(
                        (variation) =>
                          variation?.attributes?.pa_duration === mappedDuration
                      );

                      if (!matchingVariation) {
                        console.error(
                          "No matching variation found for selected duration"
                        );
                        setLoadingMockExam(false);
                        return;
                      }

                      // Build the payload
                      const payload = {
                        pkg: coursePackage.mockExamPackage,
                        // pkgId: coursePackage?.mockExamPackage?.mockExam_package_id,
                        pkgId: matchingVariation?.id,
                        qty: 1,
                        from: "mock",
                        slug: { pathname },
                        month: mappedDuration,
                      };
                      try {
                        // Call add-to-cart function
                        await handleAddToCart(payload);
                      } catch (error) {
                        console.error(
                          "Error adding to cart for Mock Exam Package:",
                          error
                        );
                      } finally {
                        setLoadingMockExam(false);
                      }
                    }}
                    coursePackage="mock"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CourseModal show={showModal} onClose={() => setShowModal(false)}>
        {modalContent}
      </CourseModal>
    </>
  );
};

export default CoursePackage;
