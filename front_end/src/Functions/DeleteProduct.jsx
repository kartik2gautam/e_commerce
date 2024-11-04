import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const DeleteProduct = () => {
  const { product_id } = useParams();
  const [message, setMessage] = useState("Product deleted successfully!");

  useEffect(() => {
    axios
      .delete(`http://127.0.0.1:8000/api/product/DeleteProduct/${product_id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }, [product_id]);

  return <div className="text-white">{message}</div>;
};
