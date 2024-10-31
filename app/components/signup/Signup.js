"use client";
import { Suspense } from 'react';
import React, { useState ,useEffect} from "react";
import { useSearchParams } from "next/navigation";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postCustomer } from "@/lib/wooCommerce";
import Spinner from "../micro/spinner/Spinner";
import { useRouter } from "next/navigation";
import "../../globals.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

// Define options outside of the component

const options1 = [
  { value: "MRCGP AKT", label: "MRCGP AKT" },
  { value: "MRCGP SCA", label: "MRCGP SCA" },
  { value: "MSRA", label: "MSRA" },
  { value: "PLAB 2", label: "PLAB 2" },
  { value: "PLAB 1", label: "PLAB 1" },
  { value: "Medical School Exams", label: "Medical School Exams" },
  {
    value: "Foundation Year 1 Entry / FY1",
    label: "Foundation Year 1 Entry / FY1",
  },
  {
    value: "Foundation Year 2 Entry / FY2",
    label: "Foundation Year 2 Entry / FY2",
  },
  { value: "MRCP Part 1", label: "MRCP Part 1" },
  { value: "MRCP Part 2", label: "MRCP Part 2" },
  { value: "MRCP Paces", label: "MRCP Paces" },
  { value: "MRCS Part A", label: "MRCS Part A" },
  { value: "MRCS Part B", label: "MRCS Part B" },
  { value: "DRCOG", label: "DRCOG" },
  { value: "UCAT", label: "UCAT" },
  { value: "USMLE", label: "USMLE" },
  { value: "AMC", label: "AMC" },
  { value: "FRACGP", label: "FRACGP" },
  { value: "NEET", label: "NEET" },
  { value: "PA Exam", label: "PA Exam" },
  { value: "ANP Exam", label: "ANP Exam" },
  { value: "Pharmacy Exam", label: "Pharmacy Exam" },
  { value: "Other Medical Exam", label: "Other Medical Exam" },
];

const options2 = [
  { value: "exam_date", label: "Exact date" },
  { value: "month_year", label: "Month/Year" },
];

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <input
    className="datepicker-input mt-1 block rounded-full border-2 shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4 w-full"
    value={value}
    onClick={onClick}
    ref={ref}
    readOnly
  />
));
CustomInput.displayName = "CustomInput"; // Helps with debugging and React DevTools

function RegisterForm({ from }) {
  // const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  // Extract email from query params
  // useEffect(() => {
  //   const emailFromQuery = searchParams.get("email");
  //   if (emailFromQuery) {
  //     setEmail(emailFromQuery);
  //     setFormValues((prevValues) => ({
  //       ...prevValues,
  //       email: emailFromQuery,
  //     }));
  //   }
  // }, [searchParams]);

  const router = useRouter();
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "", // Email field will now be prefilled
    password: "",
    exam: null,
    examDateType: options2[0], // Default to "Exact date"
    pickeddate: new Date(),
    tnc: false,
    privacy: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPass, setIsPass] = useState(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));

    if (name === "tnc" || name === "privacy") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: newValue ? undefined : prevErrors[name],
      }));
    }

    if (name === "password") {
      if (!validatePassword(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            'The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, symbols like ! " ? $ % ^ & and numbers) Example "StrongPass!2024".',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: undefined,
        }));
      }
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{12,}$/;
    return re.test(password);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formValues.firstname) {
      valid = false;
      newErrors.firstname = "First Name is required.";
    }

    if (!formValues.lastname) {
      valid = false;
      newErrors.lastname = "Last Name is required.";
    }

    if (!formValues.email) {
      valid = false;
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formValues.email)) {
      valid = false;
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.password) {
      valid = false;
      newErrors.password = "Password is required.";
    } else if (!validatePassword(formValues.password)) {
      valid = false;
      newErrors.password =
        'The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ & ).';
    }

    if (!formValues.tnc) {
      valid = false;
      newErrors.tnc = "You must accept the terms and conditions.";
    }

    if (!formValues.privacy) {
      valid = false;
      newErrors.privacy = "You must accept the privacy policy.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const fd = new FormData();
      fd.append("email", formValues.email);
      fd.append("first_name", formValues.firstname);
      fd.append("last_name", formValues.lastname);
      fd.append("password", formValues.password);
      fd.append("which_exam", formValues.exam?.value || "");

      // Format date based on selection
      if (formValues.examDateType?.value === "exam_date") {
        fd.append("calendar", formValues.pickeddate.toISOString());
      } else {
        // Format date for month/year
        const monthYear = `${formValues.pickeddate.getFullYear()}-${
          formValues.pickeddate.getMonth() + 1
        }`;
        fd.append("mcalendar", monthYear);
      }

      fd.append("privacy_policy_reg", 1);
      fd.append("terms_and_condition_reg", 1);

      createCustomer(fd);
    }
  };

  const createCustomer = async (data) => {
    setLoading(true);

    try {
      const res = await postCustomer(data);
      setLoading(false);
      if (res?.status === 201) {
        toast("You have registered successfully!", {
          type: "success",
          position: "top-center",
        });
        router.push("/login");
      } else {
        if (res === "registration-error-email-exists") {
          setErrors({ general: "This account is already registered!" });
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const handleExamDateTypeChange = (option) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      examDateType: option,
    }));
  };

  return (
    <Suspense fallback={<div>Loading signup page...</div>}>
    <div className="min-h-screen grid items-center mt-5 mb-[70px] mx-3">
      <div>
        <div className="text-center">
          <h2 className="text-[40px] font-bold mb-8">Register</h2>
          {errors.general && (
            <p className="text-red-500 mb-4 text-sm">{errors.general}</p>
          )}
        </div>
        <div className="max-w-[675px] mx-auto mt-2 p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="firstname"
                    className="block text-base font-medium text-gray-700"
                  >
                    First Name*
                  </label>
                  <input
                    placeholder="First Name"
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formValues.firstname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-full border-2 shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                      {errors.firstname}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label
                    htmlFor="lastname"
                    className="block text-base font-medium text-gray-700"
                  >
                    Last Name*
                  </label>
                  <input
                    placeholder="Last Name"
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formValues.lastname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-full border-2 shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                      {errors.lastname}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                placeholder="Enter Your Email"
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-full border-2 shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700"
              >
                Password*
              </label>
              <div className="relative">
                <input
                  placeholder="Enter Your Password"
                  type={isPass ? "password" : "text"}
                  id="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-full border-2 shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4"
                />
                <span
                  onClick={() => setIsPass(!isPass)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {isPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="exam"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Which Exam are you preparing for?
              </label>
              <Select
                placeholder="Select Exam"
                className="custom-select"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,

                    borderWidth: "2px",

                    borderColor: state.isFocused ? "#079561" : "",

                    boxShadow: state.isFocused ? "0 0 0 1px #079561" : "",

                    fontSize: "14px",

                    borderRadius: "999px",

                    padding: "8px",
                  }),

                  option: (baseStyles, state) => ({
                    ...baseStyles,

                    fontSize: "14px",

                    backgroundColor: state.isSelected ? "#eee" : "#fafafa",

                    color: state.isSelected ? "#777" : "#000",
                  }),
                }}
                options={options1}
                value={formValues.exam}
                onChange={(option) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    exam: option,
                  }))
                }
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="examDateType"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                When is your exam?
              </label>
              <Select
                placeholder="Select Date Type"
                className="custom-select"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,

                    borderWidth: "2px",

                    borderColor: state.isFocused ? "#079561" : "",

                    boxShadow: state.isFocused ? "0 0 0 1px #079561" : "",

                    fontSize: "14px",

                    borderRadius: "999px",

                    padding: "8px",
                  }),

                  option: (baseStyles, state) => ({
                    ...baseStyles,

                    fontSize: "14px",

                    backgroundColor: state.isSelected ? "#eee" : "#fafafa",

                    color: state.isSelected ? "#777" : "#000",
                  }),
                }}
                options={options2}
                value={formValues.examDateType}
                onChange={handleExamDateTypeChange}
              />
            </div>

            {formValues.examDateType?.value && (
              <div className="mb-4 signupDate-picker">
                <label
                  htmlFor="pickeddate"
                  className="block text-base font-medium text-gray-700"
                >
                  Pick a Date
                </label>
                <DatePicker
                  className="mt-1 block  rounded-full border-2 shadow-sm focus:border focus:border-[#079561] focus:ring focus:ring-[#079561] focus:ring-opacity-500 focus:outline-none text-sm px-4 py-4 w-full"
                  selected={formValues.pickeddate}
                  onChange={(date) =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      pickeddate: date,
                    }))
                  }
                  dateFormat={
                    formValues.examDateType.value === "month_year"
                      ? "yyyy-MM"
                      : "MMMM d, yyyy"
                  }
                  showMonthYearPicker={
                    formValues.examDateType.value === "month_year"
                  }
                  customInput={<CustomInput />}
                  onKeyDown={(e) => e.preventDefault()} // Prevent manual input via keyboard
                  onPaste={(e) => e.preventDefault()} // Prevent pasting into the input
                />
              </div>
            )}

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="tnc"
                name="tnc"
                checked={formValues.tnc}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                htmlFor="tnc"
                className="text-base font-medium text-gray-700"
              >
                I agree to the{" "}
                <Link href="/terms-and-conditions" className="text-blue-500 hover:underline">
                  Terms and Conditions
                </Link>
              </label>
              {errors.tnc && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.tnc}</p>
              )}
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={formValues.privacy}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                htmlFor="privacy"
                className="text-base font-medium text-gray-700"
              >
                I agree to the{" "}
                <Link href="/privacy-policy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </Link>
              </label>
              {errors.privacy && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {errors.privacy}
                </p>
              )}
            </div>
            <p className="instruction-signup text-base mb-[20px]">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <Link href="/privacy-policy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
            </p>

            <button
              type="submit"
              className="w-full bg-[#079561] text-white py-2 px-4  flex items-center justify-center loginButton"
            >
              {loading ? (
                <div className="flex items-center">
                  <Spinner />
                  <span className="ml-2">Registering...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    </Suspense>
  );
}

export default RegisterForm;
