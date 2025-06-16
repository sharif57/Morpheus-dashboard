/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("Decoded User:", decodedUser);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error.message);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-gray-600 font-semibold">Validating access...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (user.adminId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoutes;
