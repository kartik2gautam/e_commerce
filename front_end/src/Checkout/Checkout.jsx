import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { MyNavbar } from "../Navbar/MyNavbar";

export const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ // creating an formdata instance which to post 
    receiver_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    state: "",
    pincode: "",
    payment_mode: "",
  });

  const handleChange = (e) => { // handling changes in form inputs and setting in formdata
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/api/order/${user.id}/createOrder/`, formData) // formdata posting when the handlesubmit button is clicked
      .then((response) => {
        console.log(response.data, "Order Successful!");
        navigate("/site/home/orderhistory");
      })
      .catch((error) => {
        console.error("Order failed!");
      });
    console.log(formData);
  };

  return (
    <div className="checkout-container text-white">
      <MyNavbar />
      <h2 className="checkout-heading mt-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="mb-3">
          <label htmlFor="receiver_name" className="form-label">
            Receiver's Name
          </label>
          <input
            type="text"
            className="form-control"
            id="receiver_name"
            name="receiver_name"
            value={formData.receiver_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            className="form-control"
            id="phone_number"
            name="phone_number"
            min="100000000"
            max="9999999999"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="street_address" className="form-label">
            Street Address
          </label>
          <input
            type="text"
            className="form-control"
            id="street_address"
            name="street_address"
            value={formData.street_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">
            Pincode
          </label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="payment_mode" className="form-label">
            Payment Mode
          </label>
          <select
            type="text"
            className="form-control"
            id="payment_mode"
            name="payment_mode"
            value={formData.payment_mode}
            onChange={handleChange}
            required
          >
            <option value="">Select a Payment Mode</option>
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <button type="submit" className="btn btn-danger checkout-button">
          Place Order
        </button>
      </form>
    </div>
  );
};
