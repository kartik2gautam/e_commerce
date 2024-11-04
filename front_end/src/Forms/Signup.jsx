import axios from "axios";
import React, { useState } from "react";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ // creating an formdata instance to post 
    email: "",
    first_name: "",
    password: "",
    security_question_pet: "",
  });

  const handleChange = (e) => { // handle change upon change in input field and setting in formdata
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => { // on submit posting the request with the formdata 
    e.preventDefault();
    const body = JSON.stringify(formData);
    axios
      .post("http://127.0.0.1:8000/api/user/register/", body, {
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
        alert("User with this email already exists!");
        console.log(error);
      });
  };
  return (
    <div className="container">
      <h2 className="text-white mt-3">Sign Up</h2>
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
            <label className=" text-white add-product-label">First Name </label>
            <input
              className="form-control"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required="required"
            />
          </div>
          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Pet Name (i.e. Security Question)</label>
            <input
              className="form-control"
              type="text"
              name="security_question_pet"
              value={formData.security_question_pet}
              onChange={handleChange}
              required="required"
            />
          </div>

          <button className="btn btn-danger mt-4">Create Profile</button>
        </form>
        {successMessage && alert("Profile Created successfully!")}
      </div>
    </div>
  );


}
