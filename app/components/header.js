/* eslint-disable @next/next/no-img-element */
"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { getCart, getPrimaryMenu, getSiteLogo } from "../../lib/woredpressApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthButton from "../components/Authbutton/authbutton";

import { getHomePage } from "../../lib/woredpressApi";
import RatingSection from "./home/Rating";
import { CartContext } from "../layout";
import SearchButton from "../header/SearchButton";

const Header = (props) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRefs = useRef([]); // Array to hold refs for dropdowns
  const submenuRefs = useRef([]); // Array to hold refs for submenus
  const [logoUrl, setLogoUrl] = useState(null);
  const [homeDatas, sethomeDatas] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");


  const { cart, setCart,cartCounts, setCartCounts } = useContext(CartContext);
  // const [cartCount, setCartCount] = useState(cart?.item_count || 0);

  const fetchCartItems=async()=> {
    const res = await getCart();
    console.log(res,"responsecount")
    if (res?.items?.length) {

      setCartCounts(res?.item_count)
    } else {
      setCartCounts(0)
    }
  }

  useEffect(() => {
    console.log('ffffff', cartCounts)
    // setCartCounts(localStorage.getItem('cartCount'))
  }, [cartCounts])


  // useEffect(() => {
  //   setCartCounts(localStorage.getItem('cartCount'));
  //   if(cartCounts==0){
  //     setCartCounts(cartCounts)
  //   }
  //   // fetchCartItems()
  //   // const savedCart = JSON.parse(localStorage.getItem("courses")) || [];
  //   // console.log(savedCart,"cartt")
  //   // setCart(savedCart);
  // }, []);

  useEffect(() => {
    const count = cart?.reduce((total, item) => total + item.quantity, 0);
    setCartCounts(count || 0);
  }, [cart]);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     const tk = localStorage.getItem("token");
  //     setToken(token);

  //     if (!tk) {
  //       const courses = JSON.parse(localStorage.getItem("courses"));
  //       console.log(courses, " :courses");
  //       if (courses?.length == 0) {
  //         setCart([]);
  //         return;
  //       }
  //       setCart(courses);
  //       return;
  //     }
  //   }
  // }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const menudata = await getPrimaryMenu();

        const datahome = await getHomePage();
        sethomeDatas(datahome);

        setMenuItems(menudata.items);
        const logoData = await getSiteLogo();
        setLogoUrl(logoData);

        const token = localStorage.getItem("token");
        await fetchCartItems()
        setIsAuth(!!token);
        
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside all dropdowns and submenus
      if (
        !dropdownRefs.current.some(
          (ref) => ref && ref.contains(event.target)
        ) &&
        !submenuRefs.current.some((ref) => ref && ref.contains(event.target))
      ) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
    setOpenSubDropdown(null); // Close any open subdropdown
  };

  const toggleSubDropdown = (index) => {
    setOpenSubDropdown(openSubDropdown === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (url) => {
    return router.pathname === url;
  };

  return (
    <>
      <header className="Z-[99999]">
        <div className="bg-[#486284] text-white text-center py-2 tophead Z-[99999]">
          <a href="#" className="text-sm hover:underline">
            Register for Today&#39;s Free UKMLA PLAB 2 Booster Webinar
          </a>
        </div>
        <div
          className="container mx-auto flex justify-between items-center py-4 custom-nav-row relative Z-[99999]"
          style={{ height: "72px" }}
        >
          <div className="flex items-center">
            <div className="logoImg bg-[#ffffff] flex items-center justify-center">
              <Link href="/">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="logo"
                    style={{ height: "67px", width: "186px" }}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </Link>
            </div>
          </div>
          <nav
            className={`flex items-center  mid-nav menu gap-[0px] ${menuOpen ? "active" : ""
              }`}
            id="menu"
          >
            {menuOpen && (
              <div onClick={toggleMenu} className="nav-menuitems-shadow"></div>
            )}
            {menuOpen && (
              <div
                onClick={toggleMenu}
                className="nav-menuitems-shadowinner"
              ></div>
            )}
            <div className="nav-menuitems-block flex items-center space-x-4 mid-nav menu ">
              {menuItems?.map((item, index) => (
                <div
                  key={index}
                  className={`relative group ${isActive(item.url) ? "activeMenu-item" : ""
                    }`}
                  ref={(el) => (dropdownRefs.current[index] = el)}
                >
                  <Link
                    href={item.url}
                    className="text-[#1A1E1C]"
                    onClick={() => {
                      toggleDropdown(index);
                      if (!item.items)
                        setMenuOpen(false);
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item.title }} />
                    {item.items && (
                      <svg
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d={
                            openDropdown === index
                              ? "M0.0615234 6.80105C0.079941 6.73223 0.10245 6.66464 0.128968 6.5987C0.213823 6.38772 0.337859 6.19834 0.4932 6.0426V6.0426C0.337859 6.19834 0.213823 6.38772 0.128968 6.59871C0.102451 6.66464 0.0799408 6.73224 0.0615234 6.80105ZM1.67582 9L1.67156 8.00001C1.51599 8.00068 1.34828 7.93737 1.20687 7.79329L1.20124 7.78755C1.14401 7.73018 1.0932 7.65517 1.05675 7.56453C1.02026 7.4738 1.00029 7.37262 1.00029 7.26819C1.00029 7.16375 1.02026 7.06257 1.05675 6.97184C1.0932 6.8812 1.14399 6.80617 1.20122 6.7488L1.20657 6.74343L7.53051 0.208063C7.67329 0.0641806 7.84228 0.000183105 7.9997 0.000183105C8.15715 0.000183105 8.32618 0.0642136 8.46898 0.208137L14.7992 6.74769C14.8565 6.80534 14.9074 6.88054 14.9439 6.97137C14.9803 7.06228 15.0003 7.16362 15.0003 7.26819C15.0003 7.37276 14.9803 7.47409 14.9439 7.565C14.9074 7.65583 14.8566 7.7311 14.7993 7.78874L14.7985 7.78952C14.654 7.9352 14.4828 8.00018 14.323 8.00018C14.1645 8.00018 13.9947 7.93624 13.8509 7.793L8.00506 1.75389L2.15014 7.79868C2.00809 7.93974 1.84069 8.00149 1.68511 8.00005L1.67582 9Z"
                              : "M0.0615234 2.19895C0.079941 2.26777 0.10245 2.33536 0.128968 2.4013C0.213823 2.61228 0.337859 2.80166 0.4932 2.9574V2.9574C0.337859 2.80166 0.213823 2.61228 0.128968 2.40129C0.102451 2.33536 0.0799408 2.26776 0.0615234 2.19895ZM1.67582 0L1.67156 0.999986C1.51599 0.999324 1.34828 1.06263 1.20687 1.20671L1.20124 1.21245C1.14401 1.26982 1.0932 1.34483 1.05675 1.43547C1.02026 1.5262 1.00029 1.62738 1.00029 1.73181C1.00029 1.83625 1.02026 1.93743 1.05675 2.02816C1.0932 2.1188 1.14399 2.19383 1.20122 2.2512L1.20657 2.25657L7.53051 8.79194C7.67329 8.93582 7.84228 8.99982 7.9997 8.99982C8.15715 8.99982 8.32618 8.93579 8.46898 8.79186L14.7992 2.25231C14.8565 2.19466 14.9074 2.11946 14.9439 2.02863C14.9803 1.93772 15.0003 1.83638 15.0003 1.73181C15.0003 1.62724 14.9803 1.52591 14.9439 1.435C14.9074 1.34417 14.8566 1.2689 14.7993 1.21126L14.7985 1.21048C14.654 1.0648 14.4828 0.999817 14.323 0.999817C14.1645 0.999817 13.9947 1.06376 13.8509 1.207L8.00506 7.24611L2.15014 1.20132C2.00809 1.06026 1.84069 0.998506 1.68511 0.999952L1.67582 0Z"
                          }
                          fill="#1A1E1C"
                        />
                      </svg>
                    )}
                  </Link>
                  {openDropdown === index && item.items && (
                    <div className="absolute bg-white  z-10 header_sub_menu course-sub-menu">
                      {item?.items?.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className={`relative group ${isActive(subItem.url) ? "activeMenu-item" : ""
                            }`}
                          ref={(el) => (submenuRefs.current[subIndex] = el)}
                          onClick={() => setMenuOpen(false)}
                        >
                          <Link
                            href={subItem.url}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                            onClick={() => {
                              toggleDropdown(null);
                              toggleSubDropdown(subIndex);
                            }}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: subItem.title,
                              }}
                            />
                            {subItem.items && (
                              <FontAwesomeIcon
                                icon={
                                  openSubDropdown === subIndex
                                    ? faChevronUp
                                    : faChevronDown
                                }
                                className="ml-2"
                              />
                            )}
                          </Link>
                          {openSubDropdown === subIndex && subItem.items && (
                            <div className="absolute shadow-md py-2 rounded-lg z-10 left-full top-0 course-sub-menu">
                              {subItem.items.map((nestedItem, nestedIndex) => (
                                <Link
                                  key={nestedIndex}
                                  href={nestedItem.url}
                                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"

                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: nestedItem.title,
                                    }}
                                  />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="block md:hidden" style={{ marginLeft: "0px" }}>
                <AuthButton toggleMenu={toggleMenu} />
              </div>

              {/* <div className="relative group mobile-show">
                <a className="text-[#1A1E1C]" href="/">
                  <span>Cart</span>
                </a>
              </div>
              <div className="relative group mobile-show home-links">
                <a className="text-[#1A1E1C]" href="/">
                  <span>Home</span>
                </a>
              </div>
              <AuthButton />  */}
              {/* <div className="relative group mobile-show">
                <a className="text-[#1A1E1C]" href="/">
                  <span>Cart</span>
                </a>
              </div> */}
              <div className="mob-logoImg bg-[#ffffff] m-[0px] flex items-center justify-center w-[186px]">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="logo"
                    style={{ height: "auto", width: "186px" }}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-4 header-rightcon">
            <div className="">
              <div className="hidden md:block">
                <AuthButton toggleMenu={toggleMenu} />
              </div>

            </div>
            <button
              onClick={() => {
                router.push("/cart");
              }}
              className="text-[#2c2c2c] relative"
            >
              <img
                src="/images/carticons.png"
                className="desktop-show-img"
                alt="Cart"
              />
              <img
                src="/images/mobile-cart.png"
                className="mobile-show"
                alt="Cart"
              />
              <span className="cart-count">{cartCounts}</span>
            </button>
            <SearchButton />



            <div id="hamburger" className="hamburger" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>
      {homeDatas && (
        <RatingSection ratingData={homeDatas.acf_groups?.HeaderStrip} />
      )}
    </>
  );
};

export default Header;