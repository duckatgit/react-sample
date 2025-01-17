import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logo from "assets/images/logo.svg";
import logoLightSvg from "assets/images/logo-light.svg";
import logoImage from "assets/images/logo.png";
import { useLocation } from "react-router-dom";
// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "Store/Layout/layoutSlice";
import LanguageSwitcher from "utils/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { getAdminProfile } from "Store/userAuthentication/thunks";

const Header = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch()
  const pathArray = location.pathname.split("/");
  const productId = pathArray[pathArray.length - 1];

  const productIndex = pathArray.lastIndexOf("product");
  const unitIndex = pathArray.lastIndexOf("unit");
  const showBackButton =
    (pathArray.includes("user") &&
      pathArray.indexOf("user") < pathArray.length - 1) ||
    !isNaN(productId) ||
    (productIndex !== -1 &&
      productIndex < pathArray.length - 1 &&
      pathArray[productIndex + 1].trim() !== "") ||
    (unitIndex !== -1 &&
      unitIndex < pathArray.length - 1 &&
      pathArray[unitIndex + 1].trim() !== "");

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }


  useEffect(() => {
    dispatch(   getAdminProfile())
  }, [])
  

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex flex-row align-items-center">
            <div className="d-flex align-items-center">
              <div className="navbar-brand-box d-lg-none d-md-block">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="22" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoLightSvg} alt="" height="22" />
                  </span>
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  tToggle();
                }}
                className="btn btn-sm px-3 font-size-16 header-item "
                id="vertical-menu-btn"
              >
                <i className="fa fa-fw fa-bars" />
              </button>
              <div className="logo_mobile">
                <Link to="/" className="logo">
                  <span className="logo-sm">
                    <img src={logoImage} alt="" height="22" />
                  </span>
                </Link>
              </div>
            </div>
            {showBackButton && (
              <div
                className="d-flex flex-row backBtn"
                onClick={() => window.history.back()}
                style={{ alignItems: "center" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21"></path>
                </svg>
                <button type="button" className="btn btn-secondary btn-sm">
                  {t("back")}
                </button>
              </div>
            )}
          </div>

          <div className="d-flex align-items-center">
           
            <LanguageSwitcher />

            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state?.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(Header);
