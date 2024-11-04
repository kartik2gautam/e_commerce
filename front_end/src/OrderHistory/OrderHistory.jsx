import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderHistory.css";
import { OrderHistoryProduct } from "../Products/OrderHistoryProduct";
import { MyNavbar } from "../Navbar/MyNavbar";

export const OrderHistory = () => {
  const [orders, setorders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => { // getting the order history of user when component is rendered
    console.log("userid is:", user.id);
    if (user.id) {
      axios
        .get(`http://127.0.0.1:8000/api/order/${user.id}/getOrders/`)
        .then((response) => {
          console.log(response.data, "Order history Get request successful!");
          setorders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order history:", error);
        });
    }
  }, [user.id]);

  return (
    <div className="bg-dark text-white ">
      <MyNavbar />
      <h1 className="p-4">Order History</h1>
      
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            <div>
              <div className="order-grid text-dark">
                <ul className=" rounded mt-5 order-div p-4">
                  <div className="div-text">
                    <p className="text-dark fw-lighter">
                      Order Status: {order.orderStatus}
                    </p>
                    <p className="text-dark fw-lighter">
                      Order Date: {order.order_date}
                    </p>
                    <p className="text-dark fw-lighter">
                      Will be delivered by: {order["delivered by"]}
                    </p>
                    <p className="text-dark fw-lighter">
                      Shipping Addrress: {order["shipping address"]}
                    </p>
                    <p className="text-dark fw-lighter">
                      Receiver's Name: {order["receiver name"]}
                    </p>
                    <p className="text-dark fw-lighter">
                      Receiver's Phone Number: {order["receiver phone no"]}
                    </p>
                    <p>
                      Total Amount: {order['Total Amount']}
                    </p>
                  </div>
                  <div className="order-height">
                    {order.products.map( (product) => ( 
                      <div className="order-individual-product"> 
                        <li
                          key={product.product_id}
                          className=" mt-2 rounded li-div"
                        >
                          <div className="order-product">
                            <OrderHistoryProduct
                              key={product.id}
                              product={product}
                            />
                          </div>
                          <div className="product-details">
                            <p className="horz-center">
                              <p className="font-weight-bold">Quantity:</p>
                              {product["quantity"]}{" "}
                            </p>
                            <p className="horz-center">
                              Category: {product["category"]}
                            </p>
                            <p className="horz-center">
                              Publisher: {product["Publisher"]}
                            </p>
                          </div>
                        </li>
                        <hr></hr>
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
