import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "User/Components/Header";

const UserProfile = (props) => {
  const { userProfile } = useSelector((state) => state?.auth);
  const [state, setState] = useState({ tab: "tab1" });
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    switch (true) {
      case location?.pathname.includes("profile"):
        setState({ tab: "tab1" });
        break;
      case location?.pathname.includes("change-password"):
        setState({ tab: "tab2" });
        break;
      case location?.pathname.includes("address"):
        setState({ tab: "tab3" });
        break;
      case location?.pathname.includes("subscription"):
        setState({ tab: "tab4" });
        break;
      case location?.pathname.includes("card"):
        setState({ tab: "tab5" });
        break;
      default:
        setState({ tab: "tab1" });
    }
  }, [location]);

  return (
    <React.Fragment>
      <Header />
      <div className="profile-page profile-sidebarchange">
        <div className="container-fluid">
          <div className="d-flex mx-0">
            <div className="pl-0 leftsidebar">
              <ul className="p-0">
                <li
                  className={state.tab == "tab1" ? "active_bar" : ""}
                  onClick={() => navigate("/setting/profile")}
                >
                  {t("profile")}
                </li>
                {userProfile.password && (
                  <li
                    className={state.tab == "tab2" ? "active_bar" : ""}
                    onClick={() => navigate("/setting/change-password")}
                  >
                    {t("changePassword")}
                  </li>
                )}
                <li
                  className={state.tab == "tab3" ? "active_bar" : ""}
                  onClick={() => navigate("/setting/address")}
                >
                  {t("address")}
                </li>
                <li
                  className={state.tab == "tab4" ? "active_bar" : ""}
                  onClick={() => navigate("/setting/subscription")}
                >
                  {t("subscription")}
                </li>
                <li
                  className={state.tab == "tab5" ? "active_bar" : ""}
                  onClick={() => navigate("/setting/card")}
                >
                  {t("card")}
                </li>
              </ul>
            </div>

            <div className="pl-0 rightsidebar">{props.children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
