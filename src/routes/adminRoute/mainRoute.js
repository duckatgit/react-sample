// src/routes/Index.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./adminRoute";

// Admin SCSS
import "assets/scss/theme.scss";
import { getPermissions } from "Store/Dashboard/thunks";
import * as ACTION from "Store/userAuthentication/signUpSlice";
const Navigation = () => {
  const { isLoading } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getPermissions()).unwrap();
      dispatch(ACTION.setStatus());
    }
    fetchData();
  }, []);

  return !isLoading ? (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  ) : null;
};

export default Navigation;
