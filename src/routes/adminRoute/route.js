import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Authmiddleware = (props) => {
  const location = useLocation();
  const { sideDashboard } = useSelector((state) => state?.dashboard);
  const { admin } = useSelector((state) => state?.auth);

  const path = location.pathname.split("/");

  if (localStorage.getItem("authAdmin")) {
    if (path && path[2]) {
      const desiredPath = `/${path[2]}`;
      for (let item of sideDashboard) {
        if (item.pattern == desiredPath || desiredPath =="/profile") {
          if (admin?.permission?.includes(item.slug) || admin?.id == 1 || desiredPath =="/profile") {
            return <React.Fragment> {props.children} </React.Fragment>;
          }
        }
      }
    }
  }

  return (
    <Navigate
      to={{
        pathname: "/admin/login",
        state: {
          from: props.location,
        },
      }}
    />
  );
};

export default Authmiddleware;
