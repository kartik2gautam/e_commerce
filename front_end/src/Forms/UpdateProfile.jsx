import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";

export function UpdateProfile() {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState(false);
  const { userId } = useContext(AuthContext);
  const [formData, setformData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/user/updateprofile/`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.access}`,
        },
      })
      .then((response) => {
        navigate("/site/home/");
        console.log("Profile updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error with put request :", error);
      });
  };

  useEffect(() => {
    if (authToken) {
      console.log(authToken.access);
      console.log(userId);

      axios
        .get("http://127.0.0.1:8000/api/user/profile/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.access}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          console.log(userData);
          setformData({
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone_number: userData.phone_number || "",
            street_address: userData.street_address || "",
            city: userData.city || "",
            state: userData.state || "",
            pincode: userData.pincode || "",
          });
        })
        .catch((error) => {
          console.error("Profile request failed:", error);
        });
    } else {
      console.log("Error with AuthToken!");
    }
  }, [authToken]);

  return (
    <div className="container">
      <h2 className="text-white mt-3">Update Profile</h2>
      <div className="main-content mt-5">
        <form onSubmit={handleSubmit} className=" add-product-form mt-0">
          <div className="form-group">
            <label className=" text-white add-product-label ">First Name</label>
            <input
              className="form-control "
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Last Name</label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">
              Phone Number
            </label>
            <input
              className="form-control"
              type="number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              min="1000000000"
              max="9999999999"
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">
              Street Address
            </label>
            <textarea
              className="form-control"
              type="text"
              name="street_address"
              value={formData.street_address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">City</label>
            <input
              className="form-control"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label">Pin Code</label>
            <input
              className="form-control"
              type="text"
              name="pincode"
              value={formData.pincode}
              pattern="[0-9]{6}"
              onChange={handleChange}
              required="required"
            />
          </div>

          <div className="form-group mt-3">
            <label className=" text-white add-product-label ">State</label>
            <input
              className="form-control"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required="required"
            />
          </div>

          <button className="btn btn-primary mt-4">Update Profile</button>
        </form>
        {successMessage && alert("Profile updated successfully!")}

        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqH-u8rLAV905572-eKimi7gvhTZtK26Frt2vniiNohPQ-uegfHzp8tvhKvQq-eRlaMt4&usqp=CAU"
          }
          alt="No image"
          className="img-preview rounded"
        />
      </div>
    </div>
  );
}
