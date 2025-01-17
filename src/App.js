import React, { useEffect, lazy, Suspense, memo } from "react";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "nprogress/nprogress.css";
import { adminApi, userApi } from "utils/axiosSetup";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.js";
import * as ACTION from "Store/userAuthentication/signUpSlice";
import MainLoader from "loader";
import { emptyCartList } from "Store/Carts/cartSlice";

// Lazy-loaded routes
const MyRouts = lazy(() => import("routes/UserRoute/userRoute"));
const AdminRoutes = lazy(() => import("routes/adminRoute/mainRoute"));

// Memoized lazy-loaded routes
const MemoizedMyRoutes = memo(MyRouts);
const MemoizedAdminRoutes = memo(AdminRoutes);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { redirect, isAutoLogoutError, isAutoLogoutMessage, msgState } =
    useSelector((state) => state?.auth);

  useEffect(() => {
    //for admin
    adminApi.interceptors.request.use(
      (req) => {
        let user = JSON.parse(localStorage.getItem("authAdmin"));

        if (user) {
          if (new Date().getTime() > new Date(user.expiresIn).getTime()) {
            dispatch(ACTION.logOutAdmin());
            navigate("/admin/login");
            toast.error("Session Expired", {
              autoClose: 5000,
            });
            throw new adminApi.Cancel("Session Expired");
          }
          req.headers["Authorization"] = `${user.authToken}`;
        }
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    //for user
    userApi.interceptors.request.use(
      (req) => {
        let user = JSON.parse(localStorage.getItem("authUser"));
        if (user) {
          if (new Date().getTime() > new Date(user.expiresIn).getTime()) {
            dispatch(ACTION.logOut());
            dispatch(emptyCartList());
            navigate("/");
            toast.error("Session Expired", {
              autoClose: 5000,
            });
            throw new userApi.Cancel("Session Expired");
          }
          req.headers["Authorization"] = `${user.authToken}`;
        }

        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (redirect == true) {
      navigate("/");

      if (isAutoLogoutError) {
        toast.error(isAutoLogoutMessage, {
          autoClose: 5000,
        });
        dispatch(ACTION.logOut());
        dispatch(emptyCartList());
        dispatch(ACTION.logOutAdmin());
      }
    }
  }, [redirect, isAutoLogoutError]);

  return (
    <React.Fragment>
      <ToastContainer />

      <Suspense fallback={<MainLoader />}>
        <I18nextProvider i18n={i18n}>
          <MemoizedMyRoutes />
          <MemoizedAdminRoutes />
        </I18nextProvider>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
