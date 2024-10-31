"use client";
import React, { useState, useEffect, useCallback, useRef, useContext } from "react";

import { login } from "../../utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "../micro/spinner/Spinner";
import withAuth from "@/app/utils/withAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { CartContext } from "../../layout"
import AuthButton from "../Authbutton/authbutton";
import { getCart } from "@/lib/woredpressApi";

const LoginForm = ({ from }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPass, setIsPass] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAuthlg, setIsAuthlg] = useState(false);
  const [loginAuth, setloginAuth] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const { cartCounts, setCartCounts } = useContext(CartContext);
  const validatePassword = (password) => {
    return password.length >= 1; // Minimum 12 characters
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
      if (!validateEmail(value)) {
        setUsernameError("Please enter a valid email");
      } else {
        setUsernameError("");
      }
    } else if (name === "password") {
      setPassword(value);

      if (validatePassword(value)) {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(username)) {
      setError("Please fill in the required fields");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password is required");
      return;
    }
    setError("");
    setLoading(true);
    const { success, token, error } = await login(username, password);
    if (success) {
      setloginAuth(true);
      toast("Successfully logged in!", {
        type: "success",
        position: "top-center",
      });

      if (from === "cart") {
        router.push("/cart");
        location.reload();
      } else {
        const res = await getCart();
        setCartCounts(res?.item_count || 0);
        // localStorage.setItem('cartCount', res.item_count || 0);
        router.push("/"); 
      
        window.open(
          "https://aroramedicallmsfe.ebizonstaging.com/course/" + token,
          "_blank", 
          "noopener,noreferrer"
        );
      }
    } else {
      setError(error || "An unknown error occurred");
      setloginAuth(false);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[675px] grid items-center">
      <div>
        <div className="text-center">
          <h2 className="text-[40px] font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        </div>
        <div className="max-w-[625px] mx-auto mt-2 p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                placeholder="Enter Your Email"
                type="email"
                id="username"
                name="username"
                value={username}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-full border shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
              />
              {usernameError && (
                <p className="text-red-500 text-sm mt-2 ml-1">
                  {usernameError}
                </p>
              )}
            </div>

            <div className="mb-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                placeholder="Enter Your Password"
                type={isPass ? "password" : "text"}
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-full border shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
              />
              {isPass ? (
                <FaEye
                  onClick={() => setIsPass(false)}
                  className="absolute right-[16px] top-[42px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setIsPass(true)}
                  className="absolute right-[16px] top-[42px] cursor-pointer"
                />
              )}
              {passwordError && (
                <p className="text-red-500 text-sm mt-2 ml-1">
                  {passwordError}
                </p>
              )}
            </div>

            <Link
              className="text-[13px] mb-6 w-fit ml-auto block"
              href="/forgotpass"
            >
              Lost your password?
            </Link>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-4 px-4 loginButton"
              disabled={loading || usernameError || passwordError}
            >
              {loading ? (
                <>
                  <Spinner /> Processing...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <Link className="text-[13px] mt-2 text-center block" href={`/signup`}>
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
