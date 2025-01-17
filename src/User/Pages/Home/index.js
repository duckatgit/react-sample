import React from "react";
import { Link, useLocation } from "react-router-dom";

// React Icons
import { BiEdit } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const Home = ({ firstHomeSection, edithomeModal }) => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <section
        style={{ backgroundImage: `url(${firstHomeSection?.image})` }}
        className="banner"
      >
        {/* <video className="w-100" controls loop>
          <source src={waterFall} type="video/mp4" />
        </video> */}
        {location?.pathname === "/edit" && (
          <div className="edithome_icon bg-dark">
            <BiEdit
              onClick={() => edithomeModal(true, "section1")}
              className="text-white font-size-23"
            />
          </div>
        )}

        <div className="banner-content text-center">
          <p className="text-white">
            {firstHomeSection?.title || "Water is nothing, but life"}
          </p>

          <h1 className="text-white">
            {firstHomeSection?.subTitle ||
              "Always want safe and good water for healthy life"}
          </h1>
          <p className="text-white second">
            {firstHomeSection?.description ||
              `Nunc molestie mi nunc, nec accumsan libero dignissim sit amet.Fusce sit`}
          </p>
          <div className="contact white_theme_btn">
            <div className="clip">
              <div className="round"> </div>
              <Link to="/products"> {t("shopNow")} </Link>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
