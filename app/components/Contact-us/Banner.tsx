import React, { useState, useEffect } from 'react'
import greendots from '../../../public/images/green-dot.png'
import greenEllipse from '../../../public/images/green-ellipse.png'
import Image from 'next/image'
import { SubmitContactInfo } from '@/lib/woredpressApi'
import CustomToast from '@/app/components/event&webinar/CustomToast'
import Link from 'next/link'



type ContactInfo = {
  title: string;
  address: string;
  email: string;
  phonenumber: string;
  whatsapp: string;
  maplink: string;
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

const Banner = ({ contactInfo }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<JSX.Element | string>("")

  const [formData, setFormData] = useState({
    name: "",
    phonenum: "",
    email: "",
    message: ""
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await SubmitContactInfo(
        formData.name,
        formData.phonenum,
        formData.email,
        formData.message
      );

      if (response) {
        setIsSuccess(true);
        setToastMessage(
          <div className=' flex flex-col'>
            <div className='flex p-5 gap-4 justify-center items-center flex-col'>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-[50px] w-[50px]'>
                <circle cx="256" cy="256" r="256" fill="green" />

                <path d="M369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" fill="white" />
              </svg>





              <p className="text-gray-800 font-semibold mb-2 text-center">
                Your message has been sent successfully! We will get back to you soon. Thank you for reaching out.
              </p>
            </div>
            <div className="flex gap-5 justify-center items-center mt-4">
              <Link href="/" className="text-white font-bold bg-blue-600 hover:bg-blue-700 hover:text-black duration-300 px-4 py-2 rounded-lg shadow-sm">
                Home
              </Link>

            </div>
          </div>
        );
        setFormData({
          name: "",
          phonenum: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="w-full m-auto p-5 mt-[50px] mb-[100px]">
      <div className="max-w-[1360px] w-full flex justify-center items-center  flex-col m-auto">
        <div className='flex justify-between w-full gap-20 lg:gap-[33px] flex-col lg:flex-row '>
          {/* Left container */}

          <div className='rounded-[15px]  shadow-2xl w-full p-7  flex-col gap-10 flex relative bg-white'>
            <div className='absolute top-[-10px] left-[-30px] z-[-1]'>
              <Image src={greendots} alt='green dots' />
            </div>
            <div className='absolute bottom-[-70px]  left-[70px] lg:left-[250px] z-[-1]'>
              <Image src={greenEllipse} alt='green dots' />
            </div>
            <span className='font-bold text-[30px] leading-[40px] lg:text-[60px] lg:leading-[74px] text-[#1A1E1C]'>Get in touch today</span>
            <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <label className='text-[18px] leading-[20px] text-[#1A1E1C] font-bold'>Name</label>
                <input type='text' name='name' required onChange={handleInputChange} value={formData.name} placeholder='Your name' className={`mt-5 px-5 py-3 rounded-[70px] ${!formData.name ? 'border-[#079561] border-2' : 'border-[#F0F0F0] border-2'}`} />
              </div>
              <div className='flex w-full justify-between lg:flex-row flex-col gap-10 lg:gap-0'>
                <div className='flex flex-col'>
                  <label className='text-[18px] leading-[20px] text-[#1A1E1C] font-bold'>Phone No</label>
                  <input required type='number' name='phonenum' onChange={handleInputChange} value={formData.phonenum} placeholder='Your phone no.' className={`mt-5 px-5 py-3 rounded-[70px] ${!formData.phonenum ? 'border-[#079561] border-2' : 'border-[#F0F0F0] border-2'}`} />
                </div>
                <div className='flex flex-col'>
                  <label className='text-[18px] leading-[20px] text-[#1A1E1C] font-bold'>Email</label>
                  <input required type='email' name='email' onChange={handleInputChange} placeholder='Your email' value={formData.email} className={`mt-5 px-5 py-3 rounded-[70px] ${!formData.email ? 'border-[#079561] border-2' : 'border-[#F0F0F0] border-2'}`} />
                </div>
              </div>
              <div className='flex flex-col'>
                <label className='text-[18px] leading-[20px] text-[#1A1E1C] font-bold'>Message</label>
                <textarea required placeholder='Message' name='message' onChange={handleInputChange} value={formData.message} className={`mt-5 px-5 py-3 rounded-[70px] ${!formData.message ? 'border-[#079561] border-2' : 'border-[#F0F0F0] border-2'}`} />
              </div>
              <button
                type="submit"
                className="max-w-[210px] text-[#079561] border-[1px] border-[#079561] px-12 py-6 hover:bg-[#079561] hover:text-white font-bold leading-[20px] text-[18px] rounded-[66px]"
              >
                {isLoading ? "Sending..." : "Contact Us"} </button>
            </form>

          </div>
          {isSuccess && (
            <CustomToast message={toastMessage} onClose={() => setToastMessage('')} />
          )}

          {/* right container */}
          <div className='rounded-[15px]   w-full   flex-col gap-6 flex relative'>

            <div className='rounded-[15px] overflow-hidden'>
              <iframe
                // src="https://www.google.com/maps/embed/v1/place?q=arora+medical+education+ltd&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                src={contactInfo.maplink}
                width="100%"
                height="392px"
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
            <div className=''>

              <span className='font-semibold text-black leading-[33px] text-[22px]'>Address</span>
              {/* <p className='text-[#1A202C] text-[18px] leading-[28px] font-normal'>Arora Medical Education Limited</p>
                            <p className='text-[#1A202C] text-[18px] leading-[28px] font-normal'>Regus Building Blythe Valley Business Park Solihull, England B90 8AG</p> */}
              <p
                className="text-[#1A202C] text-[18px] leading-[28px] font-normal"
                dangerouslySetInnerHTML={{ __html: contactInfo.address }}
              />

            </div>
            <div className=''>

              <span className='font-semibold text-black leading-[33px] text-[22px]'>Email Address</span>
              <p className='text-[#1A202C] text-[18px] leading-[28px] font-normal'><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
              {/* <p
                  className="text-[#1A202C] text-[18px] leading-[28px] font-normal"
                  dangerouslySetInnerHTML={{ __html: contactInfo.email }}
                /> */}
            </div>

            <div className='flex justify-between '>

              <div className=''>

                <span className='font-semibold text-black leading-[33px] text-[22px]'>Phone</span>
                <p className='text-[#1A202C] text-[18px] leading-[28px] font-normal'><a href={`tel:${contactInfo.phonenumber}`}>{contactInfo.phonenumber}</a></p>
                {/* <p
                  className="text-[#1A202C] text-[18px] leading-[28px] font-normal"
                  dangerouslySetInnerHTML={{ __html: contactInfo.phonenumber }}
                /> */}
              </div>
              <div className=''>

                <span className='font-semibold text-black leading-[33px] text-[22px]'>WhatsApp</span>
                <p className='text-[#1A202C] text-[18px] leading-[28px] font-normal'><a href={`https://wa.link/${contactInfo.phonenumber}`}>{contactInfo.whatsapp}</a></p>
                {/* <p
                  className="text-[#1A202C] text-[18px] leading-[28px] font-normal"
                  dangerouslySetInnerHTML={{ __html: contactInfo.whatsapp }}
                /> */}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Banner