'use client'
import React, { useEffect, useState } from 'react'
import Banner from '../components/Contact-us/Banner'
import ContactDr from '../components/Contact-us/ContactDr'
import Trustpilot from '../components/home/Trustpilot'
import { getContactPageinfo } from '@/lib/woredpressApi'

type Props = {}

const Page = (props: Props) => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const data = await getContactPageinfo();
      setContactInfo(data);
    };

    fetchContactInfo();
  }, []);

  if (!contactInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Banner contactInfo={contactInfo} />
      <ContactDr contactInfo={contactInfo} />
      <Trustpilot />
    </>
  );
}

export default Page;
