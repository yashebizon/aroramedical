import React, { useState, useEffect } from 'react';
import { getfooter, getHomePage, getSiteLogo } from '../../../lib/woredpressApi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import '.././home/home.css';
import ScrollToTop from "react-scroll-to-top";
import Link from 'next/link';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [menuList1, setMenuList1] = useState([]);
  const [menuList2, setMenuList2] = useState([]);
  const [letter, setLetter] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [sociallink, setSociallink] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const datas = await getHomePage();
        setHomeData(datas.acf_groups.FooterContent);
        setSociallink(datas.acf_groups.SocialLInks);

        const data = await getfooter();
        setFooterData(data);

        const logoData = await getSiteLogo();
        setLogoUrl(logoData);

        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Extract menu items from the first list
        const list1 = tempDiv.querySelector('#menu-footer-1');
        if (list1) {
          const items1 = Array.from(list1.querySelectorAll('li')).map(li => ({
            id: li.id,
            text: li.textContent,
            href: li.querySelector('a')?.href || '#'
          }));
          setMenuList1(items1);
        }

        // Extract menu items from the second list
        const list2 = tempDiv.querySelector('#menu-footer-2');
        if (list2) {
          const items2 = Array.from(list2.querySelectorAll('li')).map(li => ({
            id: li.id,
            text: li.textContent,
            href: li.querySelector('a')?.href || '#'
          }));
          setMenuList2(items2);
        }

        const newsLetter = tempDiv.querySelector('.col-lg-4.col-md-12.col-sm-12');
        if (newsLetter) {
          const item3 = {
            title: newsLetter.querySelector('h4')?.textContent || '',
            description: newsLetter.querySelector('p')?.textContent || '',
            formAction: newsLetter.querySelector('form')?.getAttribute('action') || '',
            inputPlaceholder: newsLetter.querySelector('input[type="email"]')?.getAttribute('placeholder') || ''
          };
          setLetter(item3);
        }

        const companyInfoDiv = tempDiv.querySelector('.col-lg-4.col-md-4.col-sm-12');
        if (companyInfoDiv) {
          const logoSrc = companyInfoDiv.querySelector('img')?.src || '';
          const paragraphs = companyInfoDiv.querySelectorAll('p');
          
          setCompanyInfo({
            logoSrc: logoSrc,
            companyName: paragraphs[0]?.textContent || '',
            address: paragraphs[1]?.textContent || ''
          });
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };
    fetchFooterData();
  }, []);

  if (!footerData) {
    return null; // Or return a loading indicator
  }

  return (
    <footer className="bg-[#EEF1F8] py-12 font-sans footer">
      <div className="footer-colwrapper container mx-auto px-4 md:px-0 sm:px-6 lg:px-8">
      <ScrollToTop
        smooth
        component={<div className='gotop-links'>Back to Top</div>}
      />
        <div className="flex flex-wrap justify-between footer-rowcol">
          {/* Company Info Section */}
          {homeData.footerlogo && (
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mb-8 md:mb-0 customcode-footer customcode-footer-order1">
              <img src={homeData.footerlogo} alt="Company Logo" className="mb-4 max-w-[289px]" />
              <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: homeData.footerabtcontent }}></p>
            </div>
          )}

          {/* Menu List */}
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mb-8 md:mb-0 customcode-footer-1">
            <h4 className="font-semibold mb-4 text-[#486284] menu-head">Menu</h4>
            <ul className=" space-y-2">
              {menuList1.map(item => (
                <li key={item.id}>
                  <Link href={item.href} className="text-gray-600 hover:text-gray-800">{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company List */}
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mb-8 md:mb-0 customcode-footer-2">
            <h4 className="font-semibold mb-4 text-[#486284] menu-head">Company</h4>
            <ul className="space-y-2">
              {menuList2.map(item => (
                <li key={item.id}>
                  <Link href={item.href} className="text-gray-600 hover:text-gray-800">{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          {letter && (
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mb-8 md:mb-0 customcode-footer-3 subscribe-menus">
              <h4 className="font-semibold mb-4 text-[#486284] menu-head">Subscribe Newsletter</h4>
              <form action={letter.formAction} method="post" className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-full  newsinput"
                />
                <button
                  type="submit"
                  className="bg-[#486284] w-32  text-white p-2 rounded-full hover:bg-[#3A5069] submitt"
                >
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center copyright">
          <p className="copyright-text">
            {homeData.copyrighttext && (
              <span>{homeData.copyrighttext}</span>
            )}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 social-media">
            {sociallink.fblinks && (
              <Link className="text-gray-400 hover:text-gray-600" href={sociallink.fblinks}>
                <FaFacebookF className="w-5 h-5" />
              </Link>
            )}
            {sociallink.twitterlinks && (
              <Link className="text-gray-400 hover:text-gray-600" href={sociallink.twitterlinks}>
                <FaTwitter className="w-5 h-5" />
              </Link>
            )}
            {sociallink.instralinks && (
              <Link className="text-gray-400 hover:text-gray-600" href={sociallink.instralinks}>
                <FaInstagram className="w-5 h-5" />
              </Link>
            )}
            {sociallink.linkedinlink && (
              <Link className="text-gray-400 hover:text-gray-600" href={sociallink.linkedinlink}>
                <FaLinkedinIn className="w-5 h-5" />
              </Link>
            )}
            {sociallink.youtubelink && (
              <Link className="text-gray-400 hover:text-gray-600" href={sociallink.youtubelink}>
                <FaYoutube className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
