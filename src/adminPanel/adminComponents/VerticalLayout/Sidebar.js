import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../Common/withRouter";
import SidebarContent from "./SidebarContent";

import logo from "assets/images/logo.png";
import smalllogo from "assets/images/favicon.png";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="" className="logo logo-dark">
            <span className="logo-sm">
              <img src={smalllogo} alt="" height="22" />
            </span>

            <span className="logo-lg">
              <img src={logo} alt="" height="17" />
            </span>
          </Link>

          <Link to="" className="logo logo-light">
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />
            </span>

            <span className="logo-lg">
              <img src={logo} alt="" height="19" />
            </span>
          </Link>
        </div>

        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>

        <div className="sidebar-background"></div>
      </div>
      {/* <div className="vertical-menu">
        <div className="logo-part">
          <Link to="" className="logo">
              <img src={logo} alt="" height="17" />
          </Link>
        </div>
      </div> */}
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => ({
  layout: state?.Layout,
});

export default connect(mapStatetoProps, {})(withRouter(Sidebar));
