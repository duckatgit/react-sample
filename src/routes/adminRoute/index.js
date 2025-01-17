import React from "react";

// Authentication related pages
import Login from "adminPanel/adminPages/Authentication/Login";
import ForgetPassword from "adminPanel/adminPages/Authentication/ForgetPassword";
import ConfirmPassword from "adminPanel/adminPages/Authentication/ConfirmPassword";

// Pages
import Dashboard from "adminPanel/adminPages/Dashboard";
import Pages404 from "adminPanel/adminPages/404Page";

import CustomerList from "adminPanel/adminPages/User-Management/Customer/List";
import ViewCustomer from "adminPanel/adminPages/User-Management/Customer/ViewCustomer";
import AdminProfile from "adminPanel/adminPages/Profile";

const authProtectedRoutes = [
  {
    path: "dashboard",
    component: <Dashboard />,
  },
  {
    path: "profile",
    component: <AdminProfile />,
  },
  {
    path: "user-management/user",
    component: <CustomerList />,
  },
  {
    path: "user-management/user/:_id",
    component: <ViewCustomer />,
  },
  {
    path: "*",
    component: <Pages404 />,
  },
];

const authRoutes = [
  {
    path: "login",
    component: <Login />,
  },
  { path: "forgot-password", component: <ForgetPassword /> },
  {
    path: "confirm-password",
    exact: true,
    component: <ConfirmPassword />,
  },
];

const publicRoutes = [];

export { authProtectedRoutes, authRoutes, publicRoutes };
