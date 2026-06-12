import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem("adminAuthenticated", "true");
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("adminAuthenticated");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // While checking auth status, show nothing
  if (isAuthenticated === null) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the component
  return children;
}

export default ProtectedRoute;
