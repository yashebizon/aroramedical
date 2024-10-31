// "use client";
// import React from 'react';
// import useApi from '../../hooks/useApi';
// import { getPrivacyPolicy } from '@/lib/woredpressApi';

// const PrivacyPolicy = () => {
//   const { data, isLoading, isError, error } = useApi(getPrivacyPolicy);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (isError) return <p>Error: {error}</p>;

//   return (
//     <section className="w-full flex justify-center items-center p-5">
//       <div className="max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-10">
//         <div className="flex flex-col w-full gap-5">
//           <h3 className="text-[60px] leading-[70px] font-bold text-center">
//             {data?.title}
//           </h3>
//           <div className="flex flex-col w-full gap-5">
//             <h3 className="text-[20px]">{data?.heading}</h3>
//             <p className="text-[16px]">{data?.description}</p>

//             <ul className="list-decimal list-inside ml-5">
//               {data?.headingitems?.map((heading, id) => (
//                 <li key={id} className="text-[14px]">{heading}</li>
//               ))}
//             </ul>

//             {/* Use dangerouslySetInnerHTML to handle HTML content */}
//             <div
//               className="text-[16px]"
//               dangerouslySetInnerHTML={{ __html: data?.seecookiepolicydescription }} 
//             />

//             {/* Mapping over privacy policy headings */}
//             {data?.privacypolicyheading?.map((policy, id) => (
//               <div key={id} className="">
//                 <h3 className="text-[20px]">{policy?.mainheading}</h3>

//                 {/* Mapping over subheading and description */}
//                 {policy?.subheadinganddescription?.map((subdata, subId) => (
//                   <div key={subId} className="mt-2">
//                     <h3 className="text-[20px]">{subdata?.heading}</h3>
//                     <p className="text-[16px]">{subdata?.description}</p>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PrivacyPolicy;


"use client";
import React from 'react';
import useApi from '../../hooks/useApi';
import { getPrivacyPolicy } from '@/lib/woredpressApi';

const PrivacyPolicy = () => {
  const { data, isLoading, isError, error } = useApi(getPrivacyPolicy);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) return <p>Error: {error}</p>;

  return (
    <section className="w-full flex justify-center items-center p-5">
      <div className="max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-10">
        <div className="flex flex-col w-full ">
          <h3 className=" text-[40px] lg:text-[60px] leading-[70px] font-bold text-center">
            {data?.title}
          </h3>
          <div className="flex flex-col w-full gap-5">


            {/* Use dangerouslySetInnerHTML to handle HTML content */}
            <div
              className="text-[16px]"
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;





{/* <section className='w-full flex justify-center items-center p-5'>
            <div className='max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-10'>

                <h3 className='text-black text-[40px] lg:text-[60px]'>Privacy Policy </h3>
                <div className='flex flex-col w-full gap-5'>

                    <h3 className='text-[20px]'>Introduction</h3>
                    <p className='text-[16px]'>Arora Medical Education Ltd respects your privacy and is committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website aroramedicaleducation.co.uk (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
                    <ul className='list-decimal list-inside ml-5'>
                        <li className='text-[14px]'>IMPORTANT INFORMATION AND WHO WE ARE</li>
                        <li className='text-[14px]'>THE DATA WE COLLECT ABOUT YOU</li>
                        <li className='text-[14px]'>HOW IS YOUR PERSONAL DATA COLLECTED?</li>
                        <li className='text-[14px]'>HOW WE USE YOUR PERSONAL DATA</li>
                        <li className='text-[14px]'>DISCLOSURES OF YOUR PERSONAL DATA</li>
                        <li className='text-[14px]'>INTERNATIONAL TRANSFERS</li>
                        <li className='text-[14px]'>DATA SECURITY</li>
                        <li className='text-[14px]'>DATA RETENTION</li>
                        <li className='text-[14px]'>YOUR LEGAL RIGHTS</li>
                        <li className='text-[14px]'>GLOSSARY</li>
                    </ul>
                    <p className='text-[16px]'>To see our Cookie Policy and update your preferences click here: <a href='/cookies-policy' className='text-[#248cc8] font-bold'>Cookies Policy</a></p>
                    <h3 className='text-[20px]'>1. Important information and who we are</h3>
                    <h3 className='text-[20px]'>Purpose of this Privacy Policy</h3>
                    <p className='text-[16px]'>This Privacy Policy aims to give you information on how Arora Medical Education Ltd collects and processes your personal data through your use of this Site, including any data you may provide through this Site when you sign up to our newsletter or purchase a product or service.<br /><br />

                        This Site is not intended for children and we do not knowingly collect data relating to children.<br /><br />

                        It is important that you read this Privacy Policy together with any other privacy policy or fair processing policy we may provide on specific occasions when we are collecting or processing personal data about you so that you are fully aware of how and why we are using your data. This Privacy Policy supplements other notices and privacy policies and is not intended to override them.</p>



                    <h3 className='text-[20px]'>Controller</h3>
                    <p className='text-[16px]'>Arora Medical Education Ltd is the controller and responsible for your personal data (referred to as “we”, “us” or “our” in this Privacy Policy).<br /><br />

                        We have appointed a Data Privacy Manager who is responsible for overseeing questions in relation to this Privacy Policy. If you have any questions about this Privacy Policy, including any requests to exercise your legal rights, please contact the Data Privacy Manager using the details set out below.</p>

                    <h3 className='text-[20px]'>Contact details</h3>
                    <p className='text-[16px]'>If you have any questions about this Privacy Policy or our privacy practices, please contact our Data Privacy Manager in the following ways:

                        <br /><br />
                        Pooja Arora<br /><br />


                        Address: Arora Medical Education, Regus, Central Boulevard, Blythe Valley Business Park, Solihull, B90 8AG.
                        <br /><br />

                        Email: <a className='text-[#248cc8] font-bold' href='mailto:Pooja@aroramedicaleducation.co.uk'>Pooja@aroramedicaleducation.co.uk</a><br /><br />


                        Telephone: <a className='text-[#248cc8] font-bold' href='tel:0156 471 1886'>0156 471 1886</a><br /><br />


                        You have the right to make a complaint at any time to the Information Commissioner’s Office (ICO), the UK supervisory authority for data protection issues <a className='text-[#248cc8] font-bold' target='_blank' href='https://ico.org.uk/'>(www.ico.org.uk)</a>. We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance.</p>
                    <h3 className='text-[20px]'>Changes to the Privacy Policy and your duty to inform us of changes</h3>
                    <p className='text-[16px]'>We keep our Privacy Policy under regular review. This version was last updated in March 2019. Historic versions can be obtained by contacting us.

                        It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.</p>

                    <h3 className='text-[20px]'>Third-party links</h3>
                    <p className='text-[16px]'>This Site may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.</p>
                    <h3 className='text-[20px]'>2. The data we collect about you</h3>
                    <p className='text-[16px]'>Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).

                        <br /><br />We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                    <ul className='list-disc list-inside ml-5'>
                        <li className='text-[14px]'><b>Identity Data </b> may include first name, last name, username or similar identifier, title.</li>
                        <li className='text-[14px]'><b>Contact Data </b> may include billing address, delivery address, email address and telephone number</li>
                        <li className='text-[14px]'><b>Financial Data </b> – please see cookie policy</li>
                        <li className='text-[14px]'><b>Transaction Data </b> may include details about payments to and from you and other details of products and services you have purchased from us.</li>
                        <li className='text-[14px]'><b>Technical Data may</b>include internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this Site.</li>
                        <li className='text-[14px]'><b>Profile Data may</b> include your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
                        <li className='text-[14px]'><b>Usage Data may </b>include information about how you use our website, products and services.</li>
                        <li className='text-[14px]'><b>Marketing and Communications Data may</b> include your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
                    </ul>
                    <p className='text-[16px]'>We also collect, use and share <b>Aggregated Data </b>such as statistical or demographic data for any purpose. Aggregated Data could be derived from your personal data but is not considered personal data in law as this data will <b>not</b> directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to calculate the percentage of users accessing a specific website feature. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this Privacy Policy.<br /><br />

                        We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data). Nor do we collect any information about criminal convictions and offences.

                    </p>
                    <h3 className='text-[20px]'>If you fail to provide personal data</h3>
                    <p className='text-[16px]'>Where we need to collect personal data by law, or under the terms of a contract we have with you, and you fail to provide that data when requested, we may not be able to perform the contract we have or are trying to enter into with you (for example, to provide you with goods or services). In this case, we may have to cancel a product or service you have with us but we will notify you if this is the case at the time.</p>



                    <h3 className='text-[20px]'>3. How is your personal data collected? </h3>
                    <p className='text-[16px]'>We use different methods to collect data from and about you including through:</p>
                    <ul className='list-disc list-inside ml-5'>
                        <li className='text-[14px]'>Direct interactions. You may give us your Identity, Contact and Financial Data by filling in forms or by corresponding with us by post, phone, email or otherwise. This includes personal data you provide when you:</li>
                        <li className='text-[14px]'>apply for our products or services;</li>
                        <li className='text-[14px]'>create an account on our Site;</li>
                        <li className='text-[14px]'>subscribe to our service or publications;</li>
                        <li className='text-[14px]'>request marketing to be sent to you;</li>
                        <li className='text-[14px]'>enter a competition, promotion or survey; or</li>
                        <li className='text-[14px]'>give us feedback or contact us.</li>
                        <li className='text-[14px]'>Automated technologies or interactions. As you interact with our Site, we will automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, server logs and other similar technologies. We may also receive Technical Data about you if you visit other websites employing our cookies. Please see our Cookies Policy for further details.</li>
                        <li className='text-[14px]'>Third parties or publicly available sources. We will receive personal data about you from various third parties and public sources as set out below:</li>
                        <li className='text-[14px]'>Technical Data from the following parties:</li>
                        <li className='text-[14px]'>analytics providers such as Google based outside the EU</li>
                        <li className='text-[14px]'>advertising networks.</li>
                        <li className='text-[14px]'>search information providers.</li>

                        <li className='text-[14px]'>Contact, Financial and Transaction Data from providers of technical, payment and delivery services such as PayPal and Stripe.</li>

                        <li className='text-[14px]'>We Operate an Express Checkout Service on our website which is provided by Stripe – this enables us to use Apple Pay and Google Pay as alternate ways to checkout. When you choose to pay using these digital wallet service providers we will send you transaction information via email to the email registered with that service provider (since this is required by the provider).</li>

                        <li className='text-[14px]'>Identity and Contact Data from data brokers or aggregators.</li>
                        <li className='text-[14px]'>Identity and Contact Data from publicly available sources such as Companies House and the Electoral Register based inside the EU.</li>



                    </ul>







                    <h3 className='text-[20px]'>4. How we use your personal data</h3>
                    <p className='text-[16px]'>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <ul className='list-disc list-inside ml-5'>
                        <li className='text-[14px]'>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li className='text-[14px]'>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li className='text-[14px]'>Where we need to comply with a legal obligation.</li>
                    </ul>
                    <p className='text-[16px]'>See below to find out more about the types of lawful basis that we will rely on to process your personal data.

                        We do not generally rely on consent as a legal basis for processing your personal data, although we will get your consent before sending third party direct marketing communications to you via email or text message. You have the right to withdraw consent to marketing at any time by contacting us.</p>
                    <h3 className='text-[18px]'>Purposes for which we will use your personal data</h3>
                    <p className='text-[16px]'>We have set out below, in a table format, a description of all the ways we plan to use your personal data, and which of the legal bases we rely on to do so. We have also identified what our legitimate interests are where appropriate.

                        Note that we may process your personal data for more than one lawful ground depending on the specific purpose for which we are using your data. Please contact us if you need details about the specific legal ground we are relying on to process your personal data where more than one ground has been set out in the table below.</p>
                        <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200 my-10">
    <thead className="bg-gray-50">
      <tr>
        <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">Purpose/Activity</th>
        <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">Type of data</th>
        <th className="text-base sm:text-[16px] md:text-[20px] font-bold text-black text-start py-3 px-4 sm:px-6">Lawful basis for processing including basis of legitimate interest</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      <tr>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 font-bold">To register you as a new customer</td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Identity <br />
          (b) Contact
        </td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">Performance of a contract with you</td>
      </tr>
      <tr>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 font-bold">To process and deliver your order including:</td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Identity <br />
          (b) Contact <br />
          (c) Financial <br />
          (d) Transaction <br />
          (e) Marketing and Communications
        </td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Performance of a contract with you <br />
          (b) Necessary for our legitimate interests (to recover debts due to us)
        </td>
      </tr>
      <tr>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 "><b>To manage our relationship with you which will include:</b><br/><br/>
        (a) Notifying you about changes to our terms or Privacy Policy <br />
        (b) Asking you to leave a review or take a survey</td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Identity <br />
          (b) Contact <br />
          (c) Profile <br />
          (d) Marketing and Communications
        </td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Performance of a contract with you <br />
          (b) Necessary to comply with a legal obligation <br />
          (c) Necessary for our legitimate interests (to keep our records updated and to study how customers use our products/services)
        </td>
      </tr>
      <tr>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 "><b>To enable you to partake in a prize draw, competition or complete a survey</b><br/></td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Identity <br />
          (b) Contact <br />
          (c) Profile <br />
          (d) Usage <br />
          (e) Marketing and Communications
        </td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Performance of a contract with you <br />
          (b) Necessary for our legitimate interests (to study how customers use our products/services, to develop them and grow our business)
        </td>
      </tr>
      <tr>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 "><b>To administer and protect our business and this Site (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data)</b><br/></td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Identity <br />
          (b) Contact <br />
          (c) Technical
        </td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Necessary for our legitimate interests (for running our business, provision of administration and IT services, network security, to prevent fraud and in the context of a business reorganisation or group restructuring exercise) <br />
          (b) Necessary to comply with a legal obligation Necessary for our legitimate interests (to study how customers use our products/services, to develop them, to grow our business and to inform our marketing strategy)
        </td>
      </tr>
      <tr>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 "><b>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you</b><br/></td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Identity <br />
          (b) Contact <br />
          (c) Profile <br />
          (d) Usage <br />
          (e) Marketing and Communications <br />
          (f) Technical
        </td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          Necessary for our legitimate interests (to define types of customers for our products and services, to keep our website updated and relevant, to develop our business and to inform our marketing strategy)
        </td>
      </tr>
      <tr>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 "><b>To use data analytics to improve our Site, products/services, marketing, customer relationships and experiences</b><br/></td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Usage <br />
          (b) Technical
        </td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          Necessary for our legitimate interests (to develop our products/services and grow our business)
        </td>
      </tr>
      <tr>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6 "><b>To make suggestions and recommendations to you about goods or services that may be of interest to you</b><br/></td>
        <td className="text-sm sm:text-[14px] md:text-[16px] text-black py-3 px-4 sm:px-6">
          (a) Identity <br />
          (b) Contact <br />
          (c) Profile <br />
          (d) Usage <br />
          (e) Marketing and Communications <br />
          (f) Technical
        </td>
      </tr>
    </tbody>
  </table>
</div>


                    <h3 className='text-[18px]'>Marketing</h3>
                    <p className='text-[16px]'>We strive to provide you with choices regarding certain personal data uses, particularly around marketing and advertising. To make certain decisions about your personal data use you can contact us at <a className='text-[#248cc8] font-bold' href='mailto:hello@aroramedicaleducation.co.uk'>hello@aroramedicaleducation.co.uk</a></p>

                    <h3 className='text-[18px]'>Promotional offers from us

                    </h3>
                    <p className='text-[16px]'>We may use your Identity, Contact, Technical, Usage and Profile Data to form a view on what we think you may want or need, or what may be of interest to you. This is how we decide which products, services and offers may be relevant for you (we call this marketing).<br /><br />

                        You will receive marketing communications from us if you have requested information from us or purchased goods or services from us and you have not opted out of receiving that marketing.

                    </p>

                    <h3 className='text-[18px]'>Third-party marketing

                    </h3>
                    <p className='text-[16px]'>We will get your express opt-in consent before we share your personal data with any third party for marketing purposes.

                    </p>

                    <h3 className='text-[18px]'>Opting out

                    </h3>
                    <p className='text-[16px]'>You can ask us or third parties to stop sending you marketing messages at any time by contacting us at any time.<br /><br />

                        Where you opt out of receiving these marketing messages, this will not apply to personal data provided to us as a result of a product/service purchase, warranty registration, product/service experience or other transactions.
                    </p>


                    <h3 className='text-[18px]'>Cookies

                    </h3>
                    <p className='text-[16px]'>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this Site may become inaccessible or not function properly. For more information about the cookies we use, please see our Cookies Policy.
                    </p>



                    <h3 className='text-[18px]'>Change of purpose

                    </h3>
                    <p className='text-[16px]'>
                        We will only use your personal data for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If you wish to get an explanation as to how the processing for the new purpose is compatible with the original purpose, please contact us.<br /><br />

                        If we need to use your personal data for an unrelated purpose, we will notify you and we will explain the legal basis which allows us to do so.<br /><br />

                        Please note that we may process your personal data without your knowledge or consent, in compliance with the above rules, where this is required or permitted by law.
                    </p>



                    <h3 className='text-[20px]'>5. Disclosures of your personal data

                    </h3>
                    <p className='text-[16px]'>
                        We may share your personal data with the parties set out below for the purposes set out in the table ‘Purposes for which we will use your personal data’ above.
                    </p>
                    <ul className='list-inside list-disc'>
                        <li className='text-[14px]'>Third Parties as set out in the <a className='text-[#248cc8] font-bold' href='/cookies-policy'> Cookies Policy</a>.</li>
                        <li className='text-[14px]'>Third parties to whom we may choose to sell, transfer or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use your personal data in the same way as set out in this Privacy Policy.
                        </li>

                    </ul>
                    <p className='text-[16px]'>
                    We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
                    </p>






                    <h3 className='text-[20px]'>6. International transfers

                    </h3>
                    <p className='text-[16px]'>
                    Many of our external third parties are based outside the EEA so their processing of your personal data will involve a transfer of data outside the EEA.<br /><br />

Whenever we transfer your personal data out of the EEA, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:
                    </p>
                    <ul className='list-inside list-disc'>
                        <li className='text-[14px]'>We will only transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission. For further details, see European Commission: Adequacy of the protection of personal data in non-EU countries.</li>
                        <li className='text-[14px]'>Where we use certain service providers, we may use specific contracts approved by the European Commission which give personal data the same protection it has in Europe. For further details, see European Commission: Model contracts for the transfer of personal data to third countries.
                        </li>
                        <li className='text-[14px]'>Where we use providers based in the US, we may transfer data to them if they are part of the Privacy Shield which requires them to provide similar protection to personal data shared between Europe and the US. For further details, see European Commission: EU-US Privacy Shield.</li>


                    </ul>
                    <p className='text-[16px]'>
                    Please contact us if you want further information on the specific mechanism used by us when transferring your personal data out of the EEA.
                    </p>


                    <h3 className='text-[20px]'>7. Data security

</h3>
<p className='text-[16px]'>
We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.<br /><br />

We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
</p>


<h3 className='text-[20px]'>8. Data retention

</h3>

<h3 className='text-[20px]'>How long will you use my personal data for?

</h3>
<p className='text-[16px]'>
We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.<br /><br />

To determine the appropriate retention period for personal data, we consider the amount, nature and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal, regulatory, tax, accounting or other requirements.<br /><br />

Details of retention periods for different aspects of your personal data are set out below.<br /><br />

By law we have to keep basic information about our customers (including Contact, Identity, Financial and Transaction Data) for six years after they cease being customers for [tax] purposes.<br /><br />

In some circumstances you can ask us to delete your data: see your legal rights below for further information.<br /><br />

In some circumstances we will anonymise your personal data (so that it can no longer be associated with you) for research or statistical purposes, in which case we may use this information indefinitely without further notice to you.
</p>



<h3 className='text-[20px]'>9. Your legal rights

</h3>

<p className='text-[18px]'>Under certain circumstances, you have rights under data protection laws in relation to your personal data. Please see below to find out more about these rights:

</p>
<ul className='list-inside list-disc'><li className='text-[14px]'>Request access to your personal data.</li>
<li className='text-[14px]'>Request correction of your personal data.</li>
<li className='text-[14px]'>Request erasure of your personal data.</li>
<li className='text-[14px]'>Object to processing of your personal data.</li>
<li className='text-[14px]'>Request restriction of processing your personal data.</li>
<li className='text-[14px]'>Request transfer of your personal data.</li>
<li className='text-[14px]'>Right to withdraw consent.</li></ul>

<p className='text-[18px]'>If you wish to exercise any of the rights set out above, please contact us at <a className='text-[#2590DB]' href='mailto:hello@aroramedicaleducation.co.uk'>hello@aroramedicaleducation.co.uk</a></p>

<h3 className='text-[20px]'>No fee usually required



</h3>

<p className='text-[16px]'>You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive. Alternatively, we could refuse to comply with your request in these circumstances.

</p>

<h3 className='text-[20px]'>What we may need from you



</h3>

<p className='text-[16px]'>We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data (or to exercise any of your other rights). This is a security measure to ensure that personal data is not disclosed to any person who has no right to receive it. We may also contact you to ask you for further information in relation to your request to speed up our response.

</p>

<h3 className='text-[20px]'>Time limit to respond



</h3>

<p className='text-[16px]'>We try to respond to all legitimate requests within one month. Occasionally it could take us longer than a month if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated.

</p>


<h3 className='text-[20px]'>10. Glossary

</h3>
<h3 className='text-[20px]'>LAWFUL BASIS

</h3>

<p className='text-[18px]'>
Legitimate Interest means the interest of our business in conducting and managing our business to enable us to give you the best service/product and the best and most secure experience. We make sure we consider and balance any potential impact on you (both positive and negative) and your rights before we process your personal data for our legitimate interests. We do not use your personal data for activities where our interests are overridden by the impact on you (unless we have your consent or are otherwise required or permitted to by law). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by contacting us.<br /><br />

Performance of Contract means processing your data where it is necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract.<br /><br />

Comply with a legal obligation means processing your personal data where it is necessary for compliance with a legal obligation that we are subject to.


</p>

<h3 className='text-[20px]'>THIRD PARTIES

</h3>
<ul className='list-inside list-disc'><li className='text-[14px]'>Service providers acting as processors who provide – for example – IT and system administration services.</li>
<li className='text-[14px]'>Professional advisers acting as processors or joint controllers, including lawyers, bankers, auditors and insurers who provide – for example – consultancy, banking, legal, insurance and accounting services].</li>
<li className='text-[14px]'>HM Revenue & Customs, regulators and other authorities acting as processors or joint controllers based in the United Kingdom who require reporting of processing activities in certain circumstances.</li>
</ul>


<h3 className='text-[20px]'>YOUR LEGAL RIGHTS



</h3>
<p className='text-[16px]'>You have the right to:
</p>
<p className='text-[16px]'><b>Request access</b> to your personal data (commonly known as a “data subject access request”). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.<br /><br />

<b>Request correction</b> of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.<br /><br />

<b>Request erasure</b> of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove your personal data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase your personal data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request.<br /><br />

<b>Object to processing</b> of your personal data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.<br /><br />

<b>Request restriction </b>of processing of your personal data. This enables you to ask us to suspend the processing of your personal data in the following scenarios:<br /><br />

If you want us to establish the data’s accuracy.<br /><br />

Where our use of the data is unlawful but you do not want us to erase it.<br /><br />

Where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims.<br /><br />

You have objected to our use of your data but we need to verify whether we have overriding legitimate grounds to use it.<br /><br />

<b>Request the transfer</b> of your personal data to you or to a third party. We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.<br /><br />

<b>Withdraw consent at any time</b> where we are relying on consent to process your personal data. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent.
</p>
                </div>

            </div>
        </section> */}