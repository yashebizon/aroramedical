import { getBlogBySearch } from '@/lib/woredpressApi';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Spinner from '../micro/spinner/Spinner';
import he from "he";
import Image from 'next/image';

type Blog = {
  title: string;
  excerpt: string;
  image: string;
  link: string;
  date: string;
  id: number;
};

type Props = {};

const SearchResultContent: React.FC<Props> = () => {
  const [searchResult, setSearchResult] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useSearchParams();
  const searchQuery = params.get('search');

  useEffect(() => {
    async function getSearchResult() {
      if (searchQuery) {
        setLoading(true);
        setError(false);
        try {
          const data: Blog[] = await getBlogBySearch(searchQuery);
          setSearchResult(data ?? []);
        } catch (err) {
          console.error('Error fetching search results:', err);
          setError(true);
        }
        setLoading(false);
      }
    }

    getSearchResult();
  }, [searchQuery]);

  return (
    <div className="bg-[#EAEAEA] py-[80px] max-[767px]:pb-[47px] max-[767px]:pt-[0px]">
      <div className="container">
        <div className='flex w-full justify-between h-full py-[50px] lg:py-0 items-center mb-0 lg:mb-[30px]'>
          <h6 className="text-[20px] lg:text-[38px] leading-[30px] lg:leading-[74px] font-[700]">
            Search Results for : "{searchQuery}"
          </h6>
          <Link href="/blogs" className="font-bold bg-[#079561] py-[4px] text-white text-[14px] px-4 lg:px-6 lg:py-2 rounded-md hover:bg-[white] transition duration-300">
            View All Blogs
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-5 bg-[#079561]">
            <span className='text-white font-bold mr-5'>Searching...</span><Spinner />
          </div>
        )}

        {error && (
          <h2 className="text-[18px] leading-[74px] font-[500] mb-[29.3px] text-red-500">
            Something went wrong. Please try again later.
          </h2>
        )}

        {!loading && !error && (
          searchResult.length > 0 ? (
            <div className="grid grid-cols-3 max-[768px]:grid-cols-2 max-[648px]:grid-cols-1 gap-x-[27px] gap-y-[66px] max-[991px]:gap-[20px]">
              {searchResult.map((blog) => (
                <div key={blog.id}>
                  <Link href={"/blogs/" + blog?.id}>
                  <div className="relative w-full lg:w-[446px] h-[254px] mb-5 lg:mb-5 float-right  ">

<Image fill  src={blog.image || "https://placehold.jp/eeeeee/cccccc/200x150.png?text=No%20Image"}
                      alt={blog.title} /> 
                   
                      </div>
                  </Link>
                  <Link href={"/blogs/" + blog?.id}>
                    <h3 className="text-[20px] max-[991px]:text-[18px] max-[991px]:leading-[25px] hover:text-[#079561] py-[1px] leading-[34px] mt-[25px] mb-[11px] font-bold text-[#1A1E1C]">
                      {he.decode(blog?.title)}
                    </h3>
                  </Link>
                 
                  <p className="text-[16px] max-[991px]:text-[16px] max-[991px]:leading-[25px] text-[#555555] h-[140px]">
  {he.decode(blog?.excerpt?.split(' ').slice(0, 35).join(' '))}{blog?.excerpt?.split(' ').length > 35 && '...'}
</p>

                  <Link
                    className="inline-block text-[18px] leading-[30px] font-[400] text-[#079561] custom-underline"
                    href={"/blogs/" + blog?.id}
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <h6 className="text-[18px] text-center lg:text-start lg:text-[18px] leading-[74px] font-[500] mb-[29.3px]">
              No results found for "{searchQuery}"
            </h6>
          )
        )}
      </div>
    </div>
  );
};

const SearchResult: React.FC = () => (
  <Suspense fallback={<div>Loading search results...</div>}>
    <SearchResultContent />
  </Suspense>
);

export default SearchResult;


 {/* <p className="text-[18px] max-[991px]:text-[16px] max-[991px]:leading-[25px] text-[#555555]">
                    {he.decode(blog?.excerpt)}
                  </p> */}