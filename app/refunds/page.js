// import React from 'react'
// import useApi from '../../hooks/useApi';
// import { getRefundPolicyPage } from '@/lib/woredpressApi';



// const Page = () => {

//     const { data, isLoading, isError, error } = useApi(getRefundPolicyPage);

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
//                 <h3 className='text-black  text-[30px] lg:text-[60px] mb-4'>Terms of Service</h3>
//                 <div className='flex flex-col w-full gap-2'>

//                     <h3 className='text-[18px] lg:text-[25px] mt-4'>Live Course and Live Mock Sessions – Terms and Conditions of Booking</h3>
//                     <ul className='list-decimal list-inside '>
//                         <li className='text-[14px]'>All live course bookings are confirmed fully only upon payment. Receipts are available on request.</li>
//                         <li className='text-[14px]'>All cancellations will be subject to a £75 administration charge (deducted from refund).</li>
//                         <li className='text-[14px]'>Cancellations up to 21 days prior to session allows for a full refund (minus admin charge) – unless you can find a replacement, in which case the full amount will be refunded.</li>
//                         <li className='text-[14px]'>Cancellations up to 7 days prior to session allows for a half refund (minus admin charge) – unless you can find a replacement, in which case the full amount will be refunded.</li>
//                         <li className='text-[14px]'>Cancellations after the 7 day limit does not allow for any refund – unless you can find a replacement, in which case the full amount will be refunded.</li>
//                         <li className='text-[14px]'>All date changes/swaps will be subject to a £35 administration charge (to be paid before transfer onto another date).</li>
//                         <li className='text-[14px]'>Date swaps are not allowed in the final 7 days before the course, unless you can find a replacement to take your place.</li>
//                         <li className='text-[14px]'> By booking a place on a course you are agreeing to all the above terms and conditions.</li>
//                         <li className='text-[14px]'>Any special offers that are released for day course booking can not be retrospectively applied.</li>

//                     </ul>
//                     <h3 className='text-[18px] lg:text-[25px] mt-4'>Online Course, Mock Exam Papers, Digital Flashcard and Audiobook Course Terms and Conditions of Purchase</h3>
//                     <ul className='list-decimal list-inside '>
//                         <li className='text-[14px]'>All purchases are confirmed fully only upon payment. Receipts are available on request.</li>
//                         <li className='text-[14px]'>Once an Audiobook Course has been downloaded or streamed refunds are not possible.
//                         </li>
//                         <li className='text-[14px]'>Once an Online Course has been purchased refunds are not possible unless there is an error on our part.</li>
//                         <li className='text-[14px]'>Once an Online Mock Exam has been purchased refunds are not possible unless there is an error on our part.</li>
//                         <li className='text-[14px]'>Once Digital Flashcards have been purchased refunds are not possible unless there is an error on our part.</li>
//                         <li className='text-[14px]'>By purchasing an Online Course, Mock Exam, Flashcard set or Audiobook Course you are agreeing to all the above terms and conditions.</li>
//                         <li className='text-[14px]'>Any special offers that are released for Online Courses, Mock Exams, Flashcards or Audiobook Courses can not be retrospectively applied.</li>
//                     </ul>



//                     <h3 className='text-[18px] lg:text-[25px] mt-4'>Posted Products Terms and Conditions of Purchase eg Posters</h3>
//                     <ul className='list-decimal list-inside '>
//                         <li className='text-[14px]'> If 15 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</li>
//                         <li className='text-[14px]'>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
//                         </li>
//                         <li className='text-[14px]'>Any special offers that are released for products can not be retrospectively applied.</li>
//                         <li className='text-[14px]'>For International postage no responsibility can be taken for packages once they have reached the destination country. We use Royal Mail International tracking and can provide you with the tracking number where requested.</li>
//                   </ul>
//                   <h3 className='text-[18px] lg:text-[25px]'>---------------------------------</h3>
//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>Additional non-returnable items:</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>* Downloadable / streamed software products</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>To complete your return, we require a receipt or proof of purchase.</h4>

//                   <h4 className='text-[14px]  lg:text-[16px] font-bold mt-2'>Refunds (if applicable)</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</h4>

//                   <h4 className='text-[14px]  lg:text-[16px] font-bold mt-2'>Late or missing refunds (if applicable)</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at <a href='mailto:hello@aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>hello@aroramedicaleducation.co.uk</a></h4>

//                   <h4 className='text-[14px]  lg:text-[16px] font-bold mt-2'>Sale items (if applicable)</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Only regular priced items may be refunded, unfortunately sale items cannot be refunded.</h4>



//                   <h4 className='text-[14px]  lg:text-[16px] font-bold mt-2'>Exchanges (if applicable)</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <a href='mailto:hello@aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>hello@aroramedicaleducation.co.uk</a> and send your item to: Regus Central Boulevard, Blythe Valley Business Park, Solihull, ABE, B90 8AG, United Kingdom.</h4>



//                   <h4 className='text-[14px]  lg:text-[16px] font-bold mt-2'>Shipping</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>To return your product, you should mail your product to: Regus Central Boulevard, Blythe Valley Business Park, Solihull, ABE, B90 8AG, United Kingdom. You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. Depending on where you live, the time it may take for your exchanged product to reach you, may vary. If you are shipping an item over £75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</h4>


//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 1 – ONLINE STORE TERMS</h3>

//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You must not transmit any worms or viruses or any code of a destructive nature.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>A breach or violation of any of the Terms will result in an immediate termination of your Services.</h4>





//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 2 – GENERAL CONDITIONS</h3>

//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We reserve the right to refuse service to anyone for any reason at any time.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 3 – ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h3>

//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 4 – MODIFICATIONS TO THE SERVICE AND PRICES</h3>

//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Prices for our products are subject to change without notice.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 5 – PRODUCTS OR SERVICES (if applicable)</h3>

//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor’s display of any color will be accurate.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.</h4>


//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 6 – ACCURACY OF BILLING AND ACCOUNT INFORMATION</h3>

//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>For more detail, please review our <a href='#' className='text-[#248cc8] font-bold'>Returns Policy</a>.</h4>


//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 7 – REFUNDS POLICY (see above)</h3>


//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 8 – THIRD-PARTY LINKS</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Certain content, products and services available via our Service may include materials from third-parties.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party’s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 9 – USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, ‘comments’), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.</h4>




//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 10 – PERSONAL INFORMATION</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 11 – ERRORS, INACCURACIES AND OMISSIONS</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 12 – PROHIBITED USES</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 13 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided ‘as is’ and ‘as available’ for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>In no case shall Arora Medical Education LTD, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 14 – INDEMNIFICATION</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You agree to indemnify, defend and hold harmless Arora Medical Education LTD and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</h4>


//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 15 – SEVERABILITY</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</h4>



// <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 16 – TERMINATION</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 17 – ENTIRE AGREEMENT</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 17 – ENTIRE AGREEMENT</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 18 – GOVERNING LAW</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Regus Central Boulevard, Blythe Valley Business Park, Solihull, BIR, B90 8AG, United Kingdom.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 19 – CHANGES TO TERMS OF SERVICE</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You can review the most current version of the Terms of Service at any time at this page.</h4>


//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 19 – CHANGES TO TERMS OF SERVICE</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>You can review the most current version of the Terms of Service at any time at this page.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</h4>



//                   <h3 className='text-[18px] lg:text-[25px] mt-4'>SECTION 20 – CONTACT INFORMATION</h3>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Questions about the Terms of Service should be sent to us at <a href='mailto:hello@aroramedicaleducation.co.uk' className='text-[#248cc8] font-bold'>hello@aroramedicaleducation.co.uk</a>.</h4>
//                   <h4 className='text-[14px] font-normal lg:text-[16px]'>Last updated March 2020</h4>

//                 </div>
//             </div>
//         </section>
//     )
// }

// export default Page




"use client"
import React from 'react';
import useApi from '../../hooks/useApi';
import { getRefundPolicyPage } from '@/lib/woredpressApi';

const RefundPolicyPage = () => {
  const { data, isLoading, isError, error } = useApi(getRefundPolicyPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) return <p>Error: {error}</p>;

  // Ensure data is defined and has the expected structure
  const sections = data?.sections || []; // Default to an empty array if sections are undefined

  return (
    <section className='w-full flex justify-center items-center p-5'>
      <div className='max-w-[1360px] w-full flex justify-center items-center my-24 flex-col gap-5 lg:gap-20'>
        <h3 className='text-black text-[30px] lg:text-[60px] mb-4'>{data.refundtitle}</h3>

        <div className="terms-container">

          {data.topheadings.map((item, index) => (
            <div key={index} className='flex flex-col w-full gap-2'>
              <h3 className='text-[18px] lg:text-[25px] mt-4'>{item.heading}</h3>
              <ul className='list-decimal list-inside '>
                {item.descriptionrepeator.map((description, descIndex) => (
                  <li key={descIndex} className='text-[14px]'>{description}</li>

                ))}
              </ul>
            </div>
          ))}
          <h3 className='text-[18px] lg:text-[25px]'>---------------------------------</h3>


          <h3 className='text-[18px] lg:text-[25px] my-4'>Additional non-returnable items:</h3>

          {data.nonreturnableitemstext.map((item, index) => (
            <div key={index} className="non-returnable-item">
              <h4 className='text-[14px] font-normal lg:text-[16px] mb-2'>*{item.description1}</h4>
              <h4 className='text-[14px] font-normal lg:text-[16px]'>{item.description2}</h4>
            </div>
          ))}

          {data.nonreturnablesubheadinganddescription.map((item, index) => (
            <div key={index} className="refund-info">
              <h4 className='text-[14px]  lg:text-[16px] font-bold mt-2'>{item.notreturnablesubheading}</h4>
              <h4 className='text-[14px] font-normal lg:text-[16px]'>{item.notreturnabledescription}</h4>
            </div>
          ))}
        </div>
        <div className='flex flex-col w-full gap-2'>
          {/* {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className='text-[18px] lg:text-[25px] mt-4 mb-2'>{section.sectionheading}</h3>
              <div className=''>
                {Array.isArray(section.sectiondescription) && section.sectiondescription.map((item, itemIndex) => (
                  <p className='text-[14px] font-normal my-5 lg:text-[16px]' key={itemIndex}>{item}</p>
                ))}
              </div>
            </div>
          ))} */}
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className='text-[18px] lg:text-[25px] mt-4 mb-2'>{section.sectionheading}</h3>
              <div className=''>
                {Array.isArray(section.sectiondescription) && section.sectiondescription.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {item.split('\r\n').map((line, lineIndex) => (
                      <p className='text-[14px] font-normal my-5 lg:text-[16px]' key={lineIndex}>
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className='flex w-full mt-0 lg:mt-[-90px] justify-start'>

          {/* <h3 className='text-[14px] font-normal lg:text-[16px]'>{data?.lastupdated}</h3> */}
          <div
            className="text-[18px] my-2"
            dangerouslySetInnerHTML={{ __html: data?.lastupdated }}
          />

        </div>

      </div>
    </section>
  );
};

export default RefundPolicyPage;
