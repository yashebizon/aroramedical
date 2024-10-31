import React from "react";
import Blogs from "./listings";
import { getPosts } from "@/lib/woredpressApi";

export async function generateStaticParams() {
  try {
    const res = await await getPosts();

    return res.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    return []; 
  }
}

const BlogsPage = async () => {
  return <Blogs />;
};

export default BlogsPage;
