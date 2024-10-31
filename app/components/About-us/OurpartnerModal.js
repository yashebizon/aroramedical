import React from "react";
import Image from "next/image";




const PartnerModal = ({ partner, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-5">
            <div className="relative w-full max-w-[1300px] rounded-[15px] bg-white p-8 top-[70px] ">
                <button
                    className="absolute right-4 top-4 md:right-8 md:top-8 text-2xl text-primary"
                    onClick={onClose}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21L21 3" stroke="#079561" stroke-width="2" stroke-linecap="square" />
                        <path d="M21 21L3 3" stroke="#079561" stroke-width="2" stroke-linecap="square" />
                    </svg>
                </button>

                <div className="flex flex-col">
                    <div className="flex items-start flex-col md:flex-row gap-6 mt-5">
                        <div className="relative h-[180px] flex  items-center w-full md:min-w-[300px] max-w-[435px] rounded-[15px] overflow-hidden shadow-2xl">
                            <Image
                                src={partner.partnerimage}
                                alt={partner.firstheading}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-center gap-[11px] h-[240px] md:h-[200px]">
                            <h2 className="text-2xl font-bold">{partner.firstheading}</h2>
                            <p className="text-lg text-[#079561]">{partner.firstsubheading}</p>
                            <div dangerouslySetInnerHTML={{ __html: partner.firstdescription }} />
                        </div>
                    </div>

                    <div className="max-h-[200px] lg:max-h-[400px] overflow-y-auto pr-4   md:mt-4 lg:mt-0">
                        <div className="space-y-4">
                            {/* <div dangerouslySetInnerHTML={{ __html: partner.firstdescription }} /> */}
                            <div dangerouslySetInnerHTML={{ __html: partner.description2 }} />
                            <h4 className="text-xl font-semibold">{partner.heading2}</h4>
                            <div dangerouslySetInnerHTML={{ __html: partner.description3 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerModal;