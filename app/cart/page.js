"use client";
import { FaRegTimesCircle, FaRegTrashAlt } from "react-icons/fa";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState, useContext, useRef } from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import LoginForm from "../components/login/Login";
import RegisterForm from "../components/signup/Signup";
import CheckoutPage from "../components/checkout/checkout";
import CheckoutForm from "../components/cardcheckout/cardcheckout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../layout";
import paypalicon from "../../public/images/paypalicon.png";
import gpayicon from "../../public/images/gpay.png";

import {
  addToCart,
  createOrderWC,
  deleteItem,
  getCart,
  getCoupons,
  getProducts,
  sendResentLink,
  updateCart,
} from "@/lib/woredpressApi";
import Spinner from "../components/micro/spinner/Spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const [selectedOption, setSelectedOption] = useState("express"); // 'express' is default

  const billingRef = useRef(null);
  const paymentRef = useRef(null);
  const authRef = useRef(null);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientMsg, setRecipientMsg] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  let [open, setOpen] = useState(false);
  let [openReg, setOpenReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [pillA, setPillA] = useState(true);
  const [pillB, setPillB] = useState(true);
  const [pillC, setPillC] = useState(true);
  const [pillD, setPillD] = useState(true);
  const [pillE, setPillE] = useState(false);
  const [total, setTotal] = useState(0);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [isGift, setIsGift] = useState(false);
  const [isGooglepayOpen, setIsGooglePayOpen] = useState(false);
  const [isBilling, setIsBilling] = useState(false);
  const [token, setToken] = useState("");
  const [coupon, setCoupon] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [myCoupon, setMyCoupon] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [billingChecked, setBillingChecked] = useState(false);
  const [selectedFutureOptions, setSelectedFutureOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [courseDateData, setCourseDateData] = useState([]);
  const [futureCourseDateData, setFutureCourseDateData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [options, setOptions] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [futureOptions, setFutureOptions] = useState([
    // { value: "", label: "" },
  ]);
  const [parentError, setParentError] = useState(null);
  const [paymentLoad, setPaymentLoad] = useState(false);
  const [quantityLoad, setQuantityLoad] = useState(false);
  const [loadingDates, setLoadingDates] = useState(true);
  const [giftErrors, setGiftErrors] = useState({});

  const { cart, setCart, setOrderData } = useContext(CartContext);
  const router = useRouter();
  const googlePayButtonRef = useRef(null);
  // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  const stripePromise = loadStripe(
    "pk_test_51PuTVURvYYvNAU75ET4OJRVmbFcAH5wroBsVLncASvXQheLuWmn1A0L1IYa8Cv1laDhuqcNOfkMT9G75dXGwOuvn00bbd7198A"
  );

  useEffect(() => {}, [options, futureOptions, pillA]);

  useEffect(() => {
    const savedCoupon = localStorage.getItem("appliedCoupon");
    if (cart.length === 0) {
      localStorage.removeItem("appliedCoupon");
      setCoupon("");
      setMyCoupon(null);
      setDiscountedAmount(0);
      setIsApplied(false);
      setTotal(0);
    } else if (savedCoupon) {
      const { code, amount, total } = JSON.parse(savedCoupon);
      setCoupon(code);
      setMyCoupon({ amount });
      setDiscountedAmount(amount);
      setTotal(total);
      setIsApplied(true);
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let tk = localStorage?.getItem("token");
      setToken(tk);

      const courses = JSON.parse(localStorage.getItem("courses")) || [];

      if (!tk) {
        // User is logged out
        if (courses.length === 0) {
          setCart([]); // Empty cart if no courses in localStorage
        } else {
          setCart([...courses]); // Set cart with localStorage courses
        }
      } else {
        // User is logged in
        fetchCartItems().then((serverCartItems) => {
          // Ensure serverCartItems is an array
          const mergedCourses = courses.map((localCourse) => {
            const existingServerCourse = serverCartItems?.find(
              (serverCourse) => {
                return serverCourse.id == localCourse.id;
              }
            );
            if (existingServerCourse) {
              return {
                ...existingServerCourse,
                quantity: localCourse.quantity,
              };
            }
            return localCourse; // If it doesn't exist, add it as a new course
          });

          // Update the cart state with mergedCourses
          const promises = mergedCourses.map((course) =>
            addToCart(
              course?.id,
              course?.quantity,
              course?.slug,
              course?.crossSells,
              course?.month
            )
          );

          Promise.all(promises)
            .then(() => {
              localStorage.removeItem("courses"); // Clear localStorage after syncing
              fetchCartItems(); // Optionally refresh the server-side cart
            })
            .catch((error) => {
              console.error("Error adding to cart:", error);
            });
        });
      }
    }
  }, []);

  useEffect(() => {
    const totalAmount = cart?.reduce(
      (total, item) => total + item.price * 100,
      0
    );
    setAmount(totalAmount);
  }, [cart]);

  useEffect(() => {
    const isFormValid = () => {
      if (!firstName) {
        return false;
      }
      if (!lastName) {
        return false;
      }
      if (!address) {
        return false;
      }
      if (!country) {
        return false;
      }
      if (!city) {
        return false;
      }
      if (!zipCode) {
        return false;
      }
      if (!billingChecked) {
        return false;
      }

      return true;
    };
    const isBillingData = isFormValid();
    setIsValid(isBillingData);
  }, [firstName, lastName, address, city, zipCode, country, billingChecked]);

  const checkoutFormRef = useRef(null);

  useEffect(() => {
    if (myCoupon !== coupon) setIsApplied(false);
  }, [coupon]);

  const handleValidation = () => {
    const hasOptions = options?.length > 0;
    const hasFutureOptions = futureOptions?.length > 0;

    if (hasOptions && !selectedOptions[0]) {
      toast.error("Please select a course date.", {
        position: "top-center",
      });
      return false;
    }

    if (hasFutureOptions && !selectedFutureOptions[0]) {
      toast.error("Please select a future course date.", {
        position: "top-center",
      });
      return false;
    }

    setPillA(false);
    return true;
  };

  useEffect(() => {
    console.log("parent error ", parentError);
  }, [parentError]);

  const handlePayment = () => {
    // Step 1: Validate Dates
    const isDatesValidated = handleValidation();
    if (!isDatesValidated) {
      return;
    }
    if (isGift) {
      const validationErrors = validateGiftInputs(
        recipientName,
        recipientEmail,
        recipientMsg
      );

      // If there are validation errors, set the giftErrors state
      if (Object.keys(validationErrors).length > 0) {
        setGiftErrors(validationErrors);
        return;
      } else {
        setGiftErrors({});
      }
    }

    // Step 2: Set Selected Option
    setSelectedOption("card");

    // Step 3: Validate Card Details
    const status = checkValidation();
    if (!status) return;
    if (checkoutFormRef.current) {
      setPaymentLoad(true); // Start loading spinner before submission
      checkoutFormRef.current.handleSubmit();
    }
  };
  useEffect(() => {
    if (parentError) {
      toast("Please fill card details properly", {
        type: "error",
        position: "top-center",
      });
      return; // Prevent submission if there's an error
    }
  }, [parentError]);

  useEffect(() => {
    if (isValid) {
      paymentRef?.current?.scrollIntoView(true);
    }
  }, [isValid]);

  useEffect(() => {
    if (futureCourseDateData.length || courseDateData.length) {
      checkValidation();
    }
  }, [billingChecked]);

  useEffect(() => {
    fetchOptions();
  }, [courseDateData, futureCourseDateData]);

  useEffect(() => {
    const totalAmnt = cart?.reduce(
      (prev, curr) => Number(prev) + Number(curr.price),
      0
    );

    if (discountedAmount) {
      setTotal(totalAmnt - totalAmnt * (discountedAmount / 100));
    } else {
      setTotal(totalAmnt);
    }
  }, [cart]);

  useEffect(() => {
    const totalAmount = cart?.reduce(
      (total, item) => (total + item.price) * 100,
      0
    );
    setAmount(totalAmount);
  }, [cart]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    setIsGooglePayOpen(!isGooglepayOpen);
  };

  const handleClickOutside = (event) => {
    if (
      googlePayButtonRef.current &&
      !googlePayButtonRef.current.contains(event.target)
    ) {
      setIsGooglePayOpen(false);
    }
  };

  function fetchOptions() {
    const res = courseDateData?.map((date) => ({
      value: date.id,
      label: date.name,
    }));
    setOptions(res);

    const res1 = futureCourseDateData?.map((date) => ({
      value: date.id,
      label: date.name,
    }));
    setFutureOptions(res1);
  }

  async function handleQuantity(type, id) {
    if (!token) {
      const courses = JSON.parse(localStorage.getItem("courses")) || [];
      const index = courses.findIndex((course) => course.id == id);

      if (index === -1) return;

      const unitPrice = Number(courses[index].price) / courses[index].quantity;

      if (type === "increase") {
        courses[index].quantity += 1;
        courses[index].price = unitPrice * courses[index].quantity;
        localStorage.setItem("courses", JSON.stringify(courses));
        setCart([...courses]); // Update cart state without reload
      } else if (type === "decrease" && courses[index].quantity > 1) {
        courses[index].quantity -= 1;
        courses[index].price = unitPrice * courses[index].quantity;
        localStorage.setItem("courses", JSON.stringify(courses));
        setCart([...courses]);
      }
      return;
    }

    const courses = [...cart];
    const index = courses.findIndex((course) => course.id == id);

    if (index !== -1) {
      const course = courses[index];
      const unitPrice = Number(course.price) / course.quantity;

      // Only show loader if quantity will remain above 1 after operation
      if (type === "increase" || (type === "decrease" && course.quantity > 1)) {
        setQuantityLoad(true); // Show loader before updating quantity
      }

      if (type === "increase") {
        course.quantity += 1;
        course.price = unitPrice * course.quantity;

        try {
          await handleUpdateCart(course.item_key, course.quantity); // Call backend
        } catch (error) {
          console.error("Failed to update quantity", error);
        } finally {
          setQuantityLoad(false); // Hide loader after backend call
        }
      } else if (type === "decrease" && course.quantity > 1) {
        course.quantity -= 1;
        course.price = unitPrice * course.quantity;

        try {
          await handleUpdateCart(course.item_key, course.quantity); // Call backend
        } catch (error) {
          console.error("Failed to update quantity", error);
        } finally {
          setQuantityLoad(false); // Hide loader after backend call
        }
      }
    }
  }

  // Delete course from cart
  async function deleteCourse(id) {
    if (!token) {
      const courses = JSON.parse(localStorage.getItem("courses")) || [];
      const index = courses.findIndex((course) => course.id == id);

      if (index !== -1) {
        courses.splice(index, 1);
        localStorage.setItem("courses", JSON.stringify(courses));
        setCart([...courses]); // Update cart state without reload
      }
      return;
    }

    const courses = [...cart];
    const index = courses.findIndex((course) => course.id == id);
    if (index !== -1) {
      setUpdating(true);
      const course = courses[index];
      const res = await deleteItem(course?.item_key);
      if (res) {
        fetchCartItems();
        toast(res, { type: "success", position: "top-center" });
      }
      setUpdating(true);
    }
  }

  // Update cart in the backend and local state
  async function handleUpdateCart(key, quantity) {
    setUpdating(true);
    const res = await updateCart(key, quantity);
    if (res?.items?.length) {
      const items = formatCourseData(res);
      setCart(items); // Update local cart state
      setUpdating(false);
    } else {
      setCart([]); // Empty cart if no items
      setUpdating(false);
    }
  }

  async function fetchSubProducts(id) {
    const res = await getProducts(id);

    const courseDateIds = res?.meta_data?.filter(
      (data) => data.key === "course_date"
    );
    const futureDateIds = res?.meta_data?.filter(
      (data) => data.key === "future_course_date"
    );

    let dates = [],
      futureDates = [];

    if (courseDateIds[0]?.value?.length) {
      dates = await Promise.all(
        courseDateIds[0]?.value?.map(async (id) => {
          const res = await getProducts(id);
          return {
            name: res?.name,
            id: res?.id,
            package: res?.name,
            quantity: 1,
            price: 0,
            imgUrl: "https://via.placeholder.com/150/808080/808080",
            month,
          };
        })
      );
    }

    if (futureDateIds[0]?.value?.length) {
      futureDates = await Promise.all(
        futureDateIds[0]?.value?.map(async (id) => {
          const res = await getProducts(id);
          return {
            name: res?.name,
            id: res?.id,
            package: res?.name,
            quantity: 1,
            price: 0,
            imgUrl: "https://via.placeholder.com/150/808080/808080",
            month,
          };
        })
      );
    }

    // Return the fetched dates
    return { dates, futureDates };
  }

  async function fetchCartItems() {
    setLoading(true);
    setLoadingDates(true); // Start loading

    const res = await getCart();

    let allDates = [];
    let allFutureDates = [];
    let allItems = [];

    if (res?.items?.length) {
      allItems = await Promise.all(
        res.items.map(async (item) => {
          const { dates, futureDates } = await fetchSubProducts(item.id);

          // Accumulate dates and futureDates from all items
          allDates = [...allDates, ...dates];
          allFutureDates = [...allFutureDates, ...futureDates];

          return {
            item_key: item.item_key,
            id: item.id,
            package: item.name,
            quantity: item.quantity.value,
            price:
              (parseInt(item.price) / 100).toFixed(2) * item.quantity.value,
            imgUrl:
              item.featured_image ||
              "https://via.placeholder.com/150/808080/808080",
            slug: item.cart_item_data.course_route,
            crossSells: item.cart_item_data.cross_sells || [],
            month: item.cart_item_data.month,
          };
        })
      );

      // Set the state for cart and dates
      setCart(allItems);
      setCourseDateData(allDates);
      setFutureCourseDateData(allFutureDates);
    } else if (res?.items?.length === 0) {
      const localCourses = JSON.parse(localStorage.getItem("courses")) || [];
      if (localCourses.length === 0) {
        setCart([]); // Empty cart
      }
    }

    setLoading(false);
    setLoadingDates(false); // Stop loading after all dates are fetched

    return allItems; // Ensure we return the fetched cart items
  }

  const onCardApprove = async (data) => {
    const value = checkValidation();
    if (value === false) {
      return;
    }

    const user_id = localStorage.getItem("user_id");
    let newCart = cart?.reduce((acc, item) => {
      // Push the main item
      acc.push({ id: item.id, quantity: item.quantity, price: item.price });

      // Push each crossSell item
      if (item?.crossSells) {
        item?.crossSells?.forEach((crossSell) => {
          acc.push({
            id: crossSell?.id,
            quantity: crossSell?.quantity || 1,
            price: 0,
          });
        });
      }

      return acc;
    }, []);

    const lineItems = [...newCart, ...courseDateData, ...futureCourseDateData];
    if (data.status == "succeeded") {
      setDisableButton(true);
      toast("Payment completed successfully!", {
        type: "success",
        position: "top-center",
      });

      let data = {};
      if (isGift) {
        const user_id = await handleSendResetLink();
        data = {
          payment_method: "card",
          payment_method_title: "card payments",
          set_paid: true,
          customer_id: user_id,
          billing: {
            first_name: firstName || "",
            last_name: lastName,
            address_1: address || "",
            address_2: "",
            city: city,
            state: "",
            postcode: zipCode,
            country: "",
            email: localStorage.getItem("email"),
            phone: "",
            country: country || "",
          },
          shipping: {
            first_name: recipientName || "",
            last_name: "",
            address_1: address || "",
            address_2: "",
            city: city,
            state: "",
            postcode: zipCode,
            country: country || "",
          },
          line_items: lineItems.map((item) => {
            let amt = item.price;
            if (myCoupon) {
              amt = item.price - (item.price * myCoupon.amount) / 100;
            }

            return {
              product_id: item.id,
              quantity: item.quantity,
              price: amt + "",
              subtotal: amt + "",
              total: amt + "",
              meta_data: [
                {
                  key: item.price == 0 ? "Type" : "",
                  value: item.price == 0 ? "Free Product" : "",
                },
              ],
            };
          }),
          shipping_lines: [
            {
              method_id: "flat_rate",
              method_title: "Flat Rate",
              total: "0",
            },
          ],
        };
      } else {
        data = {
          payment_method: "card",
          payment_method_title: "card payments",
          set_paid: true,
          customer_id: user_id,
          billing: {
            first_name: firstName || "",
            last_name: lastName || "",
            address_1: address || "",
            address_2: "",
            city: city,
            state: "",
            postcode: zipCode,
            country: "",
            email: localStorage.getItem("email"),
            phone: "",
            country: country || "",
          },
          shipping: {
            first_name: firstName || "",
            last_name: lastName || "",
            address_1: address || "",
            address_2: "",
            city: city,
            state: "",
            postcode: zipCode,
            country: country || "",
          },
          line_items: lineItems.map((item) => {
            let amt = item.price;
            if (myCoupon) {
              amt = item.price - (item.price * myCoupon.amount) / 100;
            }

            return {
              product_id: item.id,
              quantity: item.quantity,
              price: amt + "",
              subtotal: amt + "",
              total: amt + "",
              meta_data: [
                {
                  key: item.price == 0 ? "Type" : "",
                  value: item.price == 0 ? "Free Product" : "",
                },
              ],
            };
          }),
          shipping_lines: [
            {
              method_id: "flat_rate",
              method_title: "Flat Rate",
              total: "0",
            },
          ],
        };
      }

      const res = await createOrderWC(data);
      router.push("/success");
      setOrderData(res);
    } else {
      toast("Payment Failed", { position: "top-right", type: "error" });
    }
  };
  const cardResponse = (getData) => {
    onCardApprove(getData);
  };
  const createOrder = (data, actions) => {
    const items = cart.map((pkg) => {
      let amt = pkg.price;
      if (myCoupon) {
        amt = pkg.price - (pkg.price * myCoupon.amount) / 100;
      }
      return {
        name: pkg.package,
        quantity: pkg.quantity,
        unit_amount: {
          currency_code: "EUR",
          value: amt / pkg.quantity,
        },
      };
    });

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "EUR",
                value: total,
              },
            },
          },
          items: items,
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async function (details) {
      const user_id = localStorage.getItem("user_id");
      let newCart = cart.reduce((acc, item) => {
        // Push the main item
        acc.push({ id: item.id, quantity: item.quantity, price: item.price });

        // Push each crossSell item
        if (item?.crossSells) {
          item?.crossSells?.forEach((crossSell) => {
            acc.push({
              id: crossSell?.id,
              quantity: crossSell?.quantity || 1,
              price: 0,
            });
          });
        }

        return acc;
      }, []);

      const lineItems = [
        ...newCart,
        ...courseDateData,
        ...futureCourseDateData,
      ];
      if (details.status == "COMPLETED") {
        const code = { code: coupon, total, applied: true };
        await getCoupons(code);
        toast("Payment completed successfully!", {
          type: "success",
          position: "top-center",
        });

        let data = {};

        if (isGift) {
          const user_id = await handleSendResetLink();
          data = {
            payment_method: "paypal",
            payment_method_title: "paypal payments",
            set_paid: true,
            customer_id: user_id,
            billing: {
              first_name: firstName,
              last_name: lastName,
              address_1: address,
              address_2: "",
              city: city,
              state: "",
              postcode: zipCode,
              country: "",
              email: localStorage.getItem("email"),
              phone: "",
              country: country,
            },
            shipping: {
              first_name: recipientName,
              last_name: "",
              address_1: address,
              address_2: "",
              city: city,
              state: "",
              postcode: zipCode,
              country: country,
            },
            line_items: lineItems.map((item) => {
              let amt = item.price;
              if (myCoupon) {
                amt = item.price - (item.price * myCoupon.amount) / 100;
              }

              return {
                product_id: item.id,
                quantity: item.quantity,
                price: amt + "",
                subtotal: amt + "",
                total: amt + "",
                meta_data: [
                  {
                    key: item.price == 0 ? "Type" : "",
                    value: item.price == 0 ? "Free Product" : "",
                  },
                ],
              };
            }),
            shipping_lines: [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "0",
              },
            ],
          };
        } else {
          data = {
            payment_method: "paypal",
            payment_method_title: "paypal payments",
            set_paid: true,
            customer_id: user_id,
            billing: {
              first_name: firstName || details.payer.name.given_name,
              last_name: lastName || details.payer.name.surname,
              address_1: address || details.payer.address.country_code || "",
              address_2: "",
              city: city,
              state: "",
              postcode: zipCode,
              country: "",
              email: localStorage.getItem("email"),
              phone: "",
              country: country || details.payer.address.country_code,
            },
            shipping: {
              first_name: firstName || details.payer.name.given_name,
              last_name: lastName || details.payer.name.surname,
              address_1: address || details.payer.address.country_code || "",
              address_2: "",
              city: city,
              state: "",
              postcode: zipCode,
              country: country || details.payer.address.country_code,
            },
            line_items: lineItems.map((item) => {
              let amt = item.price;
              if (myCoupon) {
                amt = item.price - (item.price * myCoupon.amount) / 100;
              }

              return {
                product_id: item.id,
                quantity: item.quantity,
                price: amt + "",
                subtotal: amt + "",
                total: amt + "",
                meta_data: [
                  {
                    key: item.price == 0 ? "Type" : "",
                    value: item.price == 0 ? "Free Product" : "",
                  },
                ],
              };
            }),
            // meta_data: [
            //   {
            //     id: 2095,
            //     key: "pa_color",
            //     value: "yes"
            //   }
            // ],
            // shipping_lines: [
            //   {
            //     method_id: "flat_rate",
            //     method_title: "Flat Rate",
            //     total: "0",
            //   },
            // ],
          };
        }

        const res = await createOrderWC(data);
        router.push("/success");
        setPaymentLoad(false);
        setOrderData(res);
      } else {
        toast("Payment Failed", { position: "top-center", type: "error" });
      }
    });
  };

  useEffect(() => {
    console.log("total", total);
  }, [total]);

  const fetchCoupons = async () => {
    if (!coupon) {
      toast("Please enter a coupon first!", {
        type: "warning",
        position: "top-center",
      });
      return;
    }

    if (coupon && !isApplied) {
      setCouponLoading(true);
      const code = { code: coupon, total, applied: false };
      const res = await getCoupons(code);
      if (res?.success) {
        setDiscountedAmount(res?.calculated_discount);
        setTotal(res?.new_total);
        setMyCoupon({ amount: res?.amount });
        setIsApplied(true);

        // Save coupon data in localStorage
        localStorage.setItem(
          "appliedCoupon",
          JSON.stringify({
            code: coupon,
            amount: res?.amount,
            total: res?.new_total,
          })
        );

        toast("Coupon applied successfully!", {
          type: "success",
          position: "top-center",
        });
        setCouponLoading(false);
      } else {
        setDiscountedAmount(0);
        toast("Please enter a valid coupon!", {
          type: "warning",
          position: "top-center",
        });
        setCouponLoading(false);
        // }
      }
    } else {
      setTotal(
        cart.reduce((prev, curr) => Number(prev) + Number(curr.price), 0)
      );
      setMyCoupon("");
      setCoupon("");
      setIsApplied(false);
      localStorage.removeItem("appliedCoupon");
      toast("Applied coupon removed!", {
        type: "info",
        position: "top-center",
      });
    }
  };
  const validateGiftInputs = (recipientName, recipientEmail, recipientMsg) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!recipientName) {
      errors.recipientName = "Recipient's name is required.";
    }
    if (!recipientEmail) {
      errors.recipientEmail = "Recipient's email is required.";
    } else if (!emailRegex.test(recipientEmail)) {
      errors.recipientEmail = "Please enter a valid email address.";
    }
    if (!recipientMsg) {
      errors.recipientMsg = "Message cannot be empty.";
    }

    return errors;
  };

  const checkValidation = () => {
    let tk = localStorage?.getItem("token");
    setToken(tk);
    if (!tk) {
      toast("You need to login first!", {
        position: "top-center",
        type: "warning",
      });
      setIsToken(false);
      return;
    }

    if (tk) {
      setIsToken(true);
    }

    if (!firstName) {
      toast("Please fill the first name!", {
        position: "top-center",
        type: "warning",
      });
      return false;
    }

    if (!lastName) {
      toast("Please fill the last name!", {
        position: "top-center",
        type: "warning",
      });
      return false;
    }

    if (!address) {
      toast("Please fill the address!", {
        position: "top-center",
        type: "warning",
      });
      return false;
    }
    if (!country) {
      toast("Please fill the country!", {
        position: "top-center",
        type: "warning",
      });
      return false;
    }
    if (!city) {
      toast("Please fill the city!", {
        position: "top-center",
        type: "warning",
      });
      return false;
    }
    if (!zipCode) {
      toast("Please fill the zip code!", {
        position: "top-center",
        type: "warning",
      });
      return false;
    }

    if (!billingChecked) {
      toast("Please accept the billing terms!", {
        position: "top-center",
        type: "warning",
      });
      return false;
    } else {
      setIsValid(true);
      setIsBilling(true);
    }
    return true;
  };

  const handleSendResetLink = async () => {
    let buyer = {
      buyer_name: localStorage.getItem("username"),
      buyer_email: localStorage.getItem("email"),
    };
    const res = await sendResentLink(
      recipientName,
      recipientEmail,
      recipientMsg,
      buyer
    );
    return res.user_id;
  };
  const handleInputChange = (setter, errorKey) => (e) => {
    setter(e.target.value);
    if (giftErrors[errorKey]) {
      setGiftErrors((prevErrors) => ({
        ...prevErrors,
        [errorKey]: undefined, // Clear the specific error for this field
      }));
    }
  };

  function formatCourseData(res) {
    const items = res.items.map((item, index) => {
      fetchSubProducts(item?.id);
      return {
        item_key: item.item_key,
        id: item.id,
        package: item.name,
        quantity: item.quantity.value,
        price: (parseInt(item.price) / 100).toFixed(2) * item.quantity.value,
        imgUrl:
          item.featured_image ||
          "https://via.placeholder.com/150/808080/808080",
        slug: item.cart_item_data.course_route,
        crossSells: item.cart_item_data.cross_sells || [],
        month: item.cart_item_data.month,
      };
    });
    return items;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container ">
      <div className="flex flex-col items-center justify-center mt-[25px]">
        {!isValid && !token ? (
          <h4 className="text-[15px] text-red-600 font-mediun italic">
            *You must log in before making a purchase
          </h4>
        ) : null}

        {courseDateData?.length > 0 || futureCourseDateData?.length > 0 ? (
          (courseDateData?.length > 0 && !selectedOptions[0]) || // If course dates exist and no date selected
          (futureCourseDateData?.length > 0 && !selectedFutureOptions[0]) ? ( // If future course dates exist and no date selected
            <h4 className="text-[15px] text-red-600 font-medium italic">
              *Choose dates for courses
            </h4>
          ) : null
        ) : null}

        {/* Show "Please fill the billing details" only when dates are selected */}
        {!isValid && token && selectedOptions?.value ? (
          <h4 className="text-[15px] text-red-600 font-mediun italic">
            *Please fill the billing details
          </h4>
        ) : null}

        {isValid && token ? (
          <h4 className="text-[15px] text-red-600 font-mediun italic">
            *Continue to payment checkout
          </h4>
        ) : null}
      </div>

      <div className="grid   grid-cols-[2fr,2fr] items-start gap-[70px] max-[1399px]:gap-[45px] max-[1199px]:gap-[25px] max-[991px]:grid-cols-1 my-[40px] max-[1199px]:my-[25px] max-[991px]:my-[20px]">
        {cart?.length > 0 && (
          <div className="bg-white py-[22px] relative p-0 lg:p-10">
            {quantityLoad && (
              <div className=" w-full h-full bg-black opacity-50 z-[90]  absolute top-0 left-0 flex justify-center items-center">
                <Spinner />
              </div>
            )}
            <h1 className="text-[#1A1E1C] text-[25px] mb-[11px] max-[640px]:text-[20px] leading-normal">
              Order Summary
            </h1>

            {cart?.length > 0
              ? cart.map((course) => (
                  <div
                    key={course.id}
                    className={`grid grid-cols-[100px,2fr,1fr]  lg:grid-cols-[125px, 2fr,1fr] justify-start items-start gap-[15px] border-b-[#8C8C8C] border-b-[1px] pb-[13px] mb-[19px]`}
                  >
                    <Link href={course?.slug || ""}>
                      <div className="relative h-[100px] w-[100px] lg:h-[125px] lg:w-[125px] ">
                        <Image src={course?.imgUrl} alt={course?.imgUrl} fill />
                      </div>
                    </Link>
                    <div className="pl-0 lg:pl-5">
                      <Link
                        href={course?.slug || ""}
                        className="text-[18px] font-semibold text-black mb-[10px] block text-ellipsis overflow-hidden w-full max-w-[300px] break-words"
                      >
                        {course?.package}
                      </Link>
                      <div className="flex items-center gap-[10px]">
                        {course?.price != 0 ? (
                          <>
                            <span className="text-[17px] text-black">
                              Quantity:
                            </span>

                            <div className="flex items-center border-[1px] border-[#8C8C8C] rounded-[8px]">
                              <button
                                // disabled={updating == true}
                                onClick={() =>
                                  handleQuantity("decrease", course?.id)
                                }
                                className="px-3 py-1 text-[25px]"
                              >
                                -
                              </button>
                              <span className="text-[16px] text-black font-black">
                                {course?.quantity.value || course?.quantity}
                              </span>
                              <button
                                // disabled={updating == true}
                                onClick={() =>
                                  handleQuantity("increase", course?.id)
                                }
                                className="px-3 py-1 text-[20px]"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                deleteCourse(course?.id);
                              }}
                              className="hover:opacity-50 transition-opacity duration-300"
                            >
                              <FaRegTrashAlt color="red" />
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="h-full">
                      <div className="flex flex-col justify-end items-end h-full">
                        <span className="text-[20px]">
                          {course?.price > 0 ? "£" + course.price : "Free"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : null}
            {token ? (
              <>
                {cart?.length === 0 ? (
                  <></>
                ) : (
                  <div>
                    <h4 className="font-medium text-[16px] max-[640px]:text-[14px] mb-4">
                      Use any applicable coupon to get a discount.
                    </h4>
                    {isApplied ? (
                      <h4 className="font-bold text-[#079561] text-[16px] max-[640px]:text-[14px] mb-4">
                        You applied for {myCoupon?.amount}% discount
                      </h4>
                    ) : null}
                    <div className="border-[1px] border-[#079561] flex">
                      <input
                        disabled={isApplied}
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        maxLength={40}
                        type="text"
                        placeholder="Enter coupon code here"
                        className="ps-[16px] pe-[20px] w-full py-[11px] outline-none border-none text-[14px]"
                      />
                      <button
                        onClick={fetchCoupons}
                        className="bg-[#079561] min-w-[141px] text-white font-semibold text-[16px] max-[] hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                      >
                        {couponLoading ? (
                          <Spinner />
                        ) : !isApplied ? (
                          "Apply"
                        ) : (
                          "Remove Coupon"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : null}

            <div className="flex justify-between items-center border-b-[1px] border-[#8C8C8C] mt-[22px] pb-[8px]">
              <span className="text-[18px]">Subtotal</span>
              <span className="text-[18px]">£{total}</span>
            </div>
            <div className="flex justify-between items-center mt-[18px]">
              <span className="text-[20px] font-bold">Total</span>
              <span className="text-[20px] font-bold">£{total}</span>
            </div>

            {token ? (
              <>
                <div className="flex items-center justify-start mt-[12px]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#079561] cursor-pointer"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIsGift(true);
                      } else setIsGift(false);
                    }}
                  />
                  <span className="text-[15px] ms-[10px]">Gift Course</span>
                </div>
                {/* {isGift ? (
                <div className="mt-[20px]">
                  <input
                    className="rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full block border-[#ddd] text-[14px]"
                    placeholder="Recipient’s Name"
                    type="text"
                    maxLength={50}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                  <input
                    className="rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full my-[10px] block border-[#ddd] text-[14px]"
                    placeholder="Recipient’s Email"
                    type="text"
                    maxLength={50}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                  <input
                    className="rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full block border-[#ddd] text-[14px]"
                    placeholder="Add your Message here"
                    type="text"
                    maxLength={250}
                    onChange={(e) => setRecipientMsg(e.target.value)}
                  />
                </div>
              ) : null} */}
                {isGift ? (
                  <div className="mt-[20px]">
                    <input
                      className="rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full block border-[#ddd] text-[14px]"
                      placeholder="Recipient’s Name"
                      type="text"
                      maxLength={50}
                      onChange={handleInputChange(
                        setRecipientName,
                        "recipientName"
                      )}
                    />
                    {giftErrors.recipientName && (
                      <p className="text-red-500 text-sm">
                        {giftErrors.recipientName}
                      </p>
                    )}

                    <input
                      className="rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full my-[10px] block border-[#ddd] text-[14px]"
                      placeholder="Recipient’s Email"
                      type="text"
                      maxLength={50}
                      onChange={handleInputChange(
                        setRecipientEmail,
                        "recipientEmail"
                      )}
                    />
                    {giftErrors.recipientEmail && (
                      <p className="text-red-500 text-sm">
                        {giftErrors.recipientEmail}
                      </p>
                    )}

                    <input
                      className="rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full block border-[#ddd] text-[14px]"
                      placeholder="Add your Message here"
                      type="text"
                      maxLength={250}
                      onChange={handleInputChange(
                        setRecipientMsg,
                        "recipientMsg"
                      )}
                    />
                    {giftErrors.recipientMsg && (
                      <p className="text-red-500 text-sm">
                        {giftErrors.recipientMsg}
                      </p>
                    )}
                  </div>
                ) : null}
              </>
            ) : null}

            <div className="flex w-full">
              {disableButton ? (
                <button className="bg-[#4e4e4e]  mt-[30px] p-[11px] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity duration-300 w-full block">
                  <div className="flex items-center justify-center">
                    <Spinner />
                    <span className="ml-2">Processing....</span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => {
                    paymentRef?.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                      inline: "nearest",
                    });
                    handlePayment();
                  }}
                  disabled={paymentLoad} // disable button while loading
                  className={` bg-[#079561]  mt-[30px] p-[11px] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity duration-300 w-full block`}
                >
                  {paymentLoad ? (
                    <div className="flex items-center justify-center">
                      <Spinner />
                      <span className="ml-2">Processing...</span>
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>
              )}
            </div>
          </div>
        )}
        {cart?.length === 0 ? (
          <h4 className="my-5 text-[20px] text-red-600 font-medium">
            Your cart is empty!
          </h4>
        ) : null}
        {/* RIGHT COLUMN */}
        <div className="bg-[#f1f1f1] px-[22px] py-[22px] relative ">
          <h1 className="text-[#1A1E1C] text-[25px] mb-[11px] max-[640px]:text-[20px] leading-normal">
            Checkout
          </h1>
          {/* Each tab pills */}

          {/* pill C */}
          {!token ? (
            <div
              className="pill bg-white w-[100%] max-[640px]:w-[100%] p-[10px] rounded-[8px] border-2 border-red-600"
              ref={authRef}
            >
              <button
                className=" border-none  flex gap-[10px] "
                onClick={() => setPillC(!pillC)}
              >
                <span
                  className={`text-[15px] inline-flex justify-center items-center border-[1px] border-[#000] w-[28px] h-[28px] rounded-[50%] font-black ${
                    pillC && "bg-black text-white"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`${pillC && "bg-black text-white"}`}
                  />
                </span>
                <span className="font-semibold text-[20px] max-[640px]:text-[18px]">
                  Register
                </span>
              </button>
              {/* pill body */}
              {pillC ? (
                <div className="px-[41px] py-[20px] max-[640px]:px-[0px] ">
                  <div className="flex items-center gap-[10px] flex-wrap">
                    <button
                      onClick={() => setOpenReg(true)}
                      // onClick={() => router.push("/verify-email")}
                      className="border-[1px] w-[40%] max-[640px]:w-[100%] max-[640px]:py-[12px] text-nowrap text-[16px] border-black rounded-[8px] text-center py-[13px] hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Register
                    </button>
                    <button
                      onClick={() => setOpen(true)}
                      className="border-[1px] w-[40%] max-[640px]:w-[100%] max-[640px]:py-[12px] text-nowrap text-[16px] border-black rounded-[8px] text-center py-[13px] hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Log In
                    </button>
                  </div>
                  <div className="text-[14px] flex gap-[8px] mt-[10px]">
                    <svg
                      className="inline"
                      width="16"
                      height="14"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 16.2C12.1217 16.2 14.1566 15.4414 15.6569 14.0912C17.1571 12.7409 18 10.9096 18 9C18 7.09044 17.1571 5.25909 15.6569 3.90883C14.1566 2.55857 12.1217 1.8 10 1.8C7.87827 1.8 5.84344 2.55857 4.34315 3.90883C2.84285 5.25909 2 7.09044 2 9C2 10.9096 2.84285 12.7409 4.34315 14.0912C5.84344 15.4414 7.87827 16.2 10 16.2ZM10 0C11.3132 0 12.6136 0.232792 13.8268 0.685084C15.0401 1.13738 16.1425 1.80031 17.0711 2.63604C17.9997 3.47177 18.7362 4.46392 19.2388 5.55585C19.7413 6.64778 20 7.8181 20 9C20 11.3869 18.9464 13.6761 17.0711 15.364C15.1957 17.0518 12.6522 18 10 18C4.47 18 0 13.95 0 9C0 6.61305 1.05357 4.32387 2.92893 2.63604C4.8043 0.948211 7.34784 0 10 0ZM9.75 4.5C10.1642 4.5 10.5 4.83579 10.5 5.25V8.62535C10.5 8.99448 10.7033 9.33359 11.029 9.50746L14.3498 11.2808C14.6973 11.4664 14.8075 11.9121 14.5866 12.2382C14.3955 12.5203 14.0218 12.6118 13.722 12.4499L9.52485 10.1834C9.20153 10.0088 9 9.67097 9 9.30351V5.25C9 4.83579 9.33579 4.5 9.75 4.5Z"
                        fill="#1C1F1E"
                      />
                    </svg>
                    <span className="leading-5">
                      Effortless Access Anytime
                      <br />
                      Seamless Learning Experience
                      <br />
                      Secure and Convenient Checkout
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* pill A */}
          {(options?.length > 0 || futureOptions?.length > 0) && (
            <div
              className={`pill bg-white w-[100%] max-[640px]:w-[100%] p-[10px] rounded-[8px] border-2 ${
                !token
                  ? "opacity-5 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
            >
              <button
                className=" border-none  flex gap-[10px] "
                onClick={() => setPillA(!pillA)}
              >
                <span
                  className={`text-[15px] inline-flex justify-center items-center border-[1px] border-[#000] w-[28px] h-[28px] rounded-[50%] font-black ${
                    pillA && "bg-black text-white"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`${pillA && "bg-black text-white"}`}
                  />
                </span>
                <span className="font-semibold text-[20px] max-[640px]:text-[18px]">
                  Dates for Courses
                </span>
              </button>
              {pillA ? (
                <div className="px-[41px] pt-[20px] pb-[20px] max-[640px]:px-[0px]">
                  <Select
                    onChange={(newValue) =>
                      // setSelectedOptions((prev) => (prev[0] = newValue))
                      setSelectedOptions((prev) => [
                        ...prev.slice(0, 0),
                        newValue,
                        ...prev.slice(1),
                      ])
                    }
                    className="mb-[15px] text-[14px]"
                    placeholder={"Select course date"}
                    value={selectedOptions[0]}
                    key={0}
                    options={options}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                      }),
                      option: (baseStyles, state) => ({ ...baseStyles }),
                    }}
                  />

                  {options?.length === 0 ? (
                    <h4 className=" text-[14px] text-[#555] font-normal italic">
                      There is no current live session options
                    </h4>
                  ) : null}

                  {futureOptions?.length === 0 ? (
                    <h4 className=" text-[14px] text-[#555] font-normal italic">
                      There is no future live session options
                    </h4>
                  ) : null}

                  <Select
                    onChange={(newValue) =>
                      // setSelectedFutureOptions(
                      //   (prev) => (prev[0] = newValue)
                      // )
                      setSelectedFutureOptions((prev) => [
                        ...prev.slice(0, 0),
                        newValue,
                        ...prev.slice(1),
                      ])
                    }
                    className="mb-[15px] text-[14px]"
                    placeholder={"Book future course date"}
                    value={selectedFutureOptions[0]}
                    key={0}
                    options={futureOptions}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                      }),
                      option: (baseStyles, state) => ({ ...baseStyles }),
                    }}
                  />
                </div>
              ) : null}
            </div>
          )}
          <div
            className={`  ${
              token
                ? cart?.length
                  ? courseDateData?.length || futureCourseDateData?.length
                    ? selectedOptions[0] && selectedFutureOptions[0]
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-5 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                  : "opacity-5 pointer-events-none"
                : "opacity-5 pointer-events-none"
            }`}
          >
            <div
              className="border-2 my-5 bg-white rounded-[8px] p-5 "
              ref={paymentRef}
            >
              <h4 className="font-bold text-[25px] max-[640px]:text-[18px] mb-4">
                Payment information
              </h4>
              <div className="flex gap-[20px]  lg:gap-[50px]">
                <div>
                  <input
                    type="radio"
                    id="express"
                    name="paymentMethod"
                    value="express"
                    checked={selectedOption === "express"}
                    onChange={() => setSelectedOption("express")}
                  />
                  <label
                    htmlFor="express"
                    className="ml-2  text-[12px] lg:text-[20px] leading-[60px] font-medium"
                  >
                    Express Checkout
                  </label>
                </div>

                {/* Radio button for Pay with Debit/Credit */}
                <div>
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={selectedOption === "card"}
                    onChange={() => setSelectedOption("card")}
                  />
                  <label
                    htmlFor="card"
                    className="ml-2 text-[12px] lg:text-[20px] leading-[60px] font-medium"
                  >
                    Pay with Credit or Debit
                  </label>
                </div>
              </div>
              {/* pill D */}
              <div className="pill  bg-white w-[100%] max-[640px]:w-[100%]  rounded-[8px] ">
                {selectedOption === "express" && (
                  <div className="py-4 flex items-center gap-[20px] flex-wrap max-[640px]:px-[0px]">
                    <PayPalScriptProvider
                      options={{
                        clientId:
                          "AVh1vQesw3rm4kQep9v87kymOtsgAYG757vZBslYOjY9Il2W3yV75QmzdhcMq5ovUly8qgcVuAMafm3N",
                        currency: "EUR",
                        intent: "capture",
                      }}
                    >
                      <PayPalButtons
                        fundingSource="paypal"
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={(err) => {
                          console.error("PayPal error", err);
                        }}
                        style={{
                          layout: "vertical",
                          height: 50,
                        }}
                      />
                    </PayPalScriptProvider>

                    {!isGooglepayOpen && (
                      <div className="min-w-[180px] h-[50px]  relative cursor-pointer">
                        <Image
                          src={gpayicon}
                          alt=""
                          fill
                          onClick={handleImageClick}
                        />
                      </div>
                    )}
                    <div ref={googlePayButtonRef}>
                      {isGooglepayOpen && amount >= 0 && (
                        <div ref={googlePayButtonRef}>
                          <Elements
                            stripe={stripePromise}
                            options={{
                              mode: "payment",
                              amount: 50,
                              currency: "eur",
                            }}
                          >
                            <CheckoutPage amount={50} />
                          </Elements>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* pill E */}
              {selectedOption === "card" && (
                <div className="pill py-4 bg-white w-[100%] max-[640px]:w-[100%] rounded-[8px]">
                  <div className="  max-[640px]:px-[0px]">
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        ref={checkoutFormRef}
                        amount={total}
                        cardResponse={cardResponse}
                        setPaymentLoad={setPaymentLoad}
                        setParentError={setParentError}
                        checkValidation={checkValidation}
                      />
                    </Elements>
                  </div>
                  {/* ) : null} */}
                </div>
              )}
            </div>
            {/* pill B */}
            <div
              className="pill bg-white w-[100%] my-[15px] max-[640px]:w-[100%] p-[10px] rounded-[8px] "
              ref={billingRef}
            >
              {!isValid ? (
                <h4 className="text-[15px] text-red-600 font-mediun mb-4">
                  *Billing details must be provided
                </h4>
              ) : null}

              <button
                className=" border-none  flex gap-[10px] "
                onClick={() => setPillB(!pillB)}
              >
                <span
                  className={`text-[15px] inline-flex justify-center items-center border-[1px] border-[#000] w-[28px] h-[28px] rounded-[50%] font-black ${
                    pillB && "bg-black text-white"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`${pillB && "bg-black text-white"}`}
                  />
                </span>
                <span className="font-semibold text-[20px] max-[640px]:text-[18px]">
                  Billing Details
                </span>
              </button>
              {/* pill body */}
              {pillB ? (
                <div className="px-[41px] py-[35px]  max-[640px]:px-[0px]">
                  <div className="grid grid-cols-2 gap-[10px]">
                    <input
                      className={`rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full block border-[#ddd] text-[14px] ${
                        !isValid && "border-red-600"
                      }`}
                      placeholder="First Name*"
                      type="text"
                      value={firstName}
                      maxLength={40}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <input
                      className={`rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full block border-[#ddd] text-[14px] ${
                        !isValid && "border-red-600"
                      }`}
                      placeholder="Last Name*"
                      type="text"
                      value={lastName}
                      maxLength={40}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                  <input
                    className={`rounded-[8px] outline-none border-[1px] py-[8px] my-[10px] px-[12px] w-full block border-[#ddd] text-[14px] ${
                      !isValid && "border-red-600"
                    }`}
                    placeholder="Address*"
                    type="text"
                    value={address}
                    maxLength={100}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <input
                    className={`rounded-[8px] outline-none border-[1px] py-[8px] my-[10px] px-[12px] w-full block border-[#ddd] text-[14px] ${
                      !isValid && "border-red-600"
                    }`}
                    placeholder="Country*"
                    type="text"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  />
                  <div className="grid grid-cols-2 gap-[10px]">
                    <input
                      className={`rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full block border-[#ddd] text-[14px] ${
                        !isValid && "border-red-600"
                      }`}
                      placeholder="City*"
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                    <input
                      className={`rounded-[8px] outline-none border-[1px] py-[8px] px-[12px] w-full block border-[#ddd] text-[14px] ${
                        !isValid && "border-red-600"
                      }`}
                      placeholder="Postal Code*"
                      type="text"
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex justify-start items-start mt-[10px]">
                    <input
                      value={billingChecked}
                      type="checkbox"
                      className="accent-[#079561] mt-1 me-1"
                      onClick={(e) => {
                        setBillingChecked(e.target.checked);
                      }}
                    />
                    <span className="text-[14px] leading-5">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy
                      <span className="text-red-600">*</span>
                    </span>
                  </div>
                  <div className="w-full ">
                    {disableButton ? (
                      <button className="bg-[#4e4e4e]  mt-[30px] p-[11px] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity duration-300 w-full block">
                        <div className="flex items-center justify-center">
                          <Spinner />
                          <span className="ml-2">Processing....</span>
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          paymentRef?.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                            inline: "nearest",
                          });
                          handlePayment();
                        }}
                        disabled={paymentLoad} // disable button while loading
                        className={` bg-[#079561]  mt-[30px] p-[11px] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity duration-300 w-full block`}
                      >
                        {paymentLoad ? (
                          <div className="flex items-center justify-center">
                            <Spinner />
                            <span className="ml-2">Processing...</span>
                          </div>
                        ) : (
                          "Place Order"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-[9999]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  <FaRegTimesCircle fontSize={"18px"} />
                </button>
              </div>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <LoginForm from="cart" />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog open={openReg} onClose={setOpenReg} className="relative z-[9999]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[720px] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpenReg(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  <FaRegTimesCircle fontSize={"18px"} />
                </button>
              </div>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <RegisterForm from="cart" />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

// async function handleQuantity(type, id) {
//   if (!token) {
//     const courses = JSON.parse(localStorage.getItem("courses"));
//     if (courses.length) {
//       const index = courses.findIndex((course) => course.id == id);

//       if (index === -1) return;

//       const unitPrice = Number(courses[index].price) / courses[index].quantity;

//       if (type === "increase") {
//         // Increase the quantity
//         courses[index].quantity += 1;
//         courses[index].price = unitPrice * courses[index].quantity;
//         localStorage.setItem("courses", JSON.stringify(courses));
//         location.reload();
//       } else if (type === "decrease") {
//         if (courses[index].quantity > 1) {
//           // Decrease the quantity if greater than 1
//           courses[index].quantity -= 1;
//           courses[index].price = unitPrice * courses[index].quantity;
//           localStorage.setItem("courses", JSON.stringify(courses));
//           location.reload();
//         } else {
//           // Set the quantity to 1 (never remove)
//           courses[index].quantity = 1;
//           courses[index].price = unitPrice * courses[index].quantity;
//           localStorage.setItem("courses", JSON.stringify(courses));
//         }
//       }
//     }
//     return;
//   }

//   const courses = [...cart];
//   const index = cart.findIndex((course) => course.id == id);

//   if (index !== -1) {
//     const course = courses[index];
//     const unitPrice = Number(course.price) / course.quantity;

//     if (type === "increase") {
//       // Increase the quantity
//       course.quantity = Number(course.quantity) + 1;
//       course.price = unitPrice * course.quantity;
//       handleUpdateCart(course.item_key, course.quantity);
//     } else if (type === "decrease") {
//       if (course.quantity > 1) {
//         // Decrease the quantity if greater than 1
//         course.quantity = Number(course.quantity) - 1;
//         course.price = unitPrice * course.quantity;
//         handleUpdateCart(course.item_key, course.quantity);
//       } else {
//         // Set the quantity to 1 (never remove)
//         course.quantity = 1;
//         course.price = unitPrice * course.quantity;
//         handleUpdateCart(course.item_key, course.quantity);
//       }
//     }
//   }
// }

// async function deleteCourse(id) {
//   if (!token) {
//     const courses = JSON.parse(localStorage.getItem("courses"));
//     if (courses.length) {
//       const index = courses.findIndex((course, key) => course.id == id);

//       if (index === -1) return;
//       courses.splice(index, 1);
//       localStorage.setItem("courses", JSON.stringify(courses));
//       location.reload();
//     }
//     return;
//   }

//   const courses = [...cart];
//   const index = cart.findIndex((course, _) => course.id == id);
//   if (index !== -1) {
//     setUpdating(true);
//     const course = courses[index];
//     const res = await deleteItem(course?.item_key);
//     if (res) {
//       setUpdating(false);
//       toast(res, {
//         type: "success",
//         position: "top-center",
//       });
//       fetchCartItems();
//     }
//     setUpdating(false);
//   }
// }

// async function handleUpdateCart(key, quantity) {
//   setUpdating(true);
//   const res = await updateCart(key, quantity);
//   if (res?.items?.length) {
//     const items = formatCourseData(res);
//     setCart(items);
//     setUpdating(false);
//   } else {
//     setCart([]);
//     setUpdating(false);
//   }
// }

// Handle quantity change (without reload)

// async function fetchSubProducts(id) {
//   setLoadingDates(true);
//   const res = await getProducts(id);

//   const courseDateIds = res?.meta_data?.filter((data) => data.key === "course_date");
//   const futureDateIds = res?.meta_data?.filter((data) => data.key === "future_course_date");

//   let dates = [], futureDates = [];

//   if (courseDateIds[0]?.value?.length) {
//     dates = await Promise.all(
//       courseDateIds[0]?.value?.map(async (id) => {
//         const res = await getProducts(id);
//         return {
//           name: res?.name,
//           id: res?.id,
//           package: res?.name,
//           quantity: 1,
//           price: 0,
//           imgUrl: "https://via.placeholder.com/150/808080/808080",
//           month,
//         };
//       })
//     );
//   }

//   if (futureDateIds[0]?.value?.length) {
//     futureDates = await Promise.all(
//       futureDateIds[0]?.value?.map(async (id) => {
//         const res = await getProducts(id);
//         return {
//           name: res?.name,
//           id: res?.id,
//           package: res?.name,
//           quantity: 1,
//           price: 0,
//           imgUrl: "https://via.placeholder.com/150/808080/808080",
//           month,
//         };
//       })
//     );
//   }
//   setCourseDateData(dates);
//   setFutureCourseDateData(futureDates);
//   setLoadingDates(false)
// }

function formatCourseData(res) {
  const items = res.items.map((item, index) => {
    fetchSubProducts(item?.id);
    return {
      item_key: item.item_key,
      id: item.id,
      package: item.name,
      quantity: item.quantity.value,
      price: (parseInt(item.price) / 100).toFixed(2) * item.quantity.value,
      imgUrl:
        item.featured_image || "https://via.placeholder.com/150/808080/808080",
      slug: item.cart_item_data.course_route,
      crossSells: item.cart_item_data.cross_sells || [],
      month: item.cart_item_data.month,
    };
  });
  return items;
}
