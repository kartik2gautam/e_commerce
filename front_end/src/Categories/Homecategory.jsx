import React from "react";
import "./Homecategory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../Images/Action.jpg";
import img2 from "../Images/Adventure.jpg";
import img3 from "../Images/Racing.jpg";
import img4 from "../Images/Horror.jpg";
import img5 from "../Images/Fighting.jpg";
import img6 from "../Images/Gaming.jpg";
import { useNavigate } from "react-router-dom";
import { AllProducts } from "../Home/AllProducts";

export const Homecategory = () => { // component to called for showing the categories in home page
  const navigate = useNavigate();

  return (
    <div className="homecategories">
      <div
        className="container-category rounded bg-black mt-3 text-white p-3"
        onClick={() => navigate("/site/home/action")}
      >
        <div className="category-container-image">
          <img src={img1} alt="noimg" className="img-fluid w-50 h-50 " />
        </div>
        <div className="category-text">
          <h1 className="font-weight-light">Action</h1>
          <p>Experience heart-pounding action in every game!!</p>
        </div>
      </div>
      <div
        className="container-category rounded bg-black mt-3 text-white p-3"
        onClick={() => navigate("/site/home/adventure")}
      >
        <div className="category-text-right ">
          <h1>Adventure</h1>
          <p>
            Explore different realms chart your path in the world of adventure
            games!
          </p>
        </div>
        <div className="category-container-image">
          <img src={img2} alt="noimg" className="img-fluid w-50 h-50 " />
        </div>
      </div>
      <div
        className="container-category rounded bg-black mt-3 text-white p-3"
        onClick={() => navigate("/site/home/racing")}
      >
        <div className="category-container-image">
          <img src={img3} alt="noimg" className="img-fluid w-50 h-50 " />
        </div>
        <div className="category-text ">
          <h1>Racing</h1>
          <p>Race to victory in our thrilling games!</p>
        </div>
      </div>
      <div
        className="container-category rounded bg-black mt-3 text-white p-3"
        onClick={() => navigate("/site/home/horror")}
      >
        <div className="category-text-right ">
          <h1>Horror</h1>
          <p>Face your deepest fears in our chilling horror games!</p>
        </div>
        <div className="category-container-image">
          <img src={img4} alt="noimg" className="img-fluid w-50 h-50 " />
        </div>
      </div>
      <div
        className="container-category rounded bg-black mt-3 text-white p-3"
        onClick={() => navigate("/site/home/fighting")}
      >
        <div className="category-container-image">
          <img src={img5} alt="noimg" className="img-fluid w-50 h-50 " />
        </div>
        <div className="category-text ">
          <h1>Fighting</h1>
          <p>Face your deepest fears in our chilling horror games!</p>
        </div>
      </div>
      <div
        className="container-category rounded bg-black mt-3 text-white p-3"
        onClick={() => navigate("/site/home/gamingconsoles")}
      >
        <div className="category-text-right ">
          <h1>Gaming Consoles</h1>
          <p>Face your deepest fears in our chilling horror games!</p>
        </div>
        <div className="category-container-image">
          <img src={img6} alt="noimg" className="img-fluid w-50 h-50 " />
        </div>
      </div>
      <div className="text-white p-3">
        <h1>
        All Products
        </h1>
      </div>
      <div>
        <AllProducts />
      </div>
    </div>
  );
};
