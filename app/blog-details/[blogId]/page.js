import React from "react";
import Details from "./details";
import { getPosts } from "@/lib/woredpressApi";
import dynamic from "next/dynamic";
// const Details=dynamic(() => import('./details'), {
//   ssr: true, // Disable server-side rendering for this component
// });


export async function generateStaticParams() {
  try {
    const res = await getPosts();

    return res.map((post) => ({
      blogId: post.id + "",
    }));
  } catch (error) {
    console.error(error);
    return []; // Return an empty array if there's an error
  }
}

const DetailsPage = async ({ params }) => {
  return <Details params={params} />;
};

export default DetailsPage;
