import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Loader from "./Loader";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Validate the token only once when the component mounts
    const validateToken = () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error:any) {
        toast.error(error.message)
        // console.error("Invalid token", error);
        localStorage.removeItem("token");
        setIsAuthorized(false);
      }
    };

    validateToken();
  }, [token]);

  // Show a loader or placeholder while checking authorization
  if (isAuthorized === null) {
    return <Loader/>;
  }

  // Redirect to login if not authorized
  if (!isAuthorized) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Allow access if authorized
  return children;
};

export default ProtectedRoute;
