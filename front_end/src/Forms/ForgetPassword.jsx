import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgetPassword = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ // creating the formdata instance to post 
    email: "", 
    security_question_pet: "",
    password: "",
  });

  const handleChange = (e) => { // handling the changes in input fields
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => { // posting the forgetpassword api with formdata 
    e.preventDefault();
    const body = JSON.stringify(formData);
    axios
      .post("http://127.0.0.1:8000/api/user/forgetpassword/", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
        setSuccessMessage(true);
      })
      .catch((error) => {
        alert("Error in forget password post request!");
        console.log(error);
      });
  };
  return (
    <div className="container">
      <h2 className="text-white mt-3">Change Password</h2>
      <div className="main-content mt-5">
        <form onSubmit={handleSubmit} className=" add-product-form mt-0">
          <div className="form-group">
            <label className=" text-white add-product-label ">Email</label>
            <input
              className="form-control "
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">
              Security Question(i.e. pet name){" "}
            </label>
            <input
              className="form-control"
              type="text"
              name="security_question_pet"
              value={formData.security_question_pet}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">
              New Password
            </label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required="required"
            />
          </div>

          <button className="btn btn-danger mt-4">Change Password</button>
        </form>
        {successMessage && alert("Password updated successfully! Please login with new password")}
      </div>
    </div>
  );
};
