import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Input } from "reactstrap";
import nProgress from "nprogress";
import { useSelector } from "react-redux";
import PasswordStrengthMeter from "utils/passwordStrengthMeter";

import Logo from "assets/images/logo.png";
import Name from "assets/images/user.png";
import Sms from "assets/images/sms.png";
import Lock from "assets/images/lock.png";
import Kuwait from "assets/images/kuwait.jpg";

import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

// Store
import { postSignUp } from "Store/userAuthentication/thunks";
import {
  ValidateAnyStringExit,
  validate,
  validateEmail,
  validateMobileNumber,
  validatePassword,
  validateSpaceExist,
} from "utils/common";
import SocialLogin from "./SocialLogin";
import { t } from "i18next";

const Register = ({
  showRegister,
  handleCloseModal,
  setloginToggle,
  setshowRegister,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fields, setfields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "+965 ",
  });

  const {
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    email,
    emailError,
    password,
    passwordError,
    mobileNumber,
    mobileNumberError,
  } = fields;

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    if (name === "confirmPassword" && !validateSpaceExist(value)) {
      setfields((prev) =>
        (value !== "" || undefined || null) && value === fields.password
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    } else if (name === "mobileNumber") {
      if (
        value.startsWith("+965 ") &&
        !ValidateAnyStringExit(value) &&
        !validateSpaceExist(value.slice(5))
      ) {
        setfields((prev) =>
          value !== "" || undefined || null
            ? { ...prev, [name + "Error"]: false, [name]: value }
            : { ...prev, [name + "Error"]: true, [name]: value }
        );
      }
    } else if (!validateSpaceExist(value)) {
      setfields((prev) =>
        value !== "" || undefined || null
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    }
  };

  const onSignupUser = async (e) => {
    e.preventDefault();
    setIsSignUpClicked(true);
    nProgress.configure({ showSpinner: false });
    nProgress.start();

    const isEmailValid = validateEmail(fields.email);
    const isPasswordValid = validatePassword(fields.password);
    const isMobileValid = validateMobileNumber(
      fields.mobileNumber.length > 4
        ? fields.mobileNumber.slice(-10)
        : fields.mobileNumber
    );

    let response = validate(fields);
    setfields((prev) => ({ ...prev, ...response }));

    if (isEmailValid && isPasswordValid && isMobileValid && isCheckboxChecked) {
      const formData = {
        firstName: fields?.firstName,
        lastName: fields?.lastName,
        email: fields?.email,
        password: fields?.password,
        mobileNumber: fields?.mobileNumber,
      };

      if (!response.notValid) {
        try {
          setIsLoading(true);
          const response = await dispatch(postSignUp(formData));
          if (response.meta.requestStatus === "fulfilled") {
            setshowRegister(false);
          }
        } catch (error) {
          toast.error(error);
        }
        setIsLoading(false);
      }
    } else {
      const updatedFields = { ...fields };
      if (firstName === "") {
        updatedFields.firstNameError = true;
      }
      if (lastName === "") {
        updatedFields.lastNameError = true;
      }
      if (!isEmailValid) {
        updatedFields.emailError = true;
      }
      if (!isPasswordValid) {
        updatedFields.passwordError = true;
      }
      if (!isMobileValid) {
        updatedFields.mobileNumberError = true;
      }
      if (!isCheckboxChecked && isSignUpClicked) {
        setIsCheckboxChecked(false);
      }
      setfields(updatedFields);
    }
    nProgress.done();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Modal
        className="signUp_popup"
        centered
        show={showRegister}
        onHide={handleCloseModal}
      >
        <div className="login-model signup-model">
          <div className="">
            <AiOutlineClose onClick={handleCloseModal} className="cross" />
            <div className="modal-body login_wrap">
              <div className="text-center logo-div" href="#">
                <img src={Logo} alt="" className="img-fluid" />
              </div>

              <div className="text-center">
                <h1>{t("signup")}</h1>
              </div>
              <form onSubmit={onSignupUser}>
                <div className="formfields">
                  <div className="row">
                    <div className="col-lg-6 p-2">
                      <div className="form-group set_name">
                        {/* <img src="../src/assets/images/user.png" className="img-fluid"></img> */}
                        <label>{t("firstName")}</label>
                        <img src={Name} alt="" className="user img-fluid" />
                        <Input
                          type="text"
                          className="form-control"
                          name="firstName"
                          maxlength="30"
                          value={firstName}
                          invalid={firstNameError}
                          // required={firstNameError}
                          onChange={handleChange}
                          placeholder={t("enterYourName")}
                        />
                        {firstNameError && (
                          <div className="invalid-feedback">
                            {t("pleaseEnterFirstName")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 p-2">
                      <div className="form-group set_name">
                        <label>{t("lastName")}</label>
                        <img src={Name} alt="" className="user img-fluid" />
                        <Input
                          type="text"
                          className="form-control"
                          name="lastName"
                          maxlength="30"
                          value={lastName}
                          invalid={lastNameError}
                          // required={lastNameError}
                          onChange={handleChange}
                          placeholder={t("enterYourName")}
                        />
                        {lastNameError && (
                          <div className="invalid-feedback">
                            {t("pleaseEnterLastName")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 p-2">
                      <div className="form-group email">
                        <label>{t("email")}</label>
                        <img
                          src={Sms}
                          alt=""
                          className="email signup img-fluid"
                        />
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={email}
                          invalid={emailError}
                          // required={emailError}
                          onChange={handleChange}
                          placeholder={t("pleaseEnterEmail")}
                        />

                        {emailError && (
                          <div className="invalid-feedback">
                            {email ? t("invalidEmail") : t("validEmail")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 p-2">
                      <div className="form-group">
                        <div className="flag">
                          <label>{t("mobileNumber")}</label>
                          {/* <i className="fas fa-phone-alt"></i> */}
                          <img src={Kuwait} alt="" className="img-fluid" />
                          <Input
                            type="text"
                            maxlength="15"
                            className="form-control signup-flagleft"
                            name="mobileNumber"
                            value={mobileNumber}
                            invalid={mobileNumberError}
                            // required={mobileNumberError}
                            onChange={handleChange}
                            placeholder={t("mobileNumber")}
                          />

                          {mobileNumberError && (
                            <div className="invalid-feedback">
                              {mobileNumber.length > 5
                                ? t("invalidMobileNumber")
                                : t("validMobile")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-2">
                      <div className="form-group eye">
                        <label>{t("password")}</label>
                        <img src={Lock} alt="" className="pwd img-fluid" />
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          className="form-control password"
                          name="password"
                          value={password}
                          maxlength="32"
                          invalid={passwordError}
                          // required={passwordError}
                          onChange={handleChange}
                          placeholder={t("password")}
                        />
                        {passwordError && (
                          <div className="invalid-feedback">
                            {password
                              ? t("passValid")
                              : t("passwordIsRequired")}
                          </div>
                        )}
                        {password.length > 0 && (
                          <PasswordStrengthMeter password={password} />
                        )}

                        <div className="eyebtnsignup frontsignup">
                          {isPasswordVisible ? (
                            <AiOutlineEye onClick={togglePasswordVisibility} />
                          ) : (
                            <AiOutlineEyeInvisible
                              onClick={togglePasswordVisibility}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="custom-control custom-checkbox d-flex align-items-center">
                    <label
                      className={`cust ${
                        !isCheckboxChecked && isSignUpClicked && "check-error"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        name="example1"
                        onChange={() =>
                          setIsCheckboxChecked(!isCheckboxChecked)
                        }
                        // required
                      />
                      <span className="checkmark"></span>
                      <label className="custom-control-label term_privacy mb-0">
                        {t("policy")}
                      </label>
                    </label>
                  </div>
                  {!isCheckboxChecked && isSignUpClicked && (
                    <div
                      className="text-danger mt-1"
                      style={{ fontSize: "0.70rem", paddingBottom: "12px" }}
                    >
                      {t("pleaseAgreeToPrivacyPolicy")}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <div className="contact">
                    <div className="clip">
                      <div className="round"></div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="signup"
                      >
                        <span>
                          {isLoading ? `${t("loading")}...` : t("signup")}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="or-separator">
                  <div className="or-line"></div>
                  <span className="or-text">{t("or")}</span>
                </div>
                <SocialLogin
                  handleCloseModal={handleCloseModal}
                  isSignUp={true}
                />
                <div className="signup-popup text-center mt-2 ">
                  <p>
                    {t("alreadySigned")}
                    <a>
                      <span
                        className=""
                        onClick={() => {
                          setshowRegister(false);
                          setloginToggle(true);
                        }}
                      >
                        {t("login")}
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

export default Register;
