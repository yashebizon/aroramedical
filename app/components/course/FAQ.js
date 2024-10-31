"use client";
import { useState } from "react";

const FAQ = ({ faqData }) => {
  const [openQuestions, setOpenQuestions] = useState({});
  const [activeFaq, setActiveFaq] = useState("exam");
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (index, type) => {
    setOpenQuestions((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      newState[`${type}-${index}`] = !prev[`${type}-${index}`];
      return newState;
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (section) => {
    setActiveFaq(section);
    setIsOpen(false);
    showFaqSection(section);
  };

  const showFaqSection = (section) => {
    setActiveFaq(section);
    setOpenQuestions({});
  };

  // Check if faqData properties are arrays and handle them accordingly
  const isArray = (arr) => Array.isArray(arr);
  
  const divideFaqsIntoTwoColumns = (faqArray) => {
    if (!isArray(faqArray)) {
      return [[], []]; // Return empty columns if faqArray is not an array
    }
    const mid = Math.ceil(faqArray.length / 2);
    return [faqArray.slice(0, mid), faqArray.slice(mid)];
  };

  // Default to empty arrays if faqData properties are not arrays
  const [firstColumn, secondColumn] =
    activeFaq === "exam"
      ? divideFaqsIntoTwoColumns(faqData.examFaqQuestions || [])
      : divideFaqsIntoTwoColumns(faqData.packageFaqQuestions || []);
  return (
    <div className="faqs-section-block">
      <div className="container">
        <div className="tabs-header flex flex-wrap md:hidden tabs-headermobile relative">
          <div
            className="w-full cursor-pointer flex justify-between items-center tabs-header-selected"
            onClick={toggleDropdown}
          >
            {activeFaq === "exam" ? "FAQs for Exam" : "FAQs for Packages"}
            <svg
              width="19"
              height="11"
              viewBox="0 0 19 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.91163 0.48861L9.5085 6.97001L16.1054 0.48861C16.7685 -0.16287 17.8396 -0.16287 18.5027 0.48861C19.1658 1.14009 19.1658 2.19248 18.5027 2.84396L10.6987 10.5114C10.0356 11.1629 8.96443 11.1629 8.30134 10.5114L0.497315 2.84396C-0.165772 2.19248 -0.165772 1.14009 0.497315 0.48861C1.1604 -0.146166 2.24855 -0.16287 2.91163 0.48861Z"
                fill="#1A1E1C"
              />
            </svg>
          </div>

          {isOpen && (
            <div className="absolute w-full faqs-headerDropdown z-10">
              <div
                className={`header-dropdownitem cursor-pointer ${
                  activeFaq === "exam"
                    ? "FAQs-for-Exam active"
                    : "FAQs-for-Exam"
                }`}
                onClick={() => handleSelection("exam")}
              >
                {faqData.examFaqHeading}
              </div>
              <div
                className={`header-dropdownitem cursor-pointer ${
                  activeFaq === "package"
                    ? "FAQs-for-Packages active"
                    : "FAQs-for-Packages"
                }`}
                onClick={() => handleSelection("package")}
              >
                {faqData.packageFaqHeading}
              </div>
            </div>
          )}
        </div>

        <div className="tabs-header flex flex-wrap hidden md:flex">
          <h2
            className={`cursor-pointer h2-line flex-1 text-center text-[#5C5C5C] font-normal ${
              activeFaq === "exam" ? "active-tabs-state" : "inactive-tabs-state"
            }`}
            onClick={() => showFaqSection("exam")}
          >
            {faqData.examFaqHeading}
          </h2>
          <h2
            className={`cursor-pointer h2-line flex-1 text-center text-[#5C5C5C] font-normal ${
              activeFaq === "package"
                ? "active-tabs-state"
                : "inactive-tabs-state"
            }`}
            onClick={() => showFaqSection("package")}
          >
            {faqData.packageFaqHeading}
          </h2>
        </div>

        <div className="faqs-item-section grid grid-cols-2 gap-4">
          <div>
            {firstColumn.map((item, index) => (
              <div key={index} className="faqs-item-block">
                <div className="faqs-items">
                  <div
                    className={`faqs-item cursor-pointer ${
                      openQuestions[`${activeFaq}-0-${index}`]
                        ? "active-faqitem"
                        : "inactive-faqitem"
                    }`}
                    onClick={() => toggleAccordion(`0-${index}`, activeFaq)}
                  >
                    <div className="icons-plus">
                      <span>
                        {openQuestions[`${activeFaq}-0-${index}`] ? (
                          <span className="minus-sign"></span>
                        ) : (
                          <img src="/images/plus-icons-faq.png" />
                        )}
                      </span>
                    </div>
                    <h4>{item.faq_exam_title}</h4>
                  </div>

                  {openQuestions[`${activeFaq}-0-${index}`] && (
                    <div className="items-accordion-con">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.faq_exam_description,
                        }}
                      ></p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            {secondColumn.map((item, index) => (
              <div key={index} className="faqs-item-block">
                <div className="faqs-items">
                  <div
                    className={`faqs-item cursor-pointer ${
                      openQuestions[`${activeFaq}-1-${index}`]
                        ? "active-faqitem"
                        : "inactive-faqitem"
                    }`}
                    onClick={() => toggleAccordion(`1-${index}`, activeFaq)}
                  >
                    <div className="icons-plus">
                      <span>
                        {openQuestions[`${activeFaq}-1-${index}`] ? (
                          <span className="minus-sign"></span>
                        ) : (
                          <img src="/images/plus-icons-faq.png" />
                        )}
                      </span>
                    </div>
                    <h4>{item.faq_exam_title}</h4>
                  </div>

                  {openQuestions[`${activeFaq}-1-${index}`] && (
                    <div className="items-accordion-con">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.faq_exam_description,
                        }}
                      ></p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
