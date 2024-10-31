"use client";
import React, { useState, useEffect, createContext } from "react";
import Header from "./components/header";
import Footer from "./components/footer/Footer";
import SubscribePopup from "./components/subscribe/SubscribePopup"; // Import the SubscribePopup component
import "./globals.css";
import ToastContainer from "./components/toastify/toastify";
import { getCart } from "@/lib/woredpressApi";
interface RootLayoutProps {
  children: React.ReactNode;
}

export const CartContext = createContext({});
const CartProvider = CartContext.Provider;

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [cartCounts, setCartCounts] = useState<any>(0);

  console.log(cartCounts, "cartCounts");
  const getCartData = async () => {
    const res = await getCart();
    const counts = localStorage.getItem("cartCounts") || "0"; // Ensure this is a string
    const countCart = res?.item_count || 0; // Use the item count from the response
    console.log(counts,countCart);
    // Update cart counts based on local storage and API response
    setCartCounts(parseInt(counts) + parseInt(countCart));
  };

  useEffect(() => {
    const isPopupClosed = localStorage.getItem("popupClosed");
    getCartData();
    console.log(cartCounts);
    // If popup is not closed, show it after 100ms
    if (!isPopupClosed) {
      const timer = setTimeout(() => {
        setIsPopupVisible(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsPopupVisible(false); // Close the popup when handleClose is called
  };

  return (
    <html lang="en">
      <head>
        <title>Arora Medical Education</title>
        <meta
          name="description"
          content="Pass your exams with Arora Medical Education. 5* Feedback, Award winning, Multiple learning types. 10+ years experience, both UK and IMG doctors. UKMLA, PLAB, MSRA, MRCGP"
        />
        <script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></script>
        <link rel="dns-prefetch" href="//widget.trustpilot.com" />
      </head>
      <body>
        <CartProvider
          value={{
            cart,
            setCart,
            cartCounts,
            setCartCounts,
            orderData,
            setOrderData,
          }}
        >
          <Header />
          {children}
          <Footer />
        </CartProvider>
        {isPopupVisible && <SubscribePopup onClose={handleClose} />}
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
