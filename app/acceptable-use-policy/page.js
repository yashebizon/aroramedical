// 'use client'

// import { getAcceptableUsePolicy } from '@/lib/woredpressApi'
// import React from 'react'
// import useApi from '../../hooks/useApi';

// const page = () => {

//     const { data, isLoading, isError, error } = useApi(getTermsandConditionPageinfo);

//     if (isLoading) {
//       return (
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//         </div>
//       );
//     }

//     if (isError) return <p>Error: {error}</p>;

//     return (
//         <section className='w-full flex justify-center items-center p-5'>
//             <div className='max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20'>
//                 <h3 className='text-black  text-[30px] lg:text-[60px] mb-4'>Acceptable Use Policy</h3>
//                 <div className='flex flex-col w-full gap-2'>

//                     <h3 className='text-[18px] lg:text-[25px] mt-2'>PLEASE READ THE TERMS OF THIS POLICY CAREFULLY BEFORE USING THE SITE</h3>
//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>What’s in these terms?</h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>This Acceptable Use Policy sets out the content standards that apply when you upload content to our site, make contact with other users on our site, link to our site, or interact with our site in any other way.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Who we are and how to contact us</h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>aroramedicaleducation.co.uk is a site operated by Arora Medical Education Ltd (referred to as ‘we’, ‘us’ or ‘our’ in this Acceptable Use Policy). We are registered in England and Wales under company number 10306221 and have our registered office at Arora Medical Education Ltd, Regus Central Boulevard, Blythe Valley Business Park, Solihull, England, B90 8AG. Our main trading address is Arora Medical Education Ltd, Regus Central Boulevard, Blythe Valley Business Park, Solihull, England, B90 8AG. Our VAT number is 230874218.

//                         <br /><br />We are a limited company.<br /><br />

//                         To contact us, please email <a href='mailto:hello@aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>hello@aroramedicaleducation.co.uk</a> or telephone our customer service line on <a href='tel:0156 471 1886' className='text-[#248cc8] font-bold'>0156 471 1886</a>.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>By using our Site you accept these terms</h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>By using our Site, you confirm that you accept the terms of this Policy and that you agree to comply with them.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you do not agree to these terms, you must not use our Site.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We recommend that you print a copy of these terms for future reference.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>There are other terms that may apply to you</h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Our Terms of Use <a href='https://aroramedicaleducation.co.uk/terms-and-conditions/' target='_blank' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/terms-and-conditions/</a>  also apply to your use of our Site.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>We may make changes to the terms of this Policy</h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We amend these terms from time to time. Every time you wish to use our Site, please check these terms to ensure you understand the terms that apply at that time. These terms were most recently updated on October 2019.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Prohibited uses</h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>You may use our Site only for lawful purposes.  You may not use our Site:

//                     </h4>
//                     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>In any way that breaches any applicable local, national or international law or regulation.</li>
//                         <li className='text-[14px]'>In any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect.</li>
//                         <li className='text-[14px]'>For the purpose of harming or attempting to harm minors in any way.</li>
//                         <li className='text-[14px]'>To send, knowingly receive, upload, download, use or re-use any material which does not comply with our content standards – see below.</li>
//                         <li className='text-[14px]'>To transmit, or procure the sending of, any unsolicited or unauthorised advertising or promotional material or any other form of similar solicitation (spam).</li>
//                         <li className='text-[14px]'>To knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware or any other harmful programs or similar computer code designed to adversely affect the operation of any computer software or hardware.</li>
//                     </ul>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>You also agree:</h4>
//                     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>Not to reproduce, duplicate, copy or re-sell any part of our Site in contravention of the provisions of our Terms of Use <a href='https://aroramedicaleducation.co.uk/terms-and-conditions/' target='_blank' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/terms-and-conditions/</a> </li>
//                         <li className='text-[14px]'>Not to access without authority, interfere with, damage or disrupt:</li>
//                         <li className='text-[14px]'>any part of our Site;</li>
//                         <li className='text-[14px]'>any equipment or network on which our Site is stored;</li>
//                         <li className='text-[14px]'>any software used in the provision of our Site; or</li>
//                         <li className='text-[14px]'>any equipment or network or software owned or used by any third party.</li>
//                     </ul>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Interactive services

//                     </h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We may from time to time provide interactive services on our Site, including, without limitation:

//                     </h4>
//                     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>Chat rooms</li>
//                         <li className='text-[14px]'>News groups
//                         </li>
//                         <li className='text-[14px]'>Bulletin boards</li>
//                         <li className='text-[14px]'>Comments threads</li>

//                     </ul>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>‘Interactive Services’.

//                     </h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Where we do provide any Interactive Service, we will provide clear information to you about the kind of service offered, if it is moderated and what form of moderation is used (including whether it is human or technical).<br /><br />

//                         We will do our best to assess any possible risks for users (and in particular, for children) from third parties when they use any Interactive Service provided on our Site, and we will decide in each case whether it is appropriate to use moderation of the relevant service (including what kind of moderation to use) in the light of those risks. However, we are under no obligation to oversee, monitor or moderate any Interactive Service we provide on our Site, and we expressly exclude our liability for any loss or damage arising from the use of any Interactive Service by a user in contravention of our content standards, whether the service is moderated or not.<br /><br />

//                         The use of any of our Interactive Services by a minor is subject to the consent of their parent or guardian. We advise parents who permit their children to use an Interactive Service that it is important that they communicate with their children about their safety online, as moderation is not fool proof. Minors who are using any Interactive Service should be made aware of the potential risks to them.<br /><br />

//                         Where we do moderate an Interactive Service, we will normally provide you with a means of contacting the moderator, should a concern or difficulty arise.
//                     </h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Content standards

//                     </h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>These content standards apply to any and all material which you contribute to our Site <b>(‘Contribution’)</b>, and to any Interactive Services associated with it.</h4>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>The Content Standards must be complied with in spirit as well as to the letter. The standards apply to each part of any Contribution as well as to its whole.</h4>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Arora Medical Education Ltd will determine, in its discretion, whether a Contribution breaches the Content Standards.</h4>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>A Contribution must:</h4>

//                     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>Be accurate (where it states facts).</li>
//                         <li className='text-[14px]'>Be genuinely held (where it states opinions).
//                         </li>
//                         <li className='text-[14px]'>Comply with the law applicable in England and Wales and in any country from which it is posted.</li>

//                     </ul>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>A Contribution must not:

//                     </h4>

//                     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>Be defamatory of any person.
//                         </li>
//                         <li className='text-[14px]'>Be obscene, offensive, hateful or inflammatory.
//                         </li>
//                         <li className='text-[14px]'>Promote sexually explicit material.</li>
//                         <li className='text-[14px]'>Promote violence.</li>
//                         <li className='text-[14px]'>Promote discrimination based on race, sex, religion, nationality, disability, sexual orientation or age.</li>

//                         <li className='text-[14px]'>Infringe any copyright, database right or trade mark of any other person.</li>

//                         <li className='text-[14px]'>Be likely to deceive any person.</li>
//                         <li className='text-[14px]'>Breach any legal duty owed to a third party, such as a contractual duty or a duty of confidence.</li>

//                         <li className='text-[14px]'>Promote any illegal activity.</li>
//                         <li className='text-[14px]'>Be in contempt of court.</li>
//                         <li className='text-[14px]'>Be threatening, abuse or invade another’s privacy, or cause annoyance, inconvenience or needless anxiety.</li>

//                         <li className='text-[14px]'>Be likely to harass, upset, embarrass, alarm or annoy any other person.</li>

//                         <li className='text-[14px]'>Impersonate any person, or misrepresent your identity or affiliation with any person.</li>

//                         <li className='text-[14px]'>Give the impression that the Contribution emanates from Arora Medical Education Ltd, if this is not the case.</li>

//                         <li className='text-[14px]'>Advocate, promote, incite any party to commit, or assist any unlawful or criminal act such as (by way of example only) copyright infringement or computer misuse.</li>

//                         <li className='text-[14px]'>Contain a statement which you know or believe, or have reasonable grounds for believing, that members of the public to whom the statement is, or is to be, published are likely to understand as a direct or indirect encouragement or other inducement to the commission, preparation or instigation of acts of terrorism.</li>

//                         <li className='text-[14px]'>Contain any advertising or promote any services or web links to other sites.</li>

//                     </ul>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Breach of this Policy

//                     </h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>When we consider that a breach of this Acceptable Use Policy has occurred, we may take such action as we deem appropriate.</h4>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Failure to comply with this Acceptable Use Policy constitutes a material breach of the Terms of Use https://aroramedicaleducation.co.uk/terms-and-conditions/ upon which you are permitted to use our Site, and may result in our taking all or any of the following actions:</h4>

//                     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>Immediate, temporary or permanent withdrawal of your right to use our Site.</li>
//                         <li className='text-[14px]'>Immediate, temporary or permanent removal of any Contribution uploaded by you to our Site.
//                         </li>
//                         <li className='text-[14px]'>Issue of a warning to you.</li>
//                         <li className='text-[14px]'>Legal proceedings against you for reimbursement of all costs on an indemnity basis (including, but not limited to, reasonable administrative and legal costs) resulting from the breach.</li>

//                         <li className='text-[14px]'>Further legal action against you.</li>
//                         <li className='text-[14px]'>Disclosure of such information to law enforcement authorities as we reasonably feel is necessary or as required by law.</li>

//                     </ul>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We exclude our liability for all action we may take in response to breaches of this Acceptable Use Policy. The actions we may take are not limited to those described above, and we may take any other action we reasonably deem appropriate.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Which country’s laws apply to any disputes?

//                     </h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you are a consumer, please note that the terms of this Policy, its subject matter and its formation are governed by English law. You and we both agree that the courts of England and Wales will have exclusive jurisdiction except that if you are a resident of Northern Ireland you may also bring proceedings in Northern Ireland, and if you are resident of Scotland, you may also bring proceedings in Scotland.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you are a business, the terms of this Policy, its subject matter and its formation (and any non-contractual disputes or claims) are governed by English law. We both agree to the exclusive jurisdiction of the courts of England and Wales.</h4>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default page

"use client";

import { getAcceptableUsePolicy } from "@/lib/woredpressApi"; // Assuming this is your API function
import React from "react";
import useApi from "../../hooks/useApi"; // Hook to handle API calls

const AcceptableUsePolicyPage = () => {
  // Fetch the data using your custom API hook
  const { data, isLoading, isError, error } = useApi(getAcceptableUsePolicy); // Fetching data from API

  // Show loading spinner while the data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Display error if the API call fails
  if (isError) return <p>Error: {error.message}</p>;

  // Map the API response into the existing structure
  return (
    <section className="w-full flex justify-center items-center p-5">
      <div className="max-w-[1360px] w-full flex justify-center items-center my-12 flex-col gap-5 lg:gap-20">
        {/* Title */}
        <h3 className="text-black text-[30px] lg:text-[60px] mb-4">
          {data.title}
        </h3>
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-[18px] lg:text-[25px] mt-2">
            {data.mainheading}
          </h3>
          {/* Mapping sections dynamically */}
          {data.headingdescription && data.headingdescription.length > 0 ? (
            data.headingdescription.map((data, index) => (
              <div key={index}>
                {/* Your data rendering logic */}

                <h3 className="text-[16px] lg:text-[22px] mt-2">
                  {data.heading}
                </h3>
                {/* {data.description &&
                  data.description.map((desc, idx) => (
                    <h4
                      className="text-[14px] font-normal lg:text-[16px]"
                      key={idx}
                    >
                      {desc}
                    </h4>
                  ))} */}
                <div
                  className="text-[18px]"
                  dangerouslySetInnerHTML={{ __html: data.description.join('') }}
                />
              </div>
            ))
          ) : (
            <p>No sections available</p>
          )}
        </div>
        <div className=" mt-0 lg:mt-[-70px] flex flex-col gap-5">

          {data.headingdescriptionliitems.map((data, index) => (
            <div key={index} className=" w-full">
              <h3 className="text-[16px] lg:text-[22px] mt-2">{data.heading}</h3>
              {/* {data.description.map((desc, i) => (
                <h4 className="text-[14px] font-normal lg:text-[16px] mt-2" key={i}>
                  {desc}
                </h4>
              ))} */}
              <div
                className="text-[18px] my-2"
                dangerouslySetInnerHTML={{ __html: data.description.join('') }}
              />
              {/* <ul className="list-disc list-inside ml-3 mt-2">
                {data.listitems.map((item, i) => (
                  <li className="text-[14px]" key={i}>
                    {item}
                  </li>
                ))}
              </ul> */}
              <div
                className="text-[18px] my-2"
                dangerouslySetInnerHTML={{ __html: data.listitems.join('') }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AcceptableUsePolicyPage;

