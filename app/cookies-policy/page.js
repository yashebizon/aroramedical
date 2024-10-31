// "use client";
// import React, { useEffect } from 'react'
// import useApi from '@/hooks/useApi'
// import { getCookiePolicy } from '@/lib/woredpressApi'

// const Page = () => {
//     const { data, isLoading, isError, error } = useApi(getCookiePolicy);


//   if (isLoading) return <div className="flex justify-center items-center h-screen">
//   <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
// </div>;
//   if (isError) return <p>Error: {error}</p>;

//     return (
//         <section className='w-full flex justify-center items-center p-5'>
//             <div className='max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20'>
//                 <h3 className='text-black  text-[30px] lg:text-[60px] mb-1'>{data?.title}</h3>
//                 <div className='flex flex-col w-full gap-2'>

//                     <h3 className='text-[18px] lg:text-[25px] mt-4'>{data?.mainheading}</h3>
//                     {data?.description?.map((item,id)=>(<h4 className='text-[14px] font-normal lg:text-[16px]' key={id}>{item}</h4>))}
      
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>{data?.followingcookieheading}</h4>
//                     {data?.cookiesheadinganddescription?.map((item,id)=>(<ul key={id} className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'><b>{item?.listheading}</b> {item?.description}
//                         </li>
                       
//                     </ul>))}
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>You can find more information about the individual cookies we use and the purposes for which we use them in the table below:</h4>
//                     <div className="overflow-x-auto my-10">
//                         <table className="min-w-full divide-y divide-gray-200 my-10">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">{data?.tableheadings?.cookieheading}</th>
//                                     <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">{data?.tableheadings?.nameheading}</th>
//                                     <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">{data?.tableheadings?.purposeheading}</th>
//                                     <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">{data?.tableheadings?.moreinfoheading}</th>

//                                 </tr>
//                             </thead>
//                             {data?.tableitems?.map((item,id)=>(<tbody key={id} className="bg-white divide-y divide-gray-200">
                               
//                                 <tr>
//                                     <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 font-bold">{item?.cookie}</td>
//                                     <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 font-bold">{item?.name}</td>

//                                    {item?.purposeitems?.map((subitem,id)=>(<td key={id} className=" flex flex-col text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
//                                         {subitem}
//                                     </td>))}
//                                     <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6"><a  target='_blank' className='text-[#248cc8] font-bold'>{item?.moreinformation}</a></td>
//                                 </tr>

//                             </tbody>))
//                             }
//                         </table>


//                     </div>

//                     {data?.bottomdescription?.map((item,id)=>(<h4 key={id} className='text-[14px] font-normal lg:text-[16px] pb-2'>{item}</h4>)
//                    )}
                    
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Page

"use client";
import React, { useEffect } from 'react';
import useApi from '@/hooks/useApi';
import { getCookiePolicy } from '@/lib/woredpressApi';

const Page = () => {
    const { data, isLoading, isError, error } = useApi(getCookiePolicy);

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen" aria-live="polite">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
    
    if (isError) return <p>Error: {error.message || "Something went wrong"}</p>;

    return (
        <section className='w-full flex justify-center items-center p-5'>
            <div className='max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20'>

                <h3 className='text-black text-[30px] lg:text-[60px] mb-1'>{data?.title}</h3>
                
                <div className='flex flex-col w-full gap-2'>
                    
                    <h3 className='text-[18px] lg:text-[25px] mt-4'>{data?.mainheading}</h3>

                    {data?.description?.map((item, id) => (
                        <div key={`${id}-${item}`} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}

                    <h4 className='text-[14px] font-normal lg:text-[16px]'>{data?.followingcookieheading}</h4>

                    {data?.cookiesheadinganddescription?.map((item, id) => (
                        <ul key={id} className='list-disc list-inside ml-5'>
                            <li className='text-[14px]'>
                                <b>{item?.listheading}</b> <p><span dangerouslySetInnerHTML={{ __html: item?.description }} /></p>
                            </li>
                        </ul>
                    ))}

                    <h4 className='text-[14px] font-normal lg:text-[16px]'>You can find more information about the individual cookies we use and the purposes for which we use them in the table below:</h4>
                    
                    <div className="overflow-x-auto my-10">
                        <table className="min-w-full divide-y divide-gray-200 my-10">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">{data?.tableheadings?.cookieheading}</th>
                                    <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">{data?.tableheadings?.nameheading}</th>
                                    <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">{data?.tableheadings?.purposeheading}</th>
                                    <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">{data?.tableheadings?.moreinfoheading}</th>
                                </tr>
                            </thead>

                            {data?.tableitems?.map((item, id) => (
                                <tbody key={id} className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 font-bold">{item?.cookie}</td>
                                        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 font-bold">{item?.name}</td>

                                        {item?.purposeitems?.map((subitem, subId) => (
                                            <td key={subId} className="flex flex-col text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6" dangerouslySetInnerHTML={{ __html: subitem }} />
                                        ))}

                                        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
                                            <a href={item?.moreinformation} target='_blank' rel="noopener noreferrer" className='text-[#248cc8] font-bold'>
                                            {item?.moreinformation}
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>

                    {data?.bottomdescription?.map((item, id) => (
                        <div key={`${id}-${item}`} className='text-[14px] font-normal lg:text-[16px] pb-2' dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Page;
