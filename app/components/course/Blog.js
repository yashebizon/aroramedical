import Link from "next/link";

const Blog = ({ blogs }) => {
  const stripHtmlTags = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <>
      <div className="container-blogs px-[50px]">
        <h2 className="text-center h2-line mb-[24px]">Our MRCGP AKT Blogs</h2>
        {/* <p className="text-center mb-[37px]  mx-auto max-w-[534px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac eu et ac
          elit senectus mauris blandit tempore gestas.
        </p> */}
        <div className="blogs-listing flex flex-wrap gap-[39px]">
          {blogs.map((blog, index) => (
            <div className="blogs-list flex-[1]" key={index}>
              <div className="blogs-img ">
                <img src={blog.featured_image} />
              </div>
              <div className="blogs-author">
                {" "}
                <p className="">{blog.postedBy}</p>
              </div>
              <div className="blogs-title">
                <h3>{blog.title}</h3>
              </div>
              <p
                className="blogs-description"
                dangerouslySetInnerHTML={{
                  __html: stripHtmlTags(blog.content),
                }}
              />
              <div className="readmore-links">
                {" "}
                <Link href="#">Read More</Link>{" "}
              </div>
            </div>
          ))}
        </div>

        <div className="viewDetails-links">
          {" "}
          <Link href="#"> View All</Link>
        </div>
      </div>
    </>
  );
};

export default Blog;
