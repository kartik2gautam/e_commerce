import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Logout() {
  const navigate = useNavigate();
  const { authToken, logout } = useContext(AuthContext);
  const notify = () => toast("Logged Out!");
  console.log(authToken);

  const handlelogout = () => {
    if (authToken) {
      console.log(authToken["refresh"]);

      try {
        axios
          .post(
            `http://127.0.0.1:8000/api/user/logout/${authToken["refresh"]}`,
            null
          )
          .then(() => {
            logout(authToken);
            console.log("Logged out ");
            navigate("/");
          })
          .catch((error) => {
            console.error("Logout failed:", error);
          });
      } catch (error) {
        console.log("failed logout request.. Now in the catch block");
        logout(authToken);
      }
    } else {
      console.log("User is not authenticated");
    }
  };

  return (
    <div>
      <button onClick={handlelogout}>Logout</button>
    </div>
  );
}
