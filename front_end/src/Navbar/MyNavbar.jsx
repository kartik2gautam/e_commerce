import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar"; 
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./MyNavbar.css";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyNavbar = () => {
  const navigate = useNavigate();
  const { authToken, logout, is_admin } = useContext(AuthContext);
  const { totalitems, getcart } = useContext(AuthContext);
  const notify = () => toast("Logged Out!");

  const handlelogout = () => { // post the logout request when logout is clicked
    if (authToken) {   // checking if authToken exists
      console.log(authToken["refresh"]);
      axios
        .post(
          `http://127.0.0.1:8000/api/user/logout/${authToken["refresh"]}`,
          null
        )
        .then(() => {
          logout(authToken);
          console.log("Logged out ");
          navigate("/");
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    } else {
      console.log("User is not authenticated");
    }
  };

  return (
    <div className="container-navbar rounded ">
      <Navbar expand="lg" className=" navbar">
        <Container fluid>
          <Navbar.Brand
            className="fw-lighter "
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/site/home");
            }}
          >
            Gaming House
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <a
                className="fw-lighter text-white text-decoration-none cursor-pointer pe-auto p-2 "
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/site/home");
                }}
                title="Home"
                target="_blank"
              >
                <i
                  className="fa-solid fa-house"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>
              {is_admin && (
                <a
                  className="fw-lighter text-white  text-decoration-none p-2"
                  style={{ cursor: "pointer" }}
                  title="Add a new Product"
                  onClick={() => {
                    navigate("/site/home/admin/addproduct/");
                  }}
                >
                  <i
                    className="fa-solid fa-folder-plus"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              )}

              <a
                className="fw-lighter text-white  text-decoration-none p-2"
                style={{ cursor: "pointer" }}
                title="Change Password"
                onClick={() => {
                  navigate("/site/home/changepassword/");
                }}
              >
                <i className="fa-solid fa-key" style={{ color: "#ffffff" }}></i>
              </a>

              <a
                className="fw-lighter text-white  text-decoration-none p-2"
                style={{ cursor: "pointer" }}
                title="Order History"
                onClick={() => {
                  navigate("/site/home/orderhistory");
                }}
              >
                <i
                  className="fa-solid fa-clock-rotate-left"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>
            </Nav>

            <a
              className="fw-lighter profile-image p-1"
              title="Update Profile"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/site/home/updateprofile");
              }}
            >
              <i
                className="fa-regular fa-user"
                style={{ color: "#ffffff" }}
              ></i>
            </a>
            <div className="p-2">
              <a
                className="fw-lighter text-white main-div"
                style={{ cursor: "pointer" }}
                title="Cart"
                onClick={() => {
                  getcart();
                  navigate(`/site/home/cart`);
                }}
              >
                <i
                  className="fa-solid fa-cart-shopping fa-lg"
                  style={{ color: "#ffffff" }}
                ></i>
                <span className="badge badge-danger">{totalitems}</span>
              </a>
            </div>
            <a
              className="fw-lighter "
              style={{ cursor: "pointer" }}
              title="Logout"
              onClick={handlelogout}
            >
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ color: "#fafafa" }}
                onClick={notify}
              >
                <ToastContainer />
              </i>
            </a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
