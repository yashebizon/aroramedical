import React, { Suspense } from "react";
import ResetPassForm from "../components/resetpass/ResetPass";

function ResetPass() {
  return (
    <Suspense>
      <ResetPassForm />
    </Suspense>
  );
}

export default ResetPass;
