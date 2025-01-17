import React from "react";
import { useLocation } from "react-router-dom";

import { BiEdit } from "react-icons/bi";

import ContactForm from "./contactForm";

import twitter from "assets/images/twitter.svg";
import facebook from "assets/images/facebook.svg";
import instagram from "assets/images/instagram.svg";
import linkdin from "assets/images/linkdin.svg";
import { useTranslation } from "react-i18next";

const ContactUs = ({ contactUs, contactEditToggle }) => {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="order_first pt-0">
        <div className="order_wraps">
          <div className="text-center backgrnd_imge position-relative">
            {location?.pathname === "/contact-us/edit" && (
              <div className="edithome_icon bg-dark">
                <BiEdit
                  onClick={() => contactEditToggle(true)}
                  className="text-white font-size-23"
                />
              </div>
            )}

            <h4>{contactUs?.header}</h4>
            <p> {contactUs?.subHeader}</p>
          </div>
        </div>

        <section className="my_ordres mt-3">
          <div className="container">
            <h3 className="text-center">{contactUs?.aboutCompany}</h3>
            <div className="contact_wrap cnt_us mt-5">
              <div className="row">
                <div className="col-md-6">
                  <div className="grdient_clr">
                    <div className="cnt_background">
                      <div className="contct_info">
                        <h4>{contactUs?.contactTitle}</h4>
                        <p>{contactUs?.contactSubtitle}</p>
                      </div>
                      <div className="info_wrap">
                        <div className="info_phn d-flex align-items-center mt-4">
                          <i className="fas fa-phone-alt mr-3"></i>
                          <p className="mb-0">{`+01 ${contactUs?.phoneNumber}`}</p>
                        </div>
                        <div className="info_phn d-flex align-items-center mt-4">
                          <i className="fas fa-envelope mr-3"></i>
                          <p className="mb-0">{contactUs?.email}</p>
                        </div>
                        <div className="info_phn d-flex align-items-baseline mt-4">
                          <i className="fas fa-map-marker-alt mr-3"></i>
                          <p className="mb-0">{contactUs?.address}</p>
                        </div>
                      </div>
                      <div className="social_icns mt-5">
                        <h4>{t("socialAddress")}</h4>
                        <div className="d-flex align-items-center mt-3">
                          {/* <img src={twitter} className="mr-3"/>
                          <img src={facebook} className="mr-3"/>
                          <img src={instagram} className="mr-3"/>
                          <img src={linkdin} className="mr-3"/> */}
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
                  </div>
                </div>
                <div className="col-md-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
