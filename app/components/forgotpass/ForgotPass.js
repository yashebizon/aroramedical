"use client";

import { forgotPass } from "@/lib/woredpressApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Spinner from "../micro/spinner/Spinner";

function ForgotPassForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter the email");
      return;
    }
    setLoading(true);
    const res = await forgotPass(email);
    if (res?.data) {
      setMsg("Please check your email to reset password");
      setLoading(false);
    } else {
      setLoading(false);
      setError("No user found with that email address");
    }

    setEmail("");
  };
  return (
    <div className="min-h-[675px] grid items-center">
      <div>
        <div className="text-center">
          <h2 className="text-[40px] font-bold mb-4">Reset Password</h2>
        </div>
        {msg && (
          <p className="text-[#079561] text-center text-sm ml-1">{msg}</p>
        )}
        <div className="max-w-[625px] mx-auto mt-2 p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                placeholder="Enter Your Email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-full  border shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
              />
            </div>
            {error && <p className="text-red-500 text-sm ml-1">{error}</p>}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-4 px-4 loginButton"
              >
                {loading ? (
                  <>
                    <Spinner /> Processing...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassForm;
