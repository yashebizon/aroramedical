import React from "react";
import RegisterForm from "../components/signup/Signup";
import { Suspense } from 'react';

function Signup() {
  return (
    <>
     <Suspense fallback={<div>Loading signup page...</div>}>
      <RegisterForm />
     </Suspense>
    </>
  );
}

export default Signup;
