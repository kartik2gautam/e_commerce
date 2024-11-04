import React, { useContext, useState } from "react";
import { Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export const PrivateRoute = ({ element, ...rest }) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? <Outlet /> : <Navigate to="/" />;
};
