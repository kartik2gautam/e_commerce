import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';
import { MyNavbar } from '../Navbar/MyNavbar';
import './Cart.css';
import { CartProduct } from '../Products/CartProduct';
import 'bootstrap/dist/css/bootstrap.min.css'



export const Cart = () => {
  const { user, usercart, amount,getcart,totalitems } = useContext(AuthContext); // getting context from AuthProvider.jsx
  const navigate = useNavigate();
  const [cart, setCart] = useState(usercart); // creating an local usercart to update upon changes in quantity of products

  
  useEffect(()=> {
    setCart(usercart)
     // setting the local cart with the context cart upon every change in usercart
  }, [usercart])



  useEffect(()=>{
    getcart() // getting cart whenever cart component is called to get updated cart
  },[])


  const handleIncrement = async (productId) => { // changes being made asynchrounously in cart whenver increment happens
    const updatedCart = await Promise.all(
      cart.map(async (item) => {
        if (item.product === productId) {
            try {
              const incrementResponse = await axios.post(`http://127.0.0.1:8000/api/cart/${user.id}/update/${productId}/${item.quantity + 1}`);
              return { ...item, quantity: item.quantity + 1 };
            } catch (error) {
              console.log('Error in decrement post request', error);
              return item; // Return the original item if the request fails
            }
        }
        return item;
      })
    );
    setCart(updatedCart); 
    // Update the local cart state after all requests are complete
    getcart()
  };



  const handleDecrement = async (productId) => { // changes being made asynchrounously in cart whenver decrement happens
    const updatedCart = await Promise.all(
      cart.map(async (item) => {
        if (item.product === productId) {
          if (item.quantity === 1) {// if the current quantity is 1 and decrement button is clicked then the product should be deleted
            try {
              const removeResponse = await axios.post(`http://127.0.0.1:8000/api/cart/${user.id}/remove/${productId}/`);
              console.log('Product is removed from the cart', removeResponse.data);
            } catch (error) {
              console.log('Error in removing the product', error);
            }
          } else { // if quantity greater than 1 then cart quantity should update 
            try {
              const decrementResponse = await axios.post(`http://127.0.0.1:8000/api/cart/${user.id}/update/${productId}/${item.quantity - 1}`);
              console.log('Decrement post request is done', decrementResponse.data);
              return { ...item, quantity: item.quantity - 1 };
            } catch (error) {
              console.log('Error in decrement post request', error);
              return item; // Return the original item if the request fails
            }
          }
        }
        return item;
      })
    );
    setCart(updatedCart); 
   // Update the local cart state after all requests are complete
    getcart()
  };
  
  
  
  const handleCheckoutClick = (e) => { // navigating to checkout page 
    e.preventDefault()
    navigate('/site/home/cart/Checkout');
  };



  const handleEmptyCart = () => { // posting an empty cart api when this button is clicked
    axios
      .post(`http://127.0.0.1:8000/api/cart/${user.id}/empty/`)
      .then((response) => {
        setCart([]);
        console.log('Cart emptied successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error emptying cart:', error);
      });
  };




  return (
    <div className="container">
      <MyNavbar />
      <div className='w-100 p-3 main-div-cart'>
      <div>
      <h2 className='text-white '>Cart</h2>
      <hr
        style={{
          background: 'white',
          color: 'white',
          borderColor: 'white',
          height: '3px',
        }}
      />
      <div className='d-flex flex-row'>
      <div className="d-flex flex-column bd-highlight cart-item">
        {cart.map((product) => (
          <div className="p-2 bd-highlight mb-3" key={product.product}>
            <div className="">
              <div className="card-body text-white">
                {product && <CartProduct product={product.product} quantity= {product.quantity} />}
                
                <div className='horizontal-buttons mb-1'>
                <button
                  className="decrement-button-cart text-white rounded bg-dark mt-2"
                  onClick={() => handleDecrement(product.product)}
                >
                  -
                </button>
                
                <span className="quantity-text text-white">{product.quantity}</span>
                <button
                  className="increment-button-cart text-white rounded bg-dark mt-2"
                  onClick={() => handleIncrement(product.product)}
                >
                  +
                </button>
                </div>
              </div>
            </div>
            <hr
        style={{
          background: 'white',
          color: 'white',
          borderColor: 'white',
          height: '1px',
          margin: 0,
        }}
      />
          </div>
        ))}
      </div>
      <div className=' rounded cart-checkout-item'>
        <h5 className='text-white p-2'>
          Order Summary
        </h5>
        <div className='d-flex flex-row justify-content-between p-3 checkout-box-details'>
          <div className='text-white d-flex justify-content-start'>
            <div className='tex-white d-flex flex-column'>
            <div>
            Items({totalitems}):
            </div>
            <div>
            tax:
            </div>
            <div>
              Total:
            </div>
            </div>
          </div>
          <div>
          <div className='text-white d-flex justify-content-end'>
          ₹{amount}
          </div>
      <div className='text-white'>
        -
      </div>
      <div className="text-white">
      ₹{amount}
        {/* <button className="btn btn-primary flex-row  mb-3" onClick={handleCheckoutClick}>
          Proceed to Checkout
        </button> */}
        {/* <button className="btn btn-danger  flex-row-reverse " onClick={handleEmptyCart}>
          Empty Cart
        </button> */}
      </div>
      </div>
      </div>
      <div >
        <button className="btn btn-danger  flex-row  mb-3" onClick={handleCheckoutClick}>
         Proceed to Checkout
        </button>
        
      </div>
      
      </div>
      </div>
      <button className="btn btn-light flex-row  mb-3" onClick={handleEmptyCart}>
          Empty Cart
        </button>
      </div>
      
      </div>
    </div>
  );
};
