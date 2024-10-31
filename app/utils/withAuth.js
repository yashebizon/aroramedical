"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const authUserHandler = () => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login"); // Redirect to login if not authenticated
        } else {
          router.push("/");
        }
      };

      authUserHandler();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Add display name
  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
};

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
