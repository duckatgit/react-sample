import PropTypes from "prop-types";
import React from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { layoutTypes } from "adminPanel/Constants/layout";

// Import Routes all
import { authProtectedRoutes, authRoutes } from "./index";

// Import all middleware
import Authmiddleware from "./auth";
import Privatemiddleware from "./route";

// layouts Format
import VerticalLayout from "adminPanel/adminComponents/VerticalLayout";
import NonAuthLayout from "adminPanel/adminComponents/NonAuthLayout";

const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const AdminRoutes = () => {
  const { layoutType } = useSelector((state) => ({
    layoutType: state?.Layout?.layoutType,
  }));

  const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      <Routes>
        {authRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <NonAuthLayout>{route.component}</NonAuthLayout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Privatemiddleware>
                <Layout>{route.component}</Layout>
              </Privatemiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

AdminRoutes.propTypes = {
  layout: PropTypes.any,
};

export default AdminRoutes;
