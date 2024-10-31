'use client'
import React from 'react'
import greendots from '../../../public/images/green-dot.png'

import Image from 'next/image';
import Link from 'next/link';

type ContactInfo = {
    telegram: string;
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    linkedin: string;
};

type Props = {
    contactInfo: ContactInfo

}

const ContactDr = ({ contactInfo }: Props) => {


    const SocialsData = [
        {
            svg: (
                <svg width="56" height="51" viewBox="0 0 56 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.9163 34.0206L36.1834 43.2356C39.2434 46.6481 40.776 48.3556 42.3799 47.9381C43.9814 47.5231 44.5322 45.2781 45.6312 40.7856L51.7257 15.8657C53.4215 8.94569 54.2681 5.4882 52.3862 3.78071C50.5043 2.07321 47.2428 3.34321 40.7199 5.8807L10.4615 17.6632C5.24413 19.6957 2.63547 20.7107 2.46972 22.4556C2.4502 22.6335 2.4502 22.8128 2.46972 22.9906C2.63037 24.7381 5.23393 25.7606 10.4462 27.8081C12.8049 28.7356 13.9856 29.2006 14.8322 30.0881C14.9274 30.1881 15.0192 30.2915 15.1076 30.3981C15.8879 31.3481 16.2194 32.5981 16.8849 35.0881L18.1319 39.7556C18.777 42.1806 19.1009 43.3956 19.95 43.5606C20.7992 43.7256 21.5362 42.7206 23.0126 40.7081L27.9163 34.0206ZM27.9163 34.0206L27.1079 33.1956C26.1848 32.2506 25.7233 31.7806 25.7233 31.1956C25.7233 30.6106 26.1823 30.1381 27.1079 29.1956L36.2191 19.8857" stroke="white" strokeWidth="4.5" strokeLinecap="round" stroke-linejoin="round" />
                </svg>

            ),
            label: "Telegram",
            link: contactInfo.telegram,
            id: "1",
            socialLink: "https://t.me/" + contactInfo.telegram
        },
        {
            svg: (<svg width="53" height="54" viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.28906 26.9167C2.28906 15.5646 2.28906 9.88599 5.81537 6.35968C9.34168 2.83337 15.0177 2.83337 26.3724 2.83337C37.7245 2.83337 43.4031 2.83337 46.9294 6.35968C50.4557 9.88599 50.4557 15.562 50.4557 26.9167C50.4557 38.2688 50.4557 43.9474 46.9294 47.4737C43.4031 51 37.7271 51 26.3724 51C15.0203 51 9.34168 51 5.81537 47.4737C2.28906 43.9474 2.28906 38.2714 2.28906 26.9167Z" stroke="white" strokeWidth="4.5" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M40.336 12.9738H40.3106M37.7806 26.9167C37.7806 29.9423 36.5787 32.8439 34.4393 34.9833C32.2999 37.1227 29.3983 38.3246 26.3727 38.3246C23.3472 38.3246 20.4455 37.1227 18.3061 34.9833C16.1667 32.8439 14.9648 29.9423 14.9648 26.9167C14.9648 23.8912 16.1667 20.9895 18.3061 18.8501C20.4455 16.7107 23.3472 15.5088 26.3727 15.5088C29.3983 15.5088 32.2999 16.7107 34.4393 18.8501C36.5787 20.9895 37.7806 23.8912 37.7806 26.9167Z" stroke="white" strokeWidth="4.5" strokeLinecap="round" stroke-linejoin="round" />
            </svg>
            ),
            label: "Instagram",
            link: contactInfo.instagram,
            id: "2",
            socialLink: "https://www.instagram.com/" + contactInfo.instagram

        },
        {
            svg: (<svg width="55" height="55" viewBox="0 0 38 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.4551 2H26.4551C22.4768 2 18.6615 3.58035 15.8485 6.3934C13.0354 9.20644 11.4551 13.0218 11.4551 17V26H2.45508V38H11.4551V62H23.4551V38H32.4551L35.4551 26H23.4551V17C23.4551 16.2044 23.7711 15.4413 24.3338 14.8787C24.8964 14.3161 25.6594 14 26.4551 14H35.4551V2Z" stroke="white" strokeWidth="3.5" strokeLinecap="round" stroke-linejoin="round" />
            </svg>
            ),
            label: "Facebook",
            link: contactInfo.facebook,
            id: "3",
            socialLink: "https://www.facebook.com/" + contactInfo.facebook
        },
        {
            svg: (<svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_602_6174)">
                    <mask id="mask0_602_6174" maskUnits="userSpaceOnUse" x="0" y="0" width="45" height="44">
                        <path d="M0.455078 0H44.4551V44H0.455078V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_602_6174)">
                        <path d="M35.1051 2.06171H41.8528L27.1128 18.9514L44.4551 41.9383H30.8779L20.2362 27.9997L8.07336 41.9383H1.31936L17.0839 23.8669L0.455078 2.06486H14.3779L23.9825 14.8029L35.1051 2.06171ZM32.7322 37.8903H36.4722L12.3351 5.89914H8.32479L32.7322 37.8903Z" fill="white" />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_602_6174">
                        <rect width="44" height="44" fill="white" transform="translate(0.455078)" />
                    </clipPath>
                </defs>
            </svg>
            ),
            label: "Twitter",
            link: contactInfo.twitter,
            id: "4",
            socialLink: "https://twitter.com/" + contactInfo.twitter

        },
        {
            svg: (<svg width="45" height="45" viewBox="0 0 56 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.8549 20.9867L23.9883 26.0533V15.92L32.8549 20.9867Z" fill="#1C1F1E" stroke="white" strokeWidth="4.5" strokeLinecap="round" stroke-linejoin="round" />
                <path d="M2.45508 22.7803V19.1931C2.45508 11.8591 2.45508 8.1908 4.74774 5.83227C7.04294 3.4712 10.6555 3.36987 17.878 3.16467C21.298 3.0684 24.794 3 27.7884 3C30.7828 3 34.2763 3.0684 37.6988 3.16467C44.9213 3.36987 48.5339 3.4712 50.8265 5.83227C53.1192 8.19333 53.1217 11.8616 53.1217 19.1931V22.7777C53.1217 30.1143 53.1217 33.78 50.8291 36.1411C48.5339 38.4996 44.9239 38.6035 37.6988 38.8061C34.2788 38.9049 30.7828 38.9733 27.7884 38.9733C24.794 38.9733 21.3005 38.9049 17.878 38.8061C10.6555 38.6035 7.04294 38.5021 4.74774 36.1411C2.45254 33.78 2.45508 30.1117 2.45508 22.7803Z" stroke="white" strokeWidth="4.5" />
            </svg>
            ),
            label: "Youtube",
            link: contactInfo.youtube,
            id: "5",
            socialLink: "https://www.youtube.com/" + contactInfo.youtube

        }
        ,
        {
            svg: (<svg width="50" height="50" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.10142 0C6.07348 0 4.12861 0.805595 2.69464 2.23956C1.26067 3.67353 0.455078 5.61841 0.455078 7.64634C0.455078 9.67428 1.26067 11.6192 2.69464 13.0531C4.12861 14.4871 6.07348 15.2927 8.10142 15.2927C10.1294 15.2927 12.0742 14.4871 13.5082 13.0531C14.9422 11.6192 15.7478 9.67428 15.7478 7.64634C15.7478 5.61841 14.9422 3.67353 13.5082 2.23956C12.0742 0.805595 10.1294 0 8.10142 0ZM4.62581 7.64634C4.62581 6.72455 4.99199 5.84052 5.64379 5.18871C6.2956 4.53691 7.17963 4.17073 8.10142 4.17073C9.02321 4.17073 9.90724 4.53691 10.559 5.18871C11.2108 5.84052 11.577 6.72455 11.577 7.64634C11.577 8.56813 11.2108 9.45217 10.559 10.104C9.90724 10.7558 9.02321 11.122 8.10142 11.122C7.17963 11.122 6.2956 10.7558 5.64379 10.104C4.99199 9.45217 4.62581 8.56813 4.62581 7.64634ZM0.455078 18.7683C0.455078 18.2152 0.674785 17.6848 1.06587 17.2937C1.45695 16.9026 1.98737 16.6829 2.54044 16.6829H13.6624C14.2155 16.6829 14.7459 16.9026 15.137 17.2937C15.5281 17.6848 15.7478 18.2152 15.7478 18.7683V54.9146C15.7478 55.4677 15.5281 55.9981 15.137 56.3892C14.7459 56.7803 14.2155 57 13.6624 57H2.54044C1.98737 57 1.45695 56.7803 1.06587 56.3892C0.674785 55.9981 0.455078 55.4677 0.455078 54.9146V18.7683ZM4.62581 20.8537V52.8293H11.577V20.8537H4.62581ZM19.9185 18.7683C19.9185 18.2152 20.1382 17.6848 20.5293 17.2937C20.9204 16.9026 21.4508 16.6829 22.0039 16.6829H33.1258C33.6789 16.6829 34.2093 16.9026 34.6004 17.2937C34.9915 17.6848 35.2112 18.2152 35.2112 18.7683V19.975L36.4207 19.4551C38.5061 18.5639 40.7185 18.0056 42.9771 17.8007C50.6929 17.1 57.4551 23.1615 57.4551 30.9468V54.9146C57.4551 55.4677 57.2354 55.9981 56.8443 56.3892C56.4532 56.7803 55.9228 57 55.3697 57H44.2478C43.6947 57 43.1643 56.7803 42.7732 56.3892C42.3821 55.9981 42.1624 55.4677 42.1624 54.9146V35.4512C42.1624 34.5294 41.7962 33.6454 41.1444 32.9936C40.4926 32.3418 39.6086 31.9756 38.6868 31.9756C37.765 31.9756 36.881 32.3418 36.2292 32.9936C35.5774 33.6454 35.2112 34.5294 35.2112 35.4512V54.9146C35.2112 55.4677 34.9915 55.9981 34.6004 56.3892C34.2093 56.7803 33.6789 57 33.1258 57H22.0039C21.4508 57 20.9204 56.7803 20.5293 56.3892C20.1382 55.9981 19.9185 55.4677 19.9185 54.9146V18.7683ZM24.0892 20.8537V52.8293H31.0404V35.4512C31.0404 33.4233 31.846 31.4784 33.28 30.0444C34.714 28.6105 36.6588 27.8049 38.6868 27.8049C40.7147 27.8049 42.6596 28.6105 44.0936 30.0444C45.5275 31.4784 46.3331 33.4233 46.3331 35.4512V52.8293H53.2843V30.9468C53.2843 25.6528 48.666 21.4709 43.358 21.9547C41.5345 22.1206 39.7482 22.571 38.064 23.2894L33.9488 25.055C33.6314 25.1913 33.2851 25.2467 32.9411 25.2161C32.597 25.1855 32.2659 25.0698 31.9775 24.8796C31.6892 24.6894 31.4526 24.4305 31.289 24.1263C31.1255 23.822 31.04 23.4819 31.0404 23.1364V20.8537H24.0892Z" fill="white" />
            </svg>
            ),
            label: "LinkedIn",
            link: contactInfo.linkedin,
            id: "5",
            socialLink: "https://www.linkedin.com/" + contactInfo.linkedin
        }
    ]

    return (
        <section className='w-full flex justify-center items-center bg-[#EAEAEA] p-5 overflow-hidden'>

            <div className='w-full max-w-[1360px] flex justify-center items-center gap-[76px] py-[86px]   flex-col relative'>
                <h5 className='text-[#1A1E1C] text-[30px] leading-[35px] text-center lg:text-left lg:text-[38px] lg:leading-[46px]'>Contact Dr Aman Arora</h5>

                {/* Swiper Section */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full relative z-50">
                    <div className='absolute top-[-30px] left-[-30px] z-[-1]'>
                        <Image src={greendots} alt='green dots' />
                    </div>
                    <div className='absolute bottom-[-30px] right-[-30px] z-[-1]'>
                        <Image src={greendots} alt='green dots' />
                    </div>
                    {SocialsData.map((data) => {
                        return (
                            <Link key={data.id} target='_blank' href={data.socialLink}>

                                <div className="bg-white w-full h-[319px] flex flex-col justify-center items-center">
                                    <div className="icon bg-[#079561] rounded-[50%] p-10">{data.svg}</div>
                                    <span className="font-bold text-[#1A1E1C] text-[25px] leading-[34px] mt-8 mb-2 ">{data.label}</span>
                                    {/* <span className="font-medium text-[#3B5998] text-[18px] leading-[30px]">{data.link}</span> */}
                                    <div
                                        className="font-medium text-[#3B5998] text-[18px] leading-[30px]"
                                        dangerouslySetInnerHTML={{ __html: data.link }}
                                    />
                                </div>
                            </Link>

                        );
                    })}
                </div>
            </div>
        </section>

    )
}

export default ContactDr
