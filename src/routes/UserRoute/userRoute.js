// src/routes/Index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PagenotFound from "User/Components/page404";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Themes
import Hometheme from "User/Themes/homeTheme";
import ProductDetailTheme from "User/Themes/productDetailsTheme ";
import AboutTheme from "User/Themes/aboutTheme";
import ProfileTheme from "User/Themes/profileTheme";
import OrdersTheme from "User/Themes/ordersTheme";
import OrderDetailsTheme from "User/Themes/orderDetailsTheme";
import ContactUsTheme from "User/Themes/contactUsTheme";
import TicketTheme from "User/Themes/ticketTheme";

import ChangePassword from "User/Pages/userProfile/changePassword";
import UserProfile from "User/Pages/userProfile";
import Profile from "User/Pages/userProfile/profile";
import ProductListTheme from "User/Themes/productListTheme";
import ProductsTheme from "User/Themes/productTheme";

const MyRouts = () => {
  const { user } = useSelector((state) => state?.auth);
  const isAdminPath = window.location.pathname.includes("/admin");
  const isVarificationPath = window.location.pathname.includes("verification");
  return (
    <GoogleOAuthProvider clientId="553192377933-jpth47ebg81fr8hec2eril9gmkbfotb5.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<Hometheme />} />

        {user?.authToken && (
          <Route path="/setting/*" element={<ProfileTheme />} />
        )}

        <Route exact path="/about-us" element={<AboutTheme />} />
        <Route exact path="/orders" element={<OrdersTheme />} />
        <Route exact path="/order-detail" element={<OrderDetailsTheme />} />
        <Route exact path="/support" element={<TicketTheme />} />
        <Route exact path="/contact-us" element={<ContactUsTheme />} />
        <Route
          exact
          path="/setting/profile"
          element={
            <UserProfile>
              <Profile />
            </UserProfile>
          }
        />
        <Route
          exact
          path="/setting/change-password"
          element={
            <UserProfile>
              <ChangePassword />
            </UserProfile>
          }
        />

        <Route path="/product-item" element={<ProductsTheme />} />
        <Route path="/products" element={<ProductListTheme />} />
        <Route path="/product-detail" element={<ProductDetailTheme />} />
        {!isAdminPath && !isVarificationPath && (
          <Route path="/*" element={<PagenotFound />} />
        )}
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default MyRouts;
