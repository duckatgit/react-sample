import React, { useCallback, useState } from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Input } from "reactstrap";
import nProgress from "nprogress";
import * as common from "utils/common";
import Logo from "assets/images/logo.png";
import Sms from "assets/images/sms.png";
import Lock from "assets/images/lock.png";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

// Store
import { useEffect } from "react";
import {
  validate,
  validateEmail,
  validateMobileNumber,
  validatePassword,
  validateRegaxNumber,
  validateSpaceExist,
} from "utils/common";
import { postLogin, getUserProfile } from "Store/userAuthentication/thunks";
import SocialLogin from "./SocialLogin";
import { useTranslation } from "react-i18next";

const LoginModal = ({
  loginToggle,
  handleCloseModal,
  setshowRegister,
  setloginToggle,
  settoggleForgotPassWord,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoading, isSuccess } = useSelector((state) => state?.auth);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fields, setfields] = useState({
    emailOrMobile: "",
    password: "",
    emailOrMobileError: false,
    passwordError: false,
  });

  const { emailOrMobile, password, emailOrMobileError, passwordError } = fields;

  const handleChange = useCallback(
    (name) => (evt) => {
      if (!validateSpaceExist(evt.target.value)) {
        setfields((prevState) => ({
          ...prevState,
          [name]: evt.target.value,
          [name + "Error"]: false,
        }));
    removeRememberMe()   
      }
    },
    []
  );

  useEffect(() => {
    const authUser = Cookies.get("authUser");
    if (authUser) {
      const bytes = CryptoJS.AES.decrypt(
        authUser,
        process.env.REACT_APP_SECRET_KEY
      );
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setfields((prev) => ({
        ...prev,
        emailOrMobile: decryptedData.userName,
        password: decryptedData.password,
      }));
      setRememberMe(true);
    }
  }, []);

  const handleRememberMe = (evt) => {
    if (evt.target.checked) {
      const data = { userName: emailOrMobile, password: password };
      console.log("here===>2",data)
      // Encrypt
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.REACT_APP_SECRET_KEY
      ).toString();
      console.log("==========>",encrypted)

      Cookies.set("authUser", encrypted, {
        expires: 30
      });
      setRememberMe(true);
    } else {
      console.log("else")
      setRememberMe(false)
      removeRememberMe()
    }
  };

  const removeRememberMe=()=>{
    const authUser = Cookies.get("authUser");
    if (authUser) {
    Cookies.remove("authUser", {
      expires: 7,
    });
    setRememberMe(false);
    }
  }


  useEffect(() => {
    if (isSuccess) {
      setloginToggle(false);
    }
  }, [isSuccess]);

  const onUserSubmit = async (evt) => {
    evt.preventDefault();
    let isValid;
    if (validateRegaxNumber(emailOrMobile)) {
      isValid = validateMobileNumber(emailOrMobile);
    } else {
      isValid = validateEmail(emailOrMobile);
    }

    let response = validate(fields);
    setfields((prev) => ({
      ...prev,
      ...response,
      ["emailOrMobileError"]: !isValid,
      ["passwordError"]: password?.trim()?.length > 0 ? false : true,
    }));
    if (isValid && password?.trim()?.length > 0) {
      const payload = {
        password: password,
        role: "user",
      };
      const isNumber = validateRegaxNumber(emailOrMobile);
      if (isNumber) {
        payload.mobileNumber = `+965 ${emailOrMobile}`;
      } else {
        payload.email = emailOrMobile;
      }

      try {
        nProgress.configure({ showSpinner: false });
        nProgress.start();
        const response = await dispatch(postLogin(payload));
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(getUserProfile());
        }
      } catch (error) {
      } finally {
        nProgress.done();
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Modal
        className="login_modal"
        centered
        show={loginToggle}
        onHide={handleCloseModal}
      >
        <div className="login-model mt-0">
          <div className="">
            <AiOutlineClose onClick={handleCloseModal} className="cross" />

            <div className="modal-body login_wrap">
              <div className="text-center logo-div" href="#">
                <img src={Logo} alt="" className="img-fluid" />
              </div>
              <div className="text-center">
                <h1>{t("login")}</h1>
              </div>
              <form onSubmit={onUserSubmit}>
                <div className="form-group email">
                  <label>{t("emailOrMobileNumber")}</label>
                  <img src={Sms} alt="" className="email login img-fluid" />
                  <Input
                    type="emailOrMobile"
                    className="form-control"
                    placeholder={t("emailOrMobile")}
                    onChange={handleChange("emailOrMobile")}
                    value={emailOrMobile}
                    invalid={emailOrMobileError}
                    style={{ borderColor: emailOrMobileError ? "red" : "" }}
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

                <div className="form-group eye">
                  <label>{t("password")}</label>
                  <img src={Lock} alt="" className="pwd img-fluid" />
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    className="form-control password"
                    placeholder={t("enterPass")}
                    onChange={handleChange("password")}
                    value={fields?.password}
                    invalid={passwordError}
                    style={{ borderColor: passwordError ? "red" : "" }}
                  />

                  {passwordError && (
                    <div className="invalid-feedback">
                      {t("passwordIsRequired")}
                    </div>
                  )}

                  <div className="eyebtnsignup fronteye">
                    {isPasswordVisible ? (
                      <AiOutlineEye onClick={togglePasswordVisibility} />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>

                <div className="fp" data-toggle="modal" data-target="#forgot">
                  <a
                    className="pswd"
                    onClick={() => {
                      settoggleForgotPassWord(true);
                      setloginToggle(false);
                    }}
                    id="forgotpassword"
                  >
                    {t("forgotPassword")} ?
                  </a>
                  <div className="">
                    <div className="custom-control custom-checkbox d-flex align-items-center">
                      <label className="cust">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck"
                          name="example1"
                          checked={rememberMe}
                          onClick={(evt) => {
                            handleRememberMe(evt);
                          }}
                        />
                        <span className="checkmark"></span>
                        <label className="custom-control-label mb-0">
                          {t("rememberMe")}
                        </label>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-2">
                  <div className="contact">
                    <div className="clip">
                      <div className="round"></div>
                      <button type="submit" className="signup">
                        {isLoading ? (
                          <span>{t("loding")}...</span>
                        ) : (
                          <span>{t("login")}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="or-separator">
                  <div className="or-line"></div>
                  <span className="or-text">{t("or")}</span>
                </div>
                <SocialLogin handleCloseModal={handleCloseModal} />
                <div className="login-popup">
                  <p>
                    {t("dontHaveAcc")}
                    <a>
                      <span
                        className="login"
                        onClick={() => {
                          setshowRegister(true);
                          setloginToggle(false);
                        }}
                      >
                        {t("signup")}
                      </span>
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

export default LoginModal;
