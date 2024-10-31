// "use client";
// import React from 'react';
// import useApi from '../../hooks/useApi';
// import { getTermsandConditionPageinfo } from '@/lib/woredpressApi';

// const Page = () => {
//   const { data, isLoading, isError, error } = useApi(getTermsandConditionPageinfo);

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
//       <div className="max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20">
//         <h3 className='text-black  text-[30px] lg:text-[60px] mb-4'>Terms and Conditions</h3>
//                 <div className='flex flex-col w-full gap-2'>

//                     <h3 className='text-[18px] lg:text-[25px] mt-4'>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING THIS SITE</h3>
//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>What’s in these terms?</h3>

//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>These Terms of Use tell you the rules for using our website <a href='https://aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>aroramedicaleducation.co.uk.</a></h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>For terms and conditions related to booking courses, refunds, date swap, our money-back guarantee etc see our <a href='/refund' target='_blank' className='text-[#248cc8] font-bold'>Refunds Policy</a>.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>See below for more information on each area:</h3>
//                     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>Who we are and how to contact us</li>
//                         <li className='text-[14px]'>By using our Site you accept these Terms</li>
//                         <li className='text-[14px]'>There are other terms that may apply to you</li>
//                         <li className='text-[14px]'>We may make changes to these Terms</li>
//                         <li className='text-[14px]'>We may make changes to our Site</li>
//                         <li className='text-[14px]'>We may suspend or withdraw our Site</li>
//                         <li className='text-[14px]'>You must keep your account details safe</li>

//                         <li className='text-[14px]'>How you may use material on our Site</li>

//                         <li className='text-[14px]'>Do not rely on information on our Site</li>

//                         <li className='text-[14px]'>We are not responsible for websites we link to</li>

//                         <li className='text-[14px]'>User-generated content is not approved by us</li>
//                         <li className='text-[14px]'>Our responsibility for loss or damage suffered by you</li>

//                         <li className='text-[14px]'>Exclusion of liability for digital content</li>
//                         <li className='text-[14px]'>How we may use your personal information </li>

//                         <li className='text-[14px]'>Uploading content to our Site  Rights you are giving us to use material you upload</li>
//                         <li className='text-[14px]'>We are not responsible for viruses and you must not introduce them</li>

//                         <li className='text-[14px]'>Rules about linking to our Site</li>

//                         <li className='text-[14px]'>Which country’s laws apply to any disputes?</li>
//                     </ul>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Who we are and how to contact us</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'><a href='https://aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>aroramedicaleducation.co.uk.</a> is a site operated by Arora Medical Education Ltd (referred to as ‘we’, ‘our’ or ‘us’ in these Terms). We are registered in England and Wales under company number 10306221 and have our registered office at Regus Central Boulevard, Blythe Valley Business Park, Solihull, England, B90 8AG. Our main trading address is Regus Central Boulevard, Blythe Valley Business Park, Solihull, England, B90 8AG . Our VAT number is 230874218. </h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We are a limited company.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>To contact us, please email <a href='mailto:hello@aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>hello@aroramedicaleducation.co.uk</a> or telephone our customer service line on <a href='tel:0156 471 1886' className='text-[#248cc8] font-bold'>0156 471 1886</a>.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>By using our Site you accept these Terms</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>By using our Site, you confirm that you accept these Terms of Use and that you agree to comply with them.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you do not agree to these Terms, you must not use our Site.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We recommend that you print a copy of these Terms for future reference.</h4>


//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>There are other terms that may apply to you</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>These Terms of Use refer to the following additional terms, which also apply to your use of our Site:</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Our Privacy Policy  <a href='https://aroramedicaleducation.co.uk/privacy-policy/' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/privacy-policy/</a></h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Our Acceptable Use Policy <a href='https://aroramedicaleducation.co.uk/acceptable-use-policy/' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/acceptable-use-policy/</a>, which sets out the permitted uses and prohibited uses of our Site. When using our Site, you must comply with this Acceptable Use Policy.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Our <a href='https://aroramedicaleducation.co.uk/cookies-policy/' className='text-[#248cc8] font-bold'>Cookies Policy</a> which sets out information about the use of cookies on our Site.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you purchase goods from our Site, our Terms and conditions of supply <a href='https://aroramedicaleducation.co.uk/terms-and-conditions/' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/terms-and-conditions/</a> will apply to the sales.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>We may make changes to these Terms</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We amend these Terms from time to time. Every time you wish to use our Site, please check these Terms to ensure you understand the terms that apply at that time. These Terms were most recently updated in March 2019.</h4>

//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>We may make changes to our Site</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We may update and change our Site from time to time to reflect changes to our products, our users’ needs and our business priorities. We will try to give you reasonable notice of any major changes.</h4>



//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>We may suspend or withdraw our Site</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Our Site is made available free of charge.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We do not guarantee that our Site, or any content on it, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of our Site for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>You are also responsible for ensuring that all persons who access our Site through your internet connection are aware of these Terms of Use and other applicable terms and conditions, and that they comply with them.</h4>




//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>You must keep your account details safe</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you choose, or you are provided with, a user identification code, password or any other piece of information as part of our security procedures, you must treat such information as confidential. You must not disclose it to any third party.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We have the right to disable any user identification code or password, whether chosen by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these Terms of Use.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you know or suspect that anyone other than you knows your user identification code or password, you must promptly notify us at <a href='mailto:hello@aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>hello@aroramedicaleducation.co.uk</a></h4>


//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>How you may use material on our Site</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We are the owner or the licensee of all intellectual property rights in our Site, and in the material published on it.  Those works are protected by copyright laws and treaties around the world. All such rights are reserved.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>You may view, print and download extracts, of any page(s) from our Site for your personal use and you may draw the attention of others within your organisation to content posted on our Site.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>You must not modify the paper or digital copies of any materials you have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences or any graphics separately from any accompanying text.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Our status (and that of any identified contributors) as the authors of content on our Site must always be acknowledged.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>You must not use any part of the content on our Site for commercial purposes without obtaining a licence to do so from us or our licensors.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you print off, copy or download any part of our Site in breach of these Terms of Use, your right to use our Site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.</h4>



//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Do not rely on information on this Site</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>The content on our Site is provided for general information only. It is not intended to amount to advice on which you should rely. You must obtain professional or specialist advice (including, without limitation, medical advice) before taking, or refraining from, any action on the basis of the content on our Site.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Although we make reasonable efforts to update the information on our Site, we make no representations, warranties or guarantees, whether express or implied, that the content on our Site is accurate, complete or up to date.</h4>



//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>We are not responsible for websites we link to</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>Where our Site contains links to other sites and resources provided by third parties, these links are provided for your information only. Such links should not be interpreted as approval by us of those linked websites or information you may obtain from them.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>We have no control over the contents of those sites or resources.</h4>



//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>User-generated content is not approved by us</h3>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>This Site may include information and materials uploaded by other users of the Site, including to bulletin boards and chat rooms. This information and these materials have not been verified or approved by us. The views expressed by other users on our Site do not represent our views or values.</h4>
//                     <h4 className='text-[14px] font-normal lg:text-[16px]'>If you wish to complain about information and materials uploaded by other users please contact us at <a href='mailto:hello@aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>hello@aroramedicaleducation.co.uk</a></h4>


//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Our responsibility for loss or damage suffered by you</h3>
//                     <h3 className='text-[16px] lg:text-[22px] mt-2'>Whether you are a consumer or a business user:</h3>

//                     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>We do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or subcontractors and for fraud or fraudulent misrepresentation.</li>
//                         <li className='text-[14px]'>Different limitations and exclusions of liability will apply to liability arising as a result of the supply of any products to you, which will be set out in our Terms and conditions of supply <a href='https://aroramedicaleducation.co.uk/terms-and-conditions/' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/terms-and-conditions/</a> </li>
//                         </ul>



//                         <h3 className='text-[16px] lg:text-[22px] mt-2'>If you are a business user:</h3>

// <ul className='list-disc list-inside ml-5'>
//     <li className='text-[14px]'>We exclude all implied conditions, warranties, representations or other terms that may apply to our Site or any content on it.
//     </li>
//     <li className='text-[14px]'>We will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:</li>
//     <li className='text-[14px]'>use of, or inability to use, our Site; or</li>
//     <li className='text-[14px]'>use of or reliance on any content displayed on our Site.</li>

//     <li className='text-[14px]'>In particular, we will not be liable for:</li>

//     <li className='text-[14px]'>loss of profits, sales, business, or revenue;</li>


//     <li className='text-[14px]'>business interruption;</li>
//     <li className='text-[14px]'>loss of anticipated savings;</li>
//     <li className='text-[14px]'>loss of business opportunity, goodwill or reputation; or</li>

//     <li className='text-[14px]'>any indirect or consequential loss or damage.</li>






//     </ul>




//     <h3 className='text-[16px] lg:text-[22px] mt-2'>If you are a consumer user:</h3>

// <ul className='list-disc list-inside ml-5'>
//     <li className='text-[14px]'>Please note that we only provide our Site for domestic and private use. You agree not to use our Site for any commercial or business purposes, and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.</li>
//     <li className='text-[14px]'>If defective digital content that we have supplied, damages a device or digital content belonging to you and this is caused by our failure to use reasonable care and skill, we will either repair the damage or pay you compensation. However, we will not be liable for damage that you could have avoided by following our advice to apply an update offered to you free of charge or for damage that was caused by you failing to correctly follow installation instructions or to have in place the minimum system requirements advised by us.</li>
//     </ul>


//     <h3 className='text-[16px] lg:text-[22px] mt-2'>How we may use your personal information</h3>
//     <h4 className='text-[14px] font-normal lg:text-[16px]'>We will only use your personal information as set out in our Privacy Policy <a href='https://aroramedicaleducation.co.uk/privacy-policy/' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/privacy-policy/</a></h4>

//     <h3 className='text-[16px] lg:text-[22px] mt-2'>Uploading content to our Site</h3>
//     <h4 className='text-[14px] font-normal lg:text-[16px]'>Whenever you make use of a feature that allows you to upload content to our Site, or to make contact with other users of our Site, you must comply with the content standards set out in our Acceptable Use Policy <a href='https://aroramedicaleducation.co.uk/acceptable-use-policy/' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/acceptable-use-policy/</a></h4>
//     <h4 className='text-[14px] font-normal lg:text-[16px]'>You warrant that any such contribution does comply with those standards, and you will be liable to us and indemnify us for any breach of that warranty. This means you will be responsible for any loss or damage we suffer as a result of your breach of warranty.</h4>
//     <h4 className='text-[14px] font-normal lg:text-[16px]'>Any content you upload to our Site will be considered non-confidential and non-proprietary. You retain all of your ownership rights in your content, but you are required to grant us and other users of our Site a limited licence to use, store and copy that content and to distribute and make it available to third parties. The rights you license to us are described in Rights you are giving us to use material you upload.</h4>
//     <h4 className='text-[14px] font-normal lg:text-[16px]'>We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our Site constitutes a violation of their intellectual property rights, or of their right to privacy.</h4>
//     <h4 className='text-[14px] font-normal lg:text-[16px]'>We have the right to remove any posting you make on our Site if, in our opinion, your post does not comply with the content standards set out in our Acceptable Use Policy <a href='https://aroramedicaleducation.co.uk/acceptable-use-policy/' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/acceptable-use-policy/</a></h4>
//     <h4 className='text-[14px] font-normal lg:text-[16px]'>You are solely responsible for securing and backing up your content.</h4>


//     <h3 className='text-[16px] lg:text-[22px] mt-2'>Rights you are giving us to use material you upload</h3>
//     <h4 className='text-[14px] font-normal lg:text-[16px]'>When you upload or post content to our Site, you grant us the following rights to use that content:</h4>
//     <ul className='list-disc list-inside ml-5'>
//                         <li className='text-[14px]'>A perpetual, worldwide, non-exclusive, royalty-free, transferable licence to use, reproduce, distribute, prepare derivative works of, display, and perform that user-generated content in connection with the service provided by the Site and across different media, and to use the content to promote the Site or the service.</li>
//                         <li className='text-[14px]'>A perpetual, worldwide, non-exclusive, royalty-free, transferable licence to third parties (such as other users, partners or advertisers) to use the content for their purposes or in accordance with the functionality of the Site.</li>
//                          </ul>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>These licences will expire if you delete the content from the Site.</h4>

//                          <h3 className='text-[16px] lg:text-[22px] mt-2'>We are not responsible for viruses and you must not introduce them</h3>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>We do not guarantee that our Site will be secure or free from bugs or viruses.</h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>You are responsible for configuring your information technology, computer programmes and platform to access our Site. You should use your own virus protection software.</h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>You must not misuse our Site by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful. You must not attempt to gain unauthorised access to our Site, the server on which our Site is stored or any server, computer or database connected to our Site. You must not attack our Site via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our Site will cease immediately.</h4>

//                          <h3 className='text-[16px] lg:text-[22px] mt-2'>Rules about linking to our Site</h3>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it.</h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>You must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists.</h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>You must not establish a link to our Site in any website that is not owned by you.</h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>Our Site must not be framed on any other site, nor may you create a link to any part of our Site other than the home page.</h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>We reserve the right to withdraw linking permission without notice.</h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>The website in which you are linking must comply in all respects with the content standards set out in our Acceptable Use Policy <a href='https://aroramedicaleducation.co.uk/acceptable-use-policy/' className='text-[#248cc8] font-bold'>https://aroramedicaleducation.co.uk/acceptable-use-policy/</a></h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>If you wish to link to or make any use of content on our Site other than that set out above, please contact <a href='mailto:hello@aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>hello@aroramedicaleducation.co.uk</a></h4>

//                          <h3 className='text-[16px] lg:text-[22px] mt-2'>Which country’s laws apply to any disputes?</h3>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>If you are a consumer, please note that these Terms of Use, their subject matter and their formation, are governed by English law. You and we both agree that the courts of England and Wales will have exclusive jurisdiction except that if you are a resident of Northern Ireland you may also bring proceedings in Northern Ireland, and if you are resident of Scotland, you may also bring proceedings in Scotland.</h4>
//                          <h4 className='text-[14px] font-normal lg:text-[16px]'>If you are a business, these Terms of Use, their subject matter and their formation (and any non-contractual disputes or claims) are governed by English law. We both agree to the exclusive jurisdiction of the courts of England and Wales.</h4>


//                 </div>
//                 </div>
//     </section>
//   );
// }

// export default Page;

// "use client";
// import React from 'react';
// import useApi from '../../hooks/useApi';
// import { getTermsandConditionPageinfo } from '@/lib/woredpressApi';

// const Page = () => {
//   const { data, isLoading, isError, error } = useApi(getTermsandConditionPageinfo);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (isError) return <p>Error: {error}</p>;


//   return (
//     <section className="w-full flex justify-center items-center p-5 overflow-hidden" >
//       <div className="max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20">
//         <h3 className='text-black text-[30px] lg:text-[60px] mb-4'>{data.title}</h3>
//         <div className='flex flex-col w-full gap-2 '>
//           {data.headinganddescriptions?.map((item, index) => (
//             <div key={index} className='my-4'>
//               <h6 className="font-bold mb-4 text-[30px]">{item.heading}</h6>
//               {/* <ul className='list-disc list-inside ml-5'>
//                 {item.descriptiontext?.map((text, textIndex) => (
//                   <li className='text-[14px]' key={textIndex}>{text}</li>
//                 ))}
//               </ul> */}
//               <div
//                 className="text-[18px]"
//                 dangerouslySetInnerHTML={{ __html: item.descriptiontext }}
//               />
//               {/* {item.descriptiontextarea?.map((textarea, textareaIndex) => (
//                 <p key={textareaIndex}>{textarea}</p>
//               ))} */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Page;


"use client";
import React from 'react';
import useApi from '../../hooks/useApi';
import { getTermsandConditionPageinfo } from '@/lib/woredpressApi';

const Page = () => {
  const { data, isLoading, isError, error } = useApi(getTermsandConditionPageinfo);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) return <p>Error: {error}</p>;

  return (
    <section className="w-full flex justify-center items-center p-5 overflow-hidden">
      <div className="max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20">
        <h3 className="text-black text-[30px] lg:text-[60px] mb-4 leading-[40px] lg:leading-[70px]">{data.title}</h3>

        <div className="flex flex-col w-full gap-2">
          <h3 className="text-black text-[16px] lg:text-[30px] leading-[40px]">{data.mainheading}</h3>
          {data?.mainsubheading?.length > 0 && (
            <div
              className="text-[14px] lg:text-[18px] mt-5 terms-condition"
              dangerouslySetInnerHTML={{ __html: data.mainsubheading }}
            />
          )}

          {data.headinganddescriptions?.map((item, index) => (
            <div key={index} className="my-4">
              <h6 className="font-bold mb-4 text-[20px] leading-[30px]">{item.heading}</h6>
              {item.descriptiontext.length > 0 && (
                <div
                  className="text-[14px] lg:text-[18px] terms-condition"
                  dangerouslySetInnerHTML={{ __html: item.descriptiontext.join('') }}
                />
              )}
              {item.descriptiontextarea.length > 0 && (
                <div>
                  <div
                    className="text-[14px] lg:text-[18px] terms-condition"
                    dangerouslySetInnerHTML={{ __html: item.descriptiontextarea.join('') }}
                  />

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;



