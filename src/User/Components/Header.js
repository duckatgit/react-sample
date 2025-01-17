import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Images
import { BsCart4 } from "react-icons/bs";
import Logo from "assets/images/logo.png";
import Avatar from "assets/images/user-icon.png";
import DropDownImg from "assets/images/Vector.png";
import Kuwait from "assets/images/kuwait.jpg";

// Modal Components
import Register from "./Auth/Register";
import LoginModal from "./Auth/LoginModal";
import ForgotPassword from "./Auth/forgotPassword";
import ConfirmPassword from "./Auth/ConfirmPassword";
import { RxCross2 } from "react-icons/rx";

// Store
import {
  getUserProfile,
  postInstaToken,
} from "Store/userAuthentication/thunks";
import { logOut } from "Store/userAuthentication/signUpSlice";
import ConfirmOtp from "./Auth/ConfirmOtp";
import * as ACTION from "Store/userAuthentication/signUpSlice";
import { getCartListItems } from "Store/Carts/thunks";
import { acceptInvite } from "Store/Users/thunks";
import { getProducts } from "Store/Product/thunks";
import LanguageSwitcher from "utils/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { emptyCartList } from "Store/Carts/cartSlice";

const Header = ({ isHomePage }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const query = new URLSearchParams(location?.search);
  const email = query.get("email");
  const token = query.get("token");
  const instaToken = query.get("code");
  const getLocalCartId = localStorage?.getItem("cartId");
  const authUser = localStorage?.getItem("authUser");
  const convertData = JSON.parse(getLocalCartId);

  const { productList } = useSelector((state) => state?.product);
  const { cartList } = useSelector((state) => state?.Cart);

  const { user, isSuccess, isError, message, userProfile, otpToken, isLogged } =
    useSelector((state) => state?.auth);

  const [loginToggle, setloginToggle] = useState(false);
  const [showRegister, setshowRegister] = useState(false);
  const [toggleOpt, settoggleOpt] = useState(false);
  const [toggleForgotPassWord, settoggleForgotPassWord] = useState(false);
  const [confirmPasswordShow, setconfirmPasswordShow] = useState(false);
  const [number, setnumber] = useState("");
  const [navigationToggle, setNavigationToggle] = useState(false);
  let userData = JSON.parse(localStorage.getItem("authUser"));

  const handleCloseModal = () => {
    setloginToggle(false);
    settoggleForgotPassWord(false);
    setshowRegister(false);
    setconfirmPasswordShow(false);
    settoggleOpt(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(emptyCartList())
    navigate("/");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      if (
        (email === null || email === undefined) &&
        (token != null || token != undefined)
      ) {
        setconfirmPasswordShow(true);
      } else if (token && email) {
        setloginToggle(true);
        dispatch(acceptInvite({ email, token }));
      }
    }
  }, [token, email]);

  useEffect(() => {
    const handleLoginProcess = async () => {
      if (instaToken) {
        const response = await dispatch(postInstaToken({ code: instaToken }));
        if (response.meta.requestStatus === "fulfilled") {
          query.delete("code");
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState({}, "", newUrl);
        }
      }
    };
    handleLoginProcess();
  }, [instaToken]);

  useEffect(() => {
    if (otpToken?.token) {
      navigate(`/?token=${otpToken.token}`);
    }
  }, [otpToken]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 5000,
      });
    } else if (isSuccess) {
      toast.success(message, {
        autoClose: 5000,
      });
    }
    dispatch(ACTION.reset());
  }, [isSuccess, isError]);

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 150) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  useEffect(() => {
    dispatch(getCartListItems({ cartId: convertData?.[0]?.cartId }));
    if (userData) {
      dispatch(getUserProfile());
    }
    dispatch(getProducts());
  }, [isLogged]);

  return (
    <React.Fragment>
      <header
        className={`page-header ${
          isHomePage ? (isSticky ? "is-sticky" : "") : "is-sticky"
        }`}
      >
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="" className="img-fluid logo_sze" />
            </Link>

            <div className="container mt-0  d-flex align-items-center justify mobile new-mobile">
              <li className="nav-item">
                <Link to="/cart-item" className="nav-link carticon">
                  <BsCart4 className="cart_icon" />
                  <span>{cartList?.data?.cartDetails?.length || 0}</span>
                </Link>
              </li>
              {authUser&&<div className="dropdown">
                <button
                  type="button"
                  className="btn dropdown-toggle px-0 d-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <img
                    className="avatar_image new_avtar"
                    src={userProfile?.profileImage || Avatar}
                  />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("/orders")}
                    >
                      {t("myOrder")}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate(`/setting/profile`)}
                      className="dropdown-item"
                    >
                      {t("myProfile")}
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("/support")}
                    >
                      {t("supportTicket")}
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleLogout()} className="dropdown-item">
                      {t("logout")}
                    </a>
                  </li>
                </ul>
              </div>}
              
            </div>

            <a
              className={`navbar-toggler position-relative ${
                navigationToggle ? "drop-down-open position-relative" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
              onClick={() => setNavigationToggle(!navigationToggle)}
            >
              <div className="cross-iconn">
                <RxCross2 />
              </div>
              {/* <i className="fas fa-times"></i> */}
              <span className="navbar-toggler-icon"></span>
            </a>

            <div
              className={`collapse navbar-collapse justify-content-end ${
                navigationToggle ? "show" : ""
              }`}
              id="collapsibleNavbar"
            >
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item ">
                  <Link to="/about-us" className="nav-link">
                    {t("aboutUs")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/contact-us" className="nav-link">
                    {" "}
                    {t("contactUs")}{" "}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    {" "}
                    {t("products")}{" "}
                  </Link>
                </li>

                <li className="nav-item ">
                  <Link to="/wishlist-item" className="nav-link">
                    {t("wishlist")}
                  </Link>
                </li>

                <li className="nav-item mobile_hidde">
                  <Link to="/cart-item" className="nav-link carticon">
                    <BsCart4 className="cart_icon" />
                    <span>{cartList?.data?.cartDetails?.length || 0}</span>
                  </Link>
                </li>

                <LanguageSwitcher />

                {!authUser ? (
                  <>
                    <li
                      className="nav-item"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      <div className="contact">
                        <div className="clip">
                          <div className="round"></div>
                          <a
                            className="nav-link"
                            onClick={() => setloginToggle(true)}
                          >
                            {t("login")}
                          </a>
                        </div>
                      </div>
                    </li>
                    <li
                      className="nav-item"
                      data-toggle="modal"
                      data-target="#signup"
                    >
                      <div className="contact">
                        <div className="clip">
                          <div className="round"></div>
                          <a
                            className="nav-link"
                            onClick={() => setshowRegister(true)}
                          >
                            {t("signup")}
                          </a>
                        </div>
                      </div>
                    </li>
                  </>
                ) : (
                  <div className="container mt-0 desktop">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn dropdown-toggle px-0 d-flex align-items-center p-0"
                        data-bs-toggle="dropdown"
                      >
                        <img
                          className="avatar_image new_avtar"
                          src={userProfile?.profileImage || Avatar}
                        />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => navigate("/orders")}
                          >
                            {t("myOrder")}
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => navigate(`/setting/profile`)}
                            className="dropdown-item"
                          >
                            {t("myProfile")}
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => navigate("/support")}
                          >
                            {t("supportTicket")}
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => handleLogout()}
                            className="dropdown-item"
                          >
                            {t("logout")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {showRegister && (
        <Register
          showRegister={showRegister}
          handleCloseModal={handleCloseModal}
          setloginToggle={setloginToggle}
          setshowRegister={setshowRegister}
        />
      )}

      {loginToggle && (
        <LoginModal
          loginToggle={loginToggle}
          handleCloseModal={handleCloseModal}
          toggleForgotPassWord={toggleForgotPassWord}
          settoggleForgotPassWord={settoggleForgotPassWord}
          setloginToggle={setloginToggle}
          setshowRegister={setshowRegister}
        />
      )}

      {toggleForgotPassWord && (
        <ForgotPassword
          toggleForgotPassWord={toggleForgotPassWord}
          settoggleForgotPassWord={settoggleForgotPassWord}
          handleCloseModal={handleCloseModal}
          setloginToggle={setloginToggle}
          setconfirmPasswordShow={setconfirmPasswordShow}
          settoggleOpt={settoggleOpt}
          setnumber={setnumber}
        />
      )}

      {toggleOpt && (
        <ConfirmOtp
          toggleOpt={toggleOpt}
          settoggleOpt={settoggleOpt}
          handleCloseModal={handleCloseModal}
          number={number}
          setloginToggle={setloginToggle}
        />
      )}

      {confirmPasswordShow && (
        <ConfirmPassword
          confirmPasswordShow={confirmPasswordShow}
          setconfirmPasswordShow={setconfirmPasswordShow}
          handleCloseModal={handleCloseModal}
          token={token}
        />
      )}
    </React.Fragment>
  );
};

export default Header;
