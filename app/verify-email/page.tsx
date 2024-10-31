"use client";

import { RegisterEmail, VerifyOTP } from "@/lib/woredpressApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ErrorResponse {
    response?: {
      data?: {
        message?: string;
      };
    };
  }

function VerifyEmail() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false); // State to track OTP sent

  // Handle input change for email
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handle input change for OTP
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  // Handle email submission (send OTP)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter the email");
      return;
    }
    setLoading(true);
    setError(""); // Clear previous errors
    setMsg(""); // Clear previous success messages

    // try {
    //   const res = await RegisterEmail(email);

    //   if (res?.status === 200 && res?.message) {
    //     setMsg("An OTP has been sent to your email. Please enter it to verify your email address");
    //     setIsOtpSent(true); // Show OTP input field
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //     setError(res?.error?.message || "An unexpected error occurred.");
    //   }
    // } catch (err: unknown) {
    //   const errorResponse = err as ErrorResponse;
    //   setLoading(false);
    //   setError(
    //     errorResponse?.response?.data?.message ||
    //       "An error occurred. Please try again."
    //   );
    // }
    try {
      const res = await RegisterEmail(email);
      if (res?.status === 200 && res?.message) {
        setMsg("An OTP has been sent to your email. Please enter it to verify your email address.");
        setIsOtpSent(true);
      } else {
        setError(res?.message || "An unexpected error occurred.");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); 
    }
    };

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const res = await VerifyOTP(email, otp);

      if (res?.status === 200 || res?.status === 201) {
        setMsg("OTP verified successfully.");
        setLoading(false);
        // Redirect to the signup page with pre-filled email
        router.push(`/signup?email=${email}`);
      } else {
        setLoading(false);
        setError(res?.error?.message || "Invalid OTP. Please try again.");
      }
    } catch (err: unknown) {
      const errorResponse = err as ErrorResponse;
      setLoading(false);
      setError(
        errorResponse?.response?.data?.message ||
          "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-[675px] grid items-center">
      <div>
        <div className="text-center">
          <h2 className="text-[40px] font-bold mb-4">
            {isOtpSent ? "Verify OTP" : "Verify Email"}
          </h2>
        </div>
        {msg && (
          <p className="text-[#079561] text-center text-sm ml-1">{msg}</p>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="max-w-[625px] mx-auto mt-2 p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={isOtpSent ? handleVerifyOtp : handleSubmit}>
            {!isOtpSent && (
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
                  className="mt-2 block w-full rounded-full border shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
                />
              </div>
            )}

            {isOtpSent && (
              <div className="mb-2">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  placeholder="Enter OTP"
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="mt-2 block w-full rounded-full border shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
                />
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-4 font-bold px-4 loginButton"
              >
                {loading ? <>Processing...</> : isOtpSent ? "Verify OTP" : "Verify Email"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
