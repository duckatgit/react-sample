import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import nProgress from "nprogress";
import { Input } from "reactstrap";

// Images
import Logo from "assets/images/logo.png";
import otpImage from "assets/images/Otp.png";
import otpIcon from "assets/images/password.png";

// Store
import { postForgotPassword, verifyOtp } from "Store/userAuthentication/thunks";
import { useTranslation } from "react-i18next";

const ConfirmOtp = ({
  toggleOpt,
  settoggleOpt,
  handleCloseModal,
  setloginToggle,
  number,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [count, setCount] = useState(45);
  const [fields, setFields] = useState({
    otp: "",
  });
  const { otp, otpError } = fields;

  const handleChange = useCallback((evt) => {
    const { value, name } = evt.target;
    if (value.length < 7) {
      setFields((prev) =>
        value !== "" || undefined || (null && value > 0)
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    }
  }, []);

  const countdown = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(countdown, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [count]);

  const sendAgain = async () => {
    try {
      const payload = {
        mobileNumber: `+965 ${number}`,
      };
      const response = await dispatch(postForgotPassword(payload));
      if (response.meta.requestStatus === "fulfilled") {
        setCount(45);
      }
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp) {
      let payload = {
        otp,
      };
      nProgress.configure({ showSpinner: false });
      try {
        nProgress.start();
        const response = await dispatch(verifyOtp(payload));
        if (response.meta.requestStatus === "fulfilled") {
          settoggleOpt(false);
        }
      } catch (err) {
      } finally {
        nProgress.done();
      }
    } else {
      setFields((prev) => ({ ...prev, ["otpError"]: true }));
    }
  };

  return (
    <React.Fragment>
      <Modal centered show={toggleOpt} onHide={() => handleCloseModal()}>
        <div className="login-model mt-0">
          <div className="">
            <AiOutlineClose onClick={handleCloseModal} className="cross" />

            <div className="modal-body">
              <div className="text-center logo-div" href="#">
                <img src={Logo} alt="" className="img-fluid" />
              </div>
              <img alt="" src={otpImage} className="forgot_image" />
              <div className="text-center">
                <h1>{t("otpVarify")}</h1>
              </div>
              <p className="text-center">{`${t("sendOtpNum")} ${number}.`}</p>
              {count === 0 ? (
                <p
                  className="resend-otp text-center"
                  onClick={() => sendAgain()}
                >
                  {t("resendCode")}
                </p>
              ) : (
                <p className="color-green">{`00:${
                  count < 10 ? "0" : ""
                }${count} sec`}</p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group email">
                  <label> {t("otp")}</label>
                  <img
                    src={otpIcon}
                    alt=""
                    className="email img-fluid less-opacity"
                  />
                  <Input
                    type="number"
                    name="otp"
                    className="form-control"
                    placeholder={t("enterOtp")}
                    onChange={handleChange}
                    value={otp}
                    invalid={otpError}
                    // style={{ borderColor: emailOrMobileError ? "red" : "" }}
                  />
                  {otpError && (
                    <div className="invalid-feedback">{t("otpReq")}</div>
                  )}
                </div>

                <div className="text-center">
                  <div className="contact">
                    <div className="clip">
                      <div className="round"></div>
                      <button type="submit" className="signup">
                        {<span>{t("verify")}</span>}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="back-otp d-flex align-items-center justify-content-center">
                  <p className="m-0">{t("backTo")} &nbsp;</p>
                  <a
                    className="fp"
                    onClick={() => {
                      setloginToggle(true);
                      settoggleOpt(false);
                    }}
                  >
                    {t("login")}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmOtp;
