import React, { useContext, useState } from 'react';
import './OrderHistoryProduct.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';


 export const OrderHistoryProduct = ({ product }) => { // just a product component and getting product prop
  const {is_admin}= useContext(AuthContext)
  const navigate = useNavigate()
 
  return (
    <div className="bg-white rounded">
      <div className=" rounded btn btn-light order-product" onClick={()=>navigate(`/site/home/single-product-view/${product.product_id}`)}>
        <img className="order-rounded" src={product.product_image} alt={product.name} />
        <p className='mb-0 text-dark fw-lighter'>{product.name}</p>
        <p className=' text-dark fw-lighter'>₹{product.price}</p> 
      </div>
      </div>  
    
  );
};
