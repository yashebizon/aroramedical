"use client";
import { useEffect, useState } from "react";
import Trustpilot from "../../components/course/Trustpilot";
import Hero from "../../components/course/Hero";
import CoursePackage from "../../components/course/CoursePackage";
import CourseDetail from "../../components/course/CourseDetail";
import Blog from "../../components/course/Blog";
import FAQ from "../../components/course/FAQ";

const CoursePageDetails = ({ params, courseData, blogs }) => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseData) {
      try {
        const {
          post,
          meta,
          banner_slider_images,
          course_faq_content,
          course_faq_content_packages,
        } = courseData;
        let sliderImages = banner_slider_images;
        let faqscontent = course_faq_content;
        let faqspackagescontent = course_faq_content_packages;
        setPageData({
          post,
          hero: {
            ultimate_package_id: meta.ultimate_package_id,
            heading: meta.heading,
            subheading: meta.subheading,
            features: meta.features,
            packageOldPrice: meta.ultimate_old_price,
            packageNewPrice: meta.ultimate_new_price,
            packageSave: meta.ultimate_save,
            buyButton: meta.buy_btn_text,
            slider_images: sliderImages,
            // slider2: meta["slider-2"],
            // slider3: meta["slider-3"],
          },
          trustpilot: {
            heading: meta.trust_pilot,
            image1: meta.img_1,
            image2: meta.img_2,
            image3: meta.img_3,
          },
          courseDetail: {
            heading: meta.course_about_section_heading_,
            content: meta.course_about_section_content,
            subHeading: meta.course_about_section_subheading_,
            subHeadingContent: meta.course_about_section_subheading_content,
            image: meta.course_about_section_image,
            collapseabtText: meta.abouthidetext,
          },
          faq: {
            examFaqHeading: meta.exam_faq_heading,
            packageFaqHeading: meta.package_faq_heding,
            examFaqQuestions: faqscontent,
            packageFaqQuestions: faqspackagescontent,
          },
          blog: blogs.slice(0, 4).map((post) => ({
            id: post.id,
            title: post.title,
            postedBy: post.posted_by,
            content: post.post_content,
            featured_image: post.featured_image,
          })),
          coursePackage: {
            ultimatePackage: {
              package_image: meta.ultimate_package_image,
              ultimate_package_id: meta.ultimate_package_id,
              packageName: meta.ultimate_package,
              shortDescription: meta.ultimate_short_description,
              packageOldPrice: meta.ultimate_old_price,
              packageNewPrice: meta.ultimate_new_price,
              packageSave: meta.ultimate_save,
              packageVideoCourseHeading: meta.ultimate_video_course,
              packageVideoCourseContent: meta.ultimate_video_courses_content,
              packageMockExamHeading: meta.ultimate_mock_exams,
              packageMockExamContent: meta.ultimate_mock_exams_content,
              packageAudioCourses: meta.ultimate_audio_courses,
              packageAudioCoursesContent: meta.ultimate_audio_courses_content,
              packageFlashcards: meta.ultimate_flashcards,
              packageFlashcardsContent: meta.ultimate_flashcards_content,
              packageLiveVirtualCourses:
                meta.ultimate_additonal_live_virtual_courses,
              packageLiveVirtualCoursesContent:
                meta.ultimate_additional_live_virtual_courses_content,
              videocoursepopupcontent: meta.ultimate_video_course_popup_content,
              mockcoursepopupcontent: meta.ultimate_mock_exam_popup_content,
              audiocoursepopupcontent: meta.ultimate_audio_course_popup_content,
              flashcardcoursepopupcontent:
                meta.ultimate_flascard_course_popup_content,
            },
            silverPackage: {
              package_image: meta.silver_package_image,
              silver_package_id: meta.silver_package_id_,
              packageName: meta.silver_package,
              shortDescription: meta.silver_short_description,
              packageOldPrice: meta.silver_old_price,
              packageNewPrice: meta.silver_new_price,
              packageSave: meta.silver_save,
              packageVideoCourseHeading: meta.silver_video_course,
              packageVideoCourseContent: meta.silver_video_courses_content,
              packageMockExamHeading: meta.silvermockexam,
              packageMockExamContent: meta.silver_mock_exams_content,
              videocoursepopupcontent: meta.video_course_popup_content,
              mockcoursepopupcontent: meta.mock_exam_course_popup_content,
            },
            goldPackage: {
              package_image: meta.gold_package_image,
              gold_package_id: meta.gold_package_id,
              packageName: meta.gold_package,
              shortDescription: meta.gold_short_description,
              packageOldPrice: meta.gold_old_price,
              packageNewPrice: meta.gold_new_price,
              packageSave: meta.gold_save,
              packageVideoCourseHeading: meta.gold_video_course,
              packageVideoCourseContent: meta.gold_video_courses_content,
              packageMockExamHeading: meta.gold_mock_exams,
              packageMockExamContent: meta.gold_mock_exams_content,
              packageAudioCourses: meta.gold_audio_courses,
              packageAudioCoursesContent: meta.gold_audio_courses_content,
              packageFlashcards: meta.gold_flashcards,
              packageFlashcardsContent: meta.gold_flashcards_content,
              videocoursepopupcontent: meta.gold_video_course_popup_content,
              mockcoursepopupcontent: meta.gold_mock_course_popup_content,
              audiocoursepopupcontent: meta.gold_audio_course_popup_content,
              flashcardcoursepopupcontent:
                meta.gold_flashcard_course_popup_content,
            },
            mockExam: {
              packageName: meta.mock_exam_package_heading,
              shortDescription: meta.mock_exam_short_description,
              packageOldPrice: meta.mock_exam_old_price,
              packageNewPrice: meta.mock_exam_new_price,
              packageContent: meta.mock_exam_content,
            },
          },
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error setting data:", error);
        setError("Failed to load course data. Please try again later.");
        setIsLoading(false);
      }
    }
  }, [courseData, blogs]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  if (!pageData) return <div>Course data not found</div>;

  return (
    <>
      <Hero hero={pageData.hero} />
      <Trustpilot trustpilot={pageData.trustpilot} />
      <CoursePackage coursePackage={pageData.coursePackage} />
      <CourseDetail courseDetail={pageData.courseDetail} />
      <FAQ faqData={pageData.faq} />
      <Blog blogs={pageData.blog} />
    </>
  );
};

export default CoursePageDetails;
