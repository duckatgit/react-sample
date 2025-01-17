import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "../Common/withRouter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SidebarContent = () => {
  const ref = useRef();
  const { t } = useTranslation();
  const { sideDashboard } = useSelector((state) => state?.dashboard);
  const { admin } = useSelector((state) => state?.auth);
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent4 = parent2.parentElement; // li tag

        // if (parent3) {
        //   parent3.classList.add("mm-active"); // li
        //   parent3.childNodes[0].classList.add("mm-active"); //a
        // const parent4 = parent3.parentElement; // ul
        if (parent4) {
          parent4.classList.add("mm-show"); // ul
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("mm-show"); // li
            parent5.childNodes[0].classList.add("mm-active"); // a tag
          }
        }
        // }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }

      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      let activePath = pathName.split("/");
      activePath = activePath.slice(0, -1).join("/");
      if (pathName === items[i].pathname || activePath === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  const sideBarSection = (item) => {
    switch (true) {
      case item.slug === "product-management":
        return (
          <React.Fragment>
            <Link to="/#" className="has-arrow">
              <i className="bx bxs-store"></i>
              <span>{t(item.name)}</span>
            </Link>
            
            <ul className="sub-menu">
            <div className=""><span className="collaps-dropdown">{t(item.name)}</span></div>
              <li>
                <Link to="/admin/product-management/product">
                  <i className="bx bxs-box"></i>
                  <span>{t("products")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/product-management/unit">
                  <i className="bx bxs-extension"></i>
                  <span>{t("units")}</span>
                </Link>
              </li>
            </ul>
          </React.Fragment>
        );

      case item.slug === "user-management":
        return (
          <React.Fragment>
            <Link to="/#" className="has-arrow">
              <i className="bx bxs-user-circle"></i>
              <span>{t(item.name)}</span>
            </Link>
            <ul className="sub-menu">
            <span className="collaps-dropdown">{t(item.name)}</span>
              <li>
                <Link to="/admin/user-management/user">
                  <i className="bx bx-cube-alt"></i>
                  <span>{t("customers")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/user-management/admin">
                  <i className="fab fa-redhat"></i>
                  <span>{t("adminSystemUsers")}</span>
                </Link>
              </li>
            </ul>
          </React.Fragment>
        );

      case item.slug === "order-management":
        return (
          <React.Fragment>
            <Link to="/#" className="has-arrow">
              <i className="bx bxs-data"></i>
              <span>{t(item.name)}</span>
            </Link>
            <ul className="sub-menu">
            <div className=""><span className="collaps-dropdown">{t(item.name)}</span></div>
              <li>
                <Link to="/admin/order-management/order">
                  <i className="bx bxs-bank"></i>
                  <span>{t("orders")}</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/order-management/request">
                  <i className="bx bx-clipboard"></i>
                  <span>{t("businessOrder")}</span>
                </Link>
              </li>
            </ul>
          </React.Fragment>
        );

      case true:
        return (
          <Link to={`/admin${item.pattern}`}>
            <i className={item.icon}></i>
            <span>{t(item.name)}</span>
          </Link>
        );

      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {sideDashboard &&
              sideDashboard.map((item, key) => {
                if (
                  admin?.permission?.includes(item.slug) ||
                  (item.slug != "business-order" && admin?.id == 1)
                ) {
                  return <li key={key}>{sideBarSection(item)}</li>;
                }
              })}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
};

export default withRouter(SidebarContent);
