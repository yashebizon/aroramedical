"use client";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CartContext } from "@/app/layout";
import { toast } from "react-toastify";

const AuthButton = ({ toggleMenu }) => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const isAuthenticated = !!token;
      setIsAuth(isAuthenticated);
    };

    checkAuth();

  }, [pathname]); 

  // Handle user logout
  const handleLogout = () => {
    console.log("Logout triggered");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("courses");
    localStorage.removeItem("Nonce");
    localStorage.removeItem("Cart-Token");
    localStorage.removeItem("cartCount")
    setCart([]);
    toast("Logout Successfully", {
      position: "top-center",
      type: "success",
      style: {
        width: "320px",
      },
    });
    setIsAuth(false); 
    router.push("/login"); 
  };

  return (
    <>
      {!isAuth ? (
        <div className="h-full" style={{ marginLeft: "0px" }}>
          <span className="profile-img mobile-show">
            <Link href="/login">
              <img src="/images/profile.png" alt="Profile image" />
            </Link>
          </span>
          <Link className="LoginBtn-link" href="/login">
            <button className="bg-[#079561] max-w-[112px] text-white rounded-full login-btn"  onClick={() => {
                toggleMenu();
              }}>
              Log In <span className="mobile-showsignup">/Sign up</span>
            </button>
          </Link>
        </div>
      ) : (
        <div className="m-0" style={{ marginLeft: "0px" }}>
          <Link className="LoginBtn-link lg:hidden" href="/cart">
            <button
              onClick={() => {
                toggleMenu();
              }}
              className="bg-[#079561] max-w-[112px] text-white rounded-full login-btn"
            >
              Cart
            </button>
          </Link>
          <div className="LoginBtn-link">
            <button
              onClick={() => {
                console.log("logout clicked")
                toggleMenu();
                handleLogout(); // invoke handleLogout properly
              }}
              className="bg-[#079561] max-w-[112px] text-white rounded-full login-btn"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;
