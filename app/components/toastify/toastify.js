"use client";

import React from "react";
import { ToastContainer as Container } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastContainer(props) {
  return (
    <>
      <Container {...props} />
    </>
  );
}

export default ToastContainer;
