import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Input } from "reactstrap";

// Images & Icons
import WhiteLogo from "assets/images/white-logo.png";
import FooterBottle from "assets/images/footer_bottle.png";
import { useTranslation } from "react-i18next";

import { validateEmail } from "utils/common";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [fields, setFields] = useState({
    email: "",
  });

  const { email, emailError } = fields;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFields((prev) =>
      value !== "" || undefined || null
        ? { ...prev, [name]: value, [name + "Error"]: false }
        : { ...prev, [name]: value, [name + "Error"]: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateEmail(email);
    setFields((prev) => ({ ...prev, emailError: !isValid }));
  };

  return (
    <React.Fragment>
      <footer>
        <div className="">
          <div className="footer-waves">
            <div className="wvs_set">
              <svg
                className="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
              >
                <defs>
                  <path
                    id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                  />
                </defs>
                <g className="parallax">
                  <use
                    xlinkHref="#gentle-wave"
                    x="48"
                    y="0"
                    fill="rgba(0,0,0,0.3)"
                  />
                  <use
                    xlinkHref="#gentle-wave"
                    x="48"
                    y="3"
                    fill="rgba(0,0,0,0.1)"
                  />
                  <use
                    xlinkHref="#gentle-wave"
                    x="48"
                    y="5"
                    fill="rgba(0,0,0,0.4)"
                  />
                  <use
                    xlinkHref="#gentle-wave"
                    x="48"
                    y="7"
                    fill="rgba(0,0,0,0.2)"
                  />
                </g>
              </svg>
            </div>
            <div className="psn_set">
              <svg
                className="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
              >
                <defs>
                  <path
                    id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                  />
                </defs>
                <g className="parallax">
                  <use xlinkHref="#gentle-wave" x="48" y="0" fill="#060707" />
                </g>
              </svg>
            </div>
          </div>
          <div className="footer_image">
            <img src={FooterBottle} alt="" className="img-fluid" />
          </div>
          <div className="mrgn_set remove_container">
            <div className="row bottom-part">
              <div className="col-md-12">
                <div className="footer-box d-flex flex-column align-items-center justify-content-center">
                  <img src={WhiteLogo} alt="" className="img-fluid" />
                  <p className="data">
                    Lorem ipsum is a placeholder text commonly used to
                    demonstrate the visual form of a document or a typeface
                    without relying
                  </p>
                  <div className="social-icons">
                    <a href="">
                      <i className="fab fa-twitter"> </i>
                    </a>
                    <a href="">
                      <i className="fab fa-facebook-f"> </i>
                    </a>
                    <a href="">
                      <i className="fab fa-instagram"> </i>
                    </a>
                    <a href="">
                      <i className="fab fa-linkedin"> </i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="footer-box third">
                  <ul>
                    <li>
                      <a href="#f"> {t("TermsOfService")} </a>
                    </li>
                    <li>
                      <a href="#h"> {t("privacyPolicy")}</a>
                    </li>
                    <li>
                      <a onClick={() => navigate("/contact-us")}>
                        {" "}
                        {t("contactUs")}{" "}
                      </a>
                    </li>
                    <li>
                      <Link to="/about-us">{t("aboutUs")} </Link>
                    </li>
                    <li>
                      <Link to="/products"> {t("products")} </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="mrgn-set" />
            <div className="copyright">
              <p className="text-center mb-0">{t("copyright")}</p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
