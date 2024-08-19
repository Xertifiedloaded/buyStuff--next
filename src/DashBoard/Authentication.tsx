import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";
import Admin from "../pages/Admin";


export const MyComponent = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getMeUser({
          nullUserRedirect: "/login",
          validUserRedirect: "/admin",
          navigate,
        });
        console.log("Fetched user:", user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      {loading ? <p>Loading...</p> : user ? <Admin /> : <p>No user found</p>}
    </div>
  );
};

export default MyComponent;



export const getMeUser = async ({
  nullUserRedirect,
  validUserRedirect,
  navigate,
}) => {
  const token = Cookies.get("token");

  if (!token) {
    if (nullUserRedirect) {
      navigate(nullUserRedirect);
    }
    return { user: null, token: null };
  }

  try {
    const response = await fetch("http://localhost:2024/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
    });
console.log(response);

    if (!response.ok) {
      const errorText = await response.text(); 
      console.error('Error response:', errorText); 
      throw new Error('Failed to fetch user');
    }

    const { user } = await response.json();
    console.log("User data:", user);

    if (validUserRedirect && user) {
      navigate(validUserRedirect);
    } else if (nullUserRedirect && !user) {
      navigate(nullUserRedirect);
    }

    return { user, token };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    if (nullUserRedirect) navigate(nullUserRedirect);
    return { user: null, token: null };
  }
};
