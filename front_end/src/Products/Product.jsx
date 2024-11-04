import React, { useContext, useState } from "react";
import "./product.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

export const Product = ({ product }) => {
  const { is_admin } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="products-block rounded">
      <div
        className="product rounded btn btn-secondary"
        onClick={() => navigate(`/site/home/single-product-view/${product.id}`)}
      >
        <img className="rounded" src={product.image_link} alt={product.name} />
        <p className="mb-0 fw-lighter">{product.name}</p>
        <p className="fw-lighter">₹{product.price}</p>
      </div>
      {is_admin && (
        <div className="buttons d-flex justify-content-between">
          <div
            className="h7 btn btn-secondary btn-sm rounded fw-lighter mt-3 text-white "
            onClick={() =>
              navigate(`/site/home/admin/update-product/${product.id}`)
            }
          >
            Update
          </div>
          <div
            className="h7 btn btn-secondary btn-sm rounded fw-lighter mt-3 text-white"
            onClick={() =>
              navigate(`/site/home/admin/delete-product/${product.id}`)
            }
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};
