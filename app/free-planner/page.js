// "use client";
// import React from 'react';
// import useApi from '../../hooks/useApi';
// import { getFreeplannerPage } from '@/lib/woredpressApi';
// import greendots from "../../public/images/green-dot.png"
// import Image from 'next/image';

// const RefundPolicyPage = () => {
//     const { data, isLoading, isError, error } = useApi(getFreeplannerPage);

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//             </div>
//         );
//     }

//     if (isError) return <p>Error: {error}</p>;

//     return (
//         <section className='w-full flex justify-center items-center p-5'>
//             <div className='max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20'>

//                 <div class="mx-auto max-w-screen-xl px-2">
//                     <div class="container">
//                         <h1 class="text-3xl md:text-5xl font-bold text-center">Download. Print Pass.</h1>
//                         <p class="text-gray-500 font-normal text-center mt-4">Daily planners to guide your exam preparation. Tick off topics day by day and stay ahead.</p>

//                         <div class="flex justify-center flex-wrap gap-2 my-12">
//                             {/* {data.freeplannertopsectionlinks.map((data, id) => { */}
//                             {/* return ( */}
//                             <a href="#section-1" class="bg-[#079561] hover:text-[black] h-[68px] w-full md:w-[283px] text-center leading-[68px] rounded-full text-white block">AKT Planner</a>
//                             <a href="#section-2" class="bg-[#079561] hover:text-[black] h-[68px] w-full md:w-[283px] text-center leading-[68px] rounded-full text-white block">MRSA Planner</a>
//                             <a href="#section-3" class="bg-[#079561] hover:text-[black] h-[68px] w-full md:w-[283px] text-center leading-[68px] rounded-full text-white block">UKMLA PLAB 1 Planner</a>
//                             <a href="#section-4" class="bg-[#079561] hover:text-[black] h-[68px] w-full md:w-[283px] text-center leading-[68px] rounded-full text-white block">UKMLA PLAB 2 Planner</a>

//                             {/* ) */}
//                             {/* })} */}

//                         </div>
//                         <hr class="bg-gray-300" />
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mt-12">
//                     {data?.freeplannerdetails?.map((planner, index) => (
//                         <React.Fragment key={index}>

                         
//                                     <div>
//                                         <h2 className="text-[28px] lg:text-[38px] font-bold ">{planner.title}</h2>
//                                         {/* <p className="text-gray-500 font-normal mt-4">{planner.description}</p> */}
//                                         <div
//                                             className="text-gray-500 font-normal mt-4"
//                                             dangerouslySetInnerHTML={{ __html: planner.description }}
//                                         />
//                                         <div className="mt-6 flex flex-col gap-4">
//                                             {planner.dayplanners.map((dayplanner, dayIndex) => (
//                                                 <p key={dayIndex}>
//                                                     <a href={dayplanner?.dayplannerurl} className="text-[#079561] hover:text-[red] underline block my-1">
//                                                         Download Planner {dayIndex + 1}
//                                                     </a>
//                                                 </p>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <div className="relative pt-8 max-w-[580px] pr-8">
//                                         <Image
//                                             src={greendots}
//                                             className="absolute top-0 right-0 z-10 "
//                                             alt="Green Dots"
//                                             width={100} // Specify the width
//                                             height={100} // Specify the height
//                                         />
//                                         <div className="relative h-full bg-white shadow-xl p-6 flex justify-center items-center overflow-hidden z-20">
//                                             <Image
//                                                 src={planner.image}
//                                                 layout="contain"
//                                                 width={298} // Adjust based on the actual dimensions
//                                                 height={411} // Adjust based on the actual dimensions
//                                                 alt={planner.title}
//                                                 className="max-w-full h-auto"

//                                             />
//                                         </div>
//                                     </div>

                             
                           
//                         </React.Fragment>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default RefundPolicyPage;

"use client";
import React from 'react';
import useApi from '../../hooks/useApi';
import { getFreeplannerPage } from '@/lib/woredpressApi';
import greendots from "../../public/images/green-dot.png";
import Image from 'next/image';

const RefundPolicyPage = () => {
    const { data, isLoading, isError, error } = useApi(getFreeplannerPage);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (isError) return <p>Error: {error}</p>;

    return (
        <section className='w-full flex justify-center items-center p-5'>
            <div className='max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20'>

                <div className="mx-auto max-w-screen-xl px-2">
                    <div className="container">
                        <h1 className="text-3xl md:text-5xl font-bold text-center">Download. Print Pass.</h1>
                        <p className="text-gray-500 font-normal text-center mt-4">
                            Daily planners to guide your exam preparation. Tick off topics day by day and stay ahead.
                        </p>

                        <div className="flex justify-center flex-wrap gap-2 my-12">
                            <a href="#section-1" className="bg-[#079561] hover:text-[black] h-[68px] w-full md:w-[283px] text-center leading-[68px] rounded-full text-white block">AKT Planner</a>
                            <a href="#section-2" className="bg-[#079561] hover:text-[black] h-[68px] w-full md:w-[283px] text-center leading-[68px] rounded-full text-white block">MRSA Planner</a>
                            <a href="#section-3" className="bg-[#079561] hover:text-[black] h-[68px] w-full md:w-[283px] text-center leading-[68px] rounded-full text-white block">UKMLA PLAB 1 Planner</a>
                            <a href="#section-4" className="bg-[#079561] hover:text-[black] h-[68px] w-full md:w-[283px] text-center leading-[68px] rounded-full text-white block">UKMLA PLAB 2 Planner</a>
                        </div>
                        <hr className="bg-gray-300" />
                    </div>
                </div>

                <div className="mt-12">
                    {data?.freeplannerdetails?.map((planner, index) => (
                        <section
                            id={`section-${index + 1}`}
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-24 ${
                                index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                        >
                            <div className="md:w-1/2">
                                <h2 className="text-[28px] lg:text-[38px] font-bold">{planner.title}</h2>
                                <div
                                    className="text-gray-500 font-normal mt-4"
                                    dangerouslySetInnerHTML={{ __html: planner.description }}
                                />
                                <div className="mt-6 flex flex-col gap-4">
                                    {planner.dayplanners.map((dayplanner, dayIndex) => (
                                        <p key={dayIndex}>
                                            <a href={dayplanner?.dayplannerurl} className="text-[#079561] hover:text-[red] underline block my-1">
                                                Download Planner {dayIndex + 1}
                                            </a>
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="relative md:w-1/2 pt-8 max-w-[580px] pr-8">
                                <Image
                                    src={greendots}
                                    className="absolute top-0 right-0 z-10"
                                    alt="Green Dots"
                                    width={100}
                                    height={100}
                                />
                                <div className="relative h-full bg-white shadow-xl p-6 flex justify-center items-center overflow-hidden z-20">
                                    <Image
                                        src={planner.image}
                                        layout="contain"
                                        width={298}
                                        height={411}
                                        alt={planner.title}
                                        className="max-w-full h-auto"
                                    />
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RefundPolicyPage;

