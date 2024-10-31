"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../layout";
import { useRouter } from "next/navigation";
import { clearCart, getCart, checkOrderStatus } from "../../lib/woredpressApi";

function Page() {
  const [token, setToken] = useState("");
  const router = useRouter();
  const { setCart, orderData } = useContext(CartContext);
  const [isApiResponseTrue, setIsApiResponseTrue] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const date = new Date(orderData?.date_created);

  useEffect(() => {
    const tk = localStorage.getItem("token");
    setToken(tk);
  }, []);

  useEffect(() => {
    handleClearCart();
  }, []);

  async function handleClearCart() {
    const emptyCart = await clearCart();
    if (emptyCart.status == 200 || emptyCart.status == 201) {
      fetchCartItems();
    }
  }

  async function fetchCartItems() {
    const res = await getCart();
    if (res?.items?.length) {
      const items = formatCourseData(res);
      setCart(items);
    } else {
      setCart([]);
    }
  }


  const checkApi = async () => {
    try {
      const orderIds = orderData?.id
      if (orderIds) {
        if (!isApiResponseTrue) {
          const response = await checkOrderStatus(orderIds);
          if (response?.order_product_lookup && response?.order_stats) {
            setIsApiResponseTrue(true);
            clearInterval(intervalId); // Stop the interval if the condition is met
          }
        }
      }

    } catch (error) {
      console.error('Error calling the API:', error);
    }
  };
  const handleClick = async () => {
    if (!isApiResponseTrue) return;
    const dashboardUrl = `https://aroramedicallmsfe.ebizonstaging.com/course/${token}`;
    router.replace(dashboardUrl);

  }
  useEffect(() => {
    const intervalId = setInterval(checkApi, 5000);
    return () => clearInterval(intervalId);
  }, [orderData]);


  function formatCourseData(res) {
    const items = res.items.map((item, index) => {
      return {
        item_key: item.item_key,
        id: item.id,
        package: item.name,
        quantity: item.quantity.value,
        price: (parseInt(item.price) / 100).toFixed(2) * item.quantity.value,
        imgUrl:
          item.featured_image ||
          "https://via.placeholder.com/150/808080/808080",
      };
    });

    return items;
  }

  return (
    <>
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-[900px] px-4 2xl:px-0">
          <h2 className="text-3xl font-semibold text-black mb-2 text-center">
            Payment Done!
          </h2>
          <p className="text-black text-center">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-black mb-6 md:mb-8 text-center">Have a great day!</p>
          <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-100 p-6 mb-6 md:mb-8">
            <dl className="sm:flex items-center justify-between gap-4">
              <div className="flex w-full">

                <dt className=" mb-1 sm:mb-0 text-gray font-bold">Date</dt>
              </div>
              <div className="flex w-full">

                <dd className="font-medium text-gray sm:text-end">
                  {date?.toLocaleDateString("en-GB")}
                </dd>
              </div>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <div className="flex w-full">

                <dt className="font-bold mb-1 sm:mb-0 text-gray ">
                  Payment Method
                </dt>
              </div>
              <div className="flex w-full">

                <dd className="font-medium text-gray sm:text-end">
                  {orderData?.payment_method}
                </dd>
              </div>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <div className="flex w-full">

                <dt className="font-bold mb-1 sm:mb-0 text-gray ">Name</dt>
              </div>
              <div className="flex w-full">

                <dd className="font-medium text-gray sm:text-end">
                  {orderData?.billing?.first_name} {orderData?.billing?.last_name}
                </dd>
              </div>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <div className="flex w-full">

                <dt className="font-bold mb-1 sm:mb-0 text-gray ">Address</dt>
              </div>
              <div className="flex w-full">

                <dd className="font-medium text-gray sm:text-end">
                  {orderData?.billing?.address_1}
                </dd>
              </div>
            </dl>
            <dl className="sm:flex items-start justify-between gap-4">
              <div className="flex w-full">

                <dt className="font-bold mb-1 sm:mb-0 text-gray ">
                  Purchased Items
                </dt>
              </div>
              <div className="flex w-full">

                <dd className="font-medium text-gray  flex flex-col gap-5 mb-2">
                  {orderData?.line_items?.map((item, key) => (
                    <div className=" flex flex-col border border-gray-300 p-3 rounded-[10px]" key={key}>
                      <p className="text-[16px]">{item.name}</p>
                      {item.price * 1 === 0 ? <p className="text-[16px]">Free</p>
                        : <div>

                          <div className="text-[16px] flex">
                            Price:
                            {item?.original_price * item?.quantity !== item.price * 1 &&
                              <p className="text-[16px] mr-5">
                                <span className="font-normal line-through">£{item?.original_price * item?.quantity}</span>
                              </p>
                            }
                            <span className="font-normal">£{item?.price}</span>
                          </div>
                        </div>
                      }
                      <p className="text-[16px]">Qty: <span className="font-normal">{item.quantity}</span></p>
                      <p className="text-[16px]">Product I'd : <span className="font-normal">{item.id}</span></p>

                    </div>
                  ))}
                </dd>
              </div>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4  border-black py-5 border-t-2">
              <div className="flex w-full">
                <dt className=" mb-1 sm:mb-0 text-gray font-bold">
                  Amount Paid
                </dt>
              </div>
              <div className="flex  w-full">

                <dd className="text-gray text-[25px] sm:text-end font-bold">
                  £{orderData?.total}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex items-center space-x-4 justify-center">
            <button
              onClick={() => {
                router.push("/");
              }}
              className="bg-[#079561] rounded-[66px]  py-[12px] px-[30px] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity duration-300"
            >
              Go Back
            </button>
            <button
              // onClick={() => {
              //   if (token) {
              //     setTimeout(() => {
              //       const dashboardUrl = `https://aroramedicallmsfe.ebizonstaging.com/course/${token}`;
              //       router.replace(dashboardUrl);
              //     }, 5000);
              //   }
              // }}
              onClick={handleClick}
              className="bg-[#079561] rounded-[66px] py-[12px] px-[30px] text-white font-semibold text-[16px] hover:opacity-90 transition-opacity duration-300"
            >
              {isApiResponseTrue ? "My Dashboard" : "preparing your dashboard"}
            </button>
            {/* {isApiResponseTrue &&
              <div>"Hello team"</div>
            } */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;



