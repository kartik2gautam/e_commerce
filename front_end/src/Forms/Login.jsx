import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setmessage] = useState("");
  const [emailMandatory, setEmailMandatory] = useState(false);
  const [passwordMandatory, setPasswordMandatory] = useState(false);
  const { login } = useContext(AuthContext);
  const { authToken } = useContext(AuthContext);
  const notify = () => toast(message);

  const navigate = useNavigate();

  const handleEmailChange = (e) => { //handling the email change 
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => { // handling the password change 
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => { //posting the login request on submitting 
    e.preventDefault();  
    try {
      const response = await axios
        .post("http://127.0.0.1:8000/api/user/login/", {
          email,
          password,
        })

        .then((response) => {
          const authToken = response.data.token;
          login(authToken);
          navigate(`/site/home/`);
          console.log(authToken);
          setmessage("Logged In!");
        });
    } catch (err) {
      setmessage("Login Failed. Please check your credentials");
      setError("Login Failed. Please check your credentials.");
    }
  };

  useEffect(() => { // if authToken already exists in localstorage then navigating to home page directly 
    console.log("in ths login page !");
    if (localStorage.getItem("authToken")) {
      login(authToken)
      navigate("/site/home/");
      console.log("Authentication Token:", authToken);
    } else {
      console.log("No auth Token is there");
    }
  }, [authToken]);

  return (
    <div className="background-login">
      <div></div>
      <div className="container-login  p-4 rounded bg-black ">
        <div className="header mb-4">
          <div className="mid">
            <h3>User Login
            </h3>
            </div>
        </div>
        <div className="underline"></div>

        <form className="inputs" onSubmit={handleFormSubmit}>
          <div className="flex-column mb-4">
            <label className="labels mb-2 fw-lighter">Email</label>
            <input
              className="shadow rounded"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="flex-column mb-4">
            <label className="labels mb-2 fw-lighter">Password</label>
            <input
              className="shadow rounded "
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mid">
            <button type="submit" className=" btn btn-danger ">
              Log In
            </button>
          </div>
        </form>

        {error && <p>{error}</p>}
        <div className="d-flex flex-row justify-content-between p-2">
        <a
          className="text-decoration-none  cursor-pointer pe-auto fw-lighter color-links"
          onClick={() => navigate("/signup")}
        ><p>
          Create Account
          </p>
        </a>
        <a
          className="text-decoration-none  cursor-pointer pe-auto fw-lighter color-links"
          onClick={() => navigate("/forgetpassword")}
        ><p>
          Forget Password
          </p>
        </a>
        </div>
      </div>
    </div>
  );
};
