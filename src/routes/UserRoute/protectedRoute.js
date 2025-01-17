import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const admin = JSON.parse(localStorage.getItem("authAdmin"));
  if (admin?.id != 1) {
    return (
      <Navigate
        to={{
          pathname: `/admin/login`,
        }}
      />
    );
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ProtectedRoute;
