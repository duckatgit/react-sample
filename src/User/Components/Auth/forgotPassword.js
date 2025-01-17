import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import nProgress from "nprogress";
import { Input } from "reactstrap";

// Validations
import {
  validateEmail,
  validateMobileNumber,
  validateRegaxNumber,
} from "utils/common";

// Images
import Logo from "assets/images/logo.png";
import ForgotImage from "assets/images/forgot-password_360.png";
import Sms from "assets/images/sms.png";

// Store
import { postForgotPassword } from "Store/userAuthentication/thunks";
import { useTranslation } from "react-i18next";

const ForgotPassword = ({
  toggleForgotPassWord,
  settoggleForgotPassWord,
  handleCloseModal,
  setloginToggle,
  settoggleOpt,
  setnumber,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLoading, setisLoading] = useState(false);
  const [fields, setFields] = useState({
    emailOrMobile: "",
  });
  const { emailOrMobile, emailOrMobileError } = fields;

  const handleChange = useCallback(
    (name) => (evt) => {
      setFields((prevState) => ({
        ...prevState,
        [name]: evt.target.value,
        [name + "Error"]: false,
      }));
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid;
    const isNumber = validateRegaxNumber(emailOrMobile);
    if (isNumber) {
      isValid = validateMobileNumber(emailOrMobile);
    } else {
      isValid = validateEmail(emailOrMobile);
    }

    setFields((prev) => ({ ...prev, ["emailOrMobileError"]: !isValid }));

    if (isValid) {
      let payload = {};
      if (isNumber) {
        payload.mobileNumber = `+965 ${emailOrMobile}`;
      } else {
        payload.email = emailOrMobile;
      }
      try {
        setisLoading(true);
        nProgress.configure({ showSpinner: false });
        nProgress.start();

        const response = await dispatch(postForgotPassword(payload));
        if (response.meta.requestStatus === "fulfilled") {
          if (isNumber) {
            settoggleOpt(true);
            setnumber(emailOrMobile);
          }
          settoggleForgotPassWord(false);
        }
      } catch (err) {
      } finally {
        setisLoading(false);
        nProgress.done();
      }
    }
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={toggleForgotPassWord}
        onHide={() => settoggleForgotPassWord(false)}
      >
        <div className="login-model forgot-model mt-0">
          <div className="">
            <AiOutlineClose onClick={handleCloseModal} className="cross" />

            <div className="modal-body">
              <div className="text-center logo-div" href="#">
                <img src={Logo} alt="" className="img-fluid" />
              </div>
              <img alt="" src={ForgotImage} className="forgot_image" />
              <div className="text-center">
                <h1>{t("forgotPassword")}</h1>
              </div>
              <p className="fp-text mb-3 text-center">
                {t("emailUser")}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group email">
                  <label>{t("emailMobile")}</label>
                  <img src={Sms} alt="" className="email img-fluid" />
                  <Input
                    type="emailOrMobile"
                    className="form-control"
                    placeholder={t("emailOrMobile")}
                    onChange={handleChange("emailOrMobile")}
                    value={emailOrMobile}
                    invalid={emailOrMobileError}
                    // style={{ borderColor: emailOrMobileError ? "red" : "" }}
                  />
                  {emailOrMobileError && (
                    <div className="invalid-feedback">
                      {emailOrMobile
                        ? validateRegaxNumber(emailOrMobile)
                          ? t("invalidMobileNumber")
                          : t("invalidEmail")
                        : t("fieldIsRequired")}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <div className="contact">
                    <div className="clip">
                      <div className="round"></div>
                      <button type="submit" className="signup">
                        {isLoading ? (
                          <span>{t("loading")}...</span>
                        ) : (
                          <span>{t("submit")}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="login-popup mt-2">
                  <p>
                    {t("backTo")}
                    <a
                      className=""
                      onClick={() => {
                        setloginToggle(true);
                        settoggleForgotPassWord(false);
                      }}
                    >
                      <span className="login">{t("login")}</span>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ForgotPassword;
