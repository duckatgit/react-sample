import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import withRouter from "adminPanel/adminComponents/Common/withRouter";
import { logOutAdmin } from "Store/userAuthentication/signUpSlice";
import Avatar from "assets/images/user-icon.png";
import { useTranslation } from "react-i18next";

const ProfileMenu = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { adminProfile } = useSelector((state) => state?.auth);
  const [menu, setMenu] = useState(false);
  const [username, setusername] = useState("Admin");

  useEffect(() => {
    if (localStorage.getItem("authAdmin")) {
      const obj = JSON.parse(localStorage.getItem("authAdmin"));
      setusername(obj.firstName);
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block admin-dropdown"
      >
        <DropdownToggle
          className="btn header-item d-flex align-items-center"
          id="page-header-user-dropdown"
          tag="button"
        >
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <img
            className="avatar_image_admin"
            src={adminProfile?.profileImage || Avatar}
          />
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-end">
          <Link
            className="dropdown-item d-flex align-items-center"
            to="/admin/profile"
            onClick={() => setMenu(false)}
          >
            <i className="fas fa-user font-size-16 align-middle me-2" />
            <span className="profile_text"> {t("profile")}</span>
          </Link>
          <Link className="dropdown-item d-flex align-items-center">
            {/* <i className="fas fa-sign-out-alt font-size-16 align-middle me-2 text-danger"></i> */}
            <i className="bx bx-power-off font-size-16 align-middle me-2 text-danger" />
            <span onClick={() => dispatch(logOutAdmin())} className="profile_text">
              {t("logout")}
            </span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

export default withRouter(ProfileMenu);
