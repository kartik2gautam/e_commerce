import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MyNavbar } from "../Navbar/MyNavbar";
import { Homecategory } from "../Categories/Homecategory";
import { ProductSlider } from "./ProductSlider";
import { AllProducts } from "./AllProducts";
import { MyFooter } from "../Footer/MyFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { AuthContext } from "../AuthProvider";

export function Home() {
  const { authToken, setToken } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/productlist/", {})
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [authToken]);

  return (
    <div className="container-home">
      <MyNavbar />
      <ProductSlider />
      <Homecategory />
      <MyFooter />
    </div>
  );
}
