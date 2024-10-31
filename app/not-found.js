'use client'
import Link from 'next/link';
import { getNotFoundPageInfo } from '@/lib/woredpressApi'
import { useEffect, useState } from 'react';



export default function NotFound() {
  const [notfoundInfo, setNotfoundInfo] = useState(null);

  useEffect(() => {
    const fetchNotFoundPageInfo = async () => {
      const data = await getNotFoundPageInfo();
      setNotfoundInfo(data);
    };

    fetchNotFoundPageInfo();
  }, []);

  if (!notfoundInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="page_404 bg-white py-10">
      <div className="container mx-auto">
        <div className="flex justify-center items-center w-full">
          <div className="text-center  w-full">
            {/* Background GIF */}
            <div className=" bg-contain bg-no-repeat bg-center h-[500px] mx-auto w-full " style={{ backgroundImage: `url(${notfoundInfo?.image})` }}>
              <h1 className="text-9xl text-center text-black absolute top-[300px] left-[400px]">{notfoundInfo?.heading}</h1>
            </div>

            {/* Content Section */}
            <div className="contant_box_404 mt-[-50px]">
              <h2 className="text-4xl font-bold mt-8">{notfoundInfo?.subheading}</h2>
              <p className="text-lg text-gray-700 mt-4">{notfoundInfo?.description}</p>

              {/* Back to Home Button */}
              <Link href={notfoundInfo.button_link}>
                <span className="link_404 text-white bg-[#079561] py-2 px-6 mt-6 inline-block rounded-[30px] hover:bg-green-900 transition duration-300">
                  Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

