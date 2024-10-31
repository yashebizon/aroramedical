import React from "react";
import {
  getCourseMeta,
  getBlogs,
  getAllCourses,
} from "../../../lib/woredpressApi";
import CoursePageDetails from "./coursedetails";

export async function generateStaticParams() {
  try {
    const res = await getAllCourses();

    return res.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error(error);
    return []; // Return an empty array if there's an error
  }
}

const CoursePage = async ({ params }) => {
  const courseData = await getCourseMeta(params.slug);
  const posts = await getBlogs(params.slug);

  if (!courseData) {
    return <div>Course not found</div>;
  }

  if (!courseData) {
    return (
      
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <CoursePageDetails params={params} courseData={courseData} blogs={posts} />
  );
};

export default CoursePage;
