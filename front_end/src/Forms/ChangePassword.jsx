import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext); // getting auth token from AuthProvider context 
  const [formdata, setformdata] = useState({  // formdata instance to post when the submit is clicked
    password: "",
  });

  const changepassword = (e) => { // handling changes in input field
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (authToken) {    // checking for authToken if it exists only then user can changes it's password
      const body = JSON.stringify(formdata);
      axios
        .post(`http://127.0.0.1:8000/api/user/changepassword/`, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.access}`,
          },
        })
        .then((response) => {
          console.log("Password changed successfuelly", response.data);
          navigate("/site/home");
        })
        .catch((error) => {
          console.log("change password failed", error);
        });
    }
  };
  return (
    <div className="container">
      <h2 className="text-white mt-3">Change Password</h2>
      <div className="main-content mt-5">
        <form onSubmit={handlesubmit} className=" add-product-form mt-0">
          <div className="form-group">
            <label className=" text-white add-product-label mb-2 ">
              New Password
            </label>
            <input
              className="form-control mb-4 "
              type="text"
              name="password"
              value={formdata.password}
              onChange={changepassword}
              required="required"
            />
          </div>
          <button className="btn btn-primary mt-4">Change Password</button>
        </form>
      </div>
    </div>
  );
};
