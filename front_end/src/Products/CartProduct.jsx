import React, { useContext, useEffect, useState } from "react";
import "./CartProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import axios from "axios";

export const CartProduct = ({ product ,quantity}) => { // component to render for a particular product show when a single cart product is passed from Cart.jsx and getting productid prop
  const { authToken,user,getcart } = useContext(AuthContext);
  const [item, setitem] = useState({});
  const navigate = useNavigate();
  useEffect(() => { // getting the particular products details and setting in item to show 
    if (authToken) {
      console.log(" id product is :", product);
      axios
        .get(`http://127.0.0.1:8000/api/product/getById/${product}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setitem(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product detail:", error);
        });
    }
  }, [authToken]);

  const submitremove=(e)=>{
    axios.post(`http://127.0.0.1:8000/api/cart/${user.id}/remove/${product}/`)
    .then((response)=>{
       getcart()
    })
  }
  return (
    <div className=" rounded products-cart">
        <div className=" rounded btn btn-secondary cart-image-div" onClick={() => navigate(`/site/home/single-product-view/${product}`)}>
        <img className="rounded cart-image-game" src={item.image_link} alt={product.name} />
        </div>
       
      
      <div className=" cart-product-text">
        <h4 className=" fw-lighter">{item.name}</h4>
        <p className="fw-lighter">
          {item.category}
        </p>
        <p className="fw-lighter">
        ₹{item.price}
        </p>
        <p className=" fw-lighter">Quantity: {quantity }</p>
        <a
                className="fw-lighter text-decoration-none cursor-pointer color-remove  "
                style={{ cursor: "pointer" }}
                onClick={submitremove}
                title="remove"
              >
                Remove
              </a>

        
        </div>
        <div className="cart-product-price">
        <p className="fw-lighter">₹{item.price*quantity}</p>
       
        </div>
    </div>
  );
};
