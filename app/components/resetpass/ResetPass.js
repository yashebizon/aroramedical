"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/woredpressApi";
import Spinner from "../micro/spinner/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function ResetPassForm() {
  const router = useRouter();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [passError1, setPassError1] = useState("");
  const [passError2, setPassError2] = useState("");
  const [loading, setLoading] = useState("");
  const [isPass1, setIsPass1] = useState(true);
  const [isPass2, setIsPass2] = useState(true);

  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password1 || !password2) {
      setError("Password field is required");
      return;
    }

    if (password1 && password2) {
      if (password1 !== password2) {
        setError("Password does not match");
        return;
      }
    }
    setLoading(true);
    const key = searchParams.get("key");
    const login = searchParams.get("login");
    const res = await resetPassword(key, login, password2);
    if (
      res?.data?.message === "Password has been reset successfully." &&
      res?.status
    ) {
      toast("Password has been reset successfully!", {
        type: "success",
        position: "top-center",
      });
      router.push("/login");
      setLoading(false);
    } else {
      setLoading(false);
    }

    setError("");
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{12,}$/;
    return re.test(password);
  };

  return (
    <div className="min-h-[675px] grid items-center">
      <div>
        <div className="text-center">
          <h2 className="text-[40px] font-bold mb-4">Create New Password</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </div>
        <div className="max-w-[650px] mx-auto mt-2 p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                placeholder="New Password"
                type={isPass1 ? "password" : "text"}
                id="password1"
                name="password1"
                value={password1}
                onChange={(e) => {
                  setError("");
                  setPassword1(e.target.value);
                  if (!validatePassword(e.target.value)) {
                    setPassError1(
                      'The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, symbols like ! " ? $ % ^ & and numbers) Example "StrongPass!2024".'
                    );
                  } else {
                    setPassError1("");
                  }
                }}
                className="mt-1 block w-full rounded-full  border shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
              />
              {isPass1 ? (
                <FaEye
                  onClick={() => setIsPass1(false)}
                  className="absolute right-[16px] top-[42px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setIsPass1(true)}
                  className="absolute right-[16px] top-[42px] cursor-pointer"
                />
              )}
            </div>
            {passError1 && (
              <p className="text-red-500 text-sm mb-4">{passError1}</p>
            )}

            <div className=" mt-5 mb-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                placeholder="Confirm Password"
                type={isPass2 ? "password" : "text"}
                id="password2"
                name="password2"
                value={password2}
                onChange={(e) => {
                  setError("");
                  setPassword2(e.target.value);
                  // if (!validatePassword(e.target.value)) {
                  //   setPassError2(
                  //     'The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, symbols like ! " ? $ % ^ & and numbers) Example "StrongPass!2024".'
                  //   );
                  // } else {
                  //   setPassError2("");
                  // }
                }}
                className="mt-1 block w-full rounded-full  border shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
              />
              {isPass2 ? (
                <FaEye
                  onClick={() => setIsPass2(false)}
                  className="absolute right-[16px] top-[42px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setIsPass2(true)}
                  className="absolute right-[16px] top-[42px] cursor-pointer"
                />
              )}
            </div>
            {passError2 && (
              <p className="text-red-500 text-sm mb-4">{passError2}</p>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center py-4 px-4 loginButton"
              >
                {loading ? (
                  <>
                    <Spinner /> Processing...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassForm;
