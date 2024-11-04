import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import "./SingleProductView.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyFooter } from "../Footer/MyFooter";
import { MyNavbar } from "../Navbar/MyNavbar";

export const SingleProductView = () => {
  const { user, getcart } = useContext(AuthContext);
  const { authToken } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(0);
  const [amount, setamount] = useState(0);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    details: "",
    category: "",
    subcategory: "",
    Publisher: "",
    image_link: "",
  });

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    console.log("quantity is :", quantity);
    setamount(product.price * (quantity + 1));
    console.log("amount is :", amount);
  };

  const handleDecrement = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
      setamount(product.price * (quantity - 1));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.id) {
      axios
        .post(
          `http://127.0.0.1:8000/api/cart/${user.id}/add/${productId}/${quantity}`,
          product
        )
        .then((response) => {
          console.log("Product added to cart successfully!", response);
          getcart();
          navigate("/site/home/cart");
        })
        .catch((error) => {
          console.error("Error updating Cart:", error);
        });
    }
  };

  useEffect(() => {
    if (authToken) {
      console.log(" id product is :", productId);
      axios
        .get(`http://127.0.0.1:8000/api/product/getById/${productId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setProduct(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product detail:", error);
        });
    }
  }, [authToken]);
  return (
    <div className="single-product-body">
      <MyNavbar />
      <div
        className="blur-container"
        style={{ backgroundImage: `url(${product.image_link})` }}
      ></div>
      <div className="no-blur-content ">
        <div>
          <img
            src={product.image_link}
            alt={product.name}
            className="product-image rounded "
          />
        </div>

        <h1 className="text-white product-name">{product.name}</h1>
        <h4 className="fw-lighter text-white publisher">
          {product.Publisher} ·{product.category} ·Strategy ·Simulation
        </h4>
        <div className="buttons-div">
          <div className="quantity-div">
            <div className="bg-danger mt-4 mb-2  rounded quantity-button">
              <button
                className="decrement-button bg-danger"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="quantity-text text-white">{quantity}</span>
              <button
                className="increment-button  bg-danger"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          </div>
          <div className=" mb-5 green-button-div">
            <button className=" rounded green-button ">
              <img
                src="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/shopping_cart_loaded-256.png"
                alt="Cart"
                className="cart-icon"
                onClick={handleSubmit}
              />
            </button>
          </div>
        </div>
        <div className=" mt-5 grey-button-div">
          <button className="rounded text-white fw-lighter grey-button">
            ₹{amount}
          </button>
        </div>
      </div>

      <div className="product-description">
        <div className="age-div">
          <img
            src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/ratings/6/63/ESRB-ver2013_E.png?width=325"
            alt="Cart"
            className="age-logo"
          />

          <div className=" text-white fw-lighter age-restriction-div">
            <button className="rounded seventeenplus-button">
              <h6 className="mt-1">MATURE 17+</h6>
            </button>
            <p className="mt-2 age-text">
              Blood and Gore, Strong Language, Intense Violence
              </p>
              <hr></hr>
              <p>
              Users Interact, In-Game Purchases
            </p>
          </div>
        </div>
        <div className="product-description-div">
          <p className="mt-5 text-white fw-lighter">
            Description {product.details}
          </p>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
