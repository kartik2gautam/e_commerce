import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  const [user, setuser] = useState({});
  const [totalitems, settotalitems] = useState(0);
  const [amount, setamount] = useState(0);
  const [usercart, setusercart] = useState([]);
  const [is_admin, setIsadmin] = useState("False");

  useEffect(() => {
    if ((user.id, authToken)) {
      axios
        .get(`http://127.0.0.1:8000/api/user/profile`, {
          headers: {
            "Content-Type": "applcation/json",
            Authorization: `Bearer ${authToken.access}`,
          },
        })
        .then((response) => {
          console.log("User is already logged in !", response.data);
          setuser(response.data);

          console.log("response data ['is_admin']", response.data["is_admin"]);
          console.log("admin is :", is_admin);
        })
        .catch((error) => {
          console.log("User not logged in !",error);
        });
    } else {
      console.log("Problem finding Auth Token!");
    }
  }, [ authToken]);

  useEffect(() => {
    console.log("user is :", user);
    if (user.id, usercart) {
      axios
        .get(`http://127.0.0.1:8000/api/cart/getCart/${user.id}`, {
          headers: {
            "Content-Type": "applcation/json",
          },
        })

        .then((response) => {
          console.log(user.id);
          const cart = response.data["data"];
          setusercart(cart);
          setIsadmin(user.is_admin);
          console.log("User cart is :", response.data);
          let totalQuantity = 0;
          
          for (const cart_item of cart) {
            totalQuantity += cart_item.quantity;
          }
          settotalitems(totalQuantity);
          setamount(response.data["totalPrice"]);
          console.log("total quantity is :", totalitems);
        })
        .catch((error) => {
          console.log("error in get request");
        });
    } else {
      console.log("failed finding user cart");
    }
  }, [user.id]);

  const getcart = () => {
    if (user.id) {
      axios
        .get(`http://127.0.0.1:8000/api/cart/getCart/${user.id}`)
        .then((response) => {
          setusercart(response.data["data"]);
          const cart = response.data["data"];
          console.log("cart is :", cart);
          let totalQuantity = 0
          for (const cart_item of cart) {
            totalQuantity += cart_item.quantity;
          }
          settotalitems(totalQuantity);
          setamount(response.data["totalPrice"]);
        });
    }
  };


  const login = (token) => {
    localStorage.setItem("authToken", JSON.stringify(token));
    setAuthToken(token);
    console.log(authToken);
  };

  const logout = (token) => {
    localStorage.removeItem("authToken");
    console.log("user is logged out ");
    setAuthToken(null);
    setuser(null);
    console.log(authToken);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        getcart,
        amount,
        login,
        settotalitems,
        user,
        totalitems,
        usercart,
        is_admin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
