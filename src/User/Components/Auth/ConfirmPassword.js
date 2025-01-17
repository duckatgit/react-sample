import React, { useState, useCallback } from "react";
import nProgress from "nprogress";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// Images
import Logo from "assets/images/logo.png";
import NewPassWordImage from "assets/images/create-new-password_360.png";
import Lock from "assets/images/lock.png";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

// Store
import { postConfirmPassword } from "Store/userAuthentication/thunks";
import { validate, validatePassword } from "utils/common";
import PasswordStrengthMeter from "utils/passwordStrengthMeter";
import { useNavigate } from "react-router-dom";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";

const ConfirmPassword = ({
  confirmPasswordShow,
  handleCloseModal,
  setconfirmPasswordShow,
  token,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setSsConfirmVisible] = useState(false);
  const [fields, setfields] = useState({
    password: "",
    confirmPassword: "",
    token: token,
    passwordError: false,
  });

  const { password, passwordError, confirmPassword, confirmPasswordError } =
    fields;
  const [error, setError] = useState("");
  const handleChange = useCallback(
    (name) => (evt) => {
      setError("");
      setfields((prevState) => ({
        ...prevState,
        [name]: evt.target.value,
        passwordError: false,
        confirmPasswordError: false,
      }));
    },
    []
  );

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    nProgress.configure({ showSpinner: false });
    nProgress.start();

    const isPasswordValid = validatePassword(fields.password);

    let response = validate(fields);
    if (!response.notValid && isPasswordValid) {
      if (password != confirmPassword) {
        setfields((prev) => ({ ...prev, ["confirmPasswordError"]: true }));
        return;
      }
      try {
        const formData = {
          password: fields?.password,
          confirmPassword: fields?.confirmPassword,
          token: fields?.token,
        };
        const response = await dispatch(postConfirmPassword(formData));
        if (response.meta.requestStatus === "fulfilled") {
          setconfirmPasswordShow(false);
          navigate("/");
        }
      } catch (error) {
      } finally {
        nProgress.done();
      }
    } else {
      setfields((prev) => ({
        ...prev,
        ...response,
        ["passwordError"]: !isPasswordValid,
      }));
      nProgress.done();
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const togglePasswordVisibilityConfirm = () => {
    setSsConfirmVisible((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Modal show={confirmPasswordShow} onHide={handleCloseModal}>
        <div className="login-model forgot-model mt-0">
          <AiOutlineClose onClick={handleCloseModal} className="cross" />
          <div className="modal-body">
            <div className="text-center logo-div" href="#">
              <img src={Logo} alt="" className="img-fluid" />
            </div>
            <img src={NewPassWordImage} alt="" className="forgot_image" />
            <div className="text-center">
              <h1> {t("createNewPass")} </h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group eye mb-3">
                <label> {t("enterNewPass")}</label>
                <img src={Lock} alt="" className="email img-fluid" />
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control"
                  placeholder={t("enterNewPass")}
                  value={fields?.password}
                  onChange={handleChange("password")}
                  invalid={passwordError}
                />

                <div className="eyebtnsignup">
                  {isPasswordVisible ? (
                    <AiOutlineEye onClick={togglePasswordVisibility} />
                  ) : (
                    <AiOutlineEyeInvisible onClick={togglePasswordVisibility} />
                  )}
                </div>
                {passwordError && (
                  <div className="invalid-feedback">
                    {password ? t("passValid") : t("passwordIsRequired")}
                  </div>
                )}
                {password.length > 0 && (
                  <PasswordStrengthMeter password={fields.password} />
                )}
              </div>

              <div className="form-group eye mb-4">
                <label>{t("confirmPass")} </label>
                <img src={Lock} alt="" className="email img-fluid" />
                <Input
                  type={isConfirmVisible ? "text" : "password"}
                  className="form-control"
                  placeholder={t("enterConfirmPass")}
                  value={fields?.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  invalid={confirmPasswordError}
                />
                {confirmPasswordError && (
                  <div className="invalid-feedback">
                    {confirmPassword
                      ? t("passMatchError")
                      : t("confirmPassReq")}
                  </div>
                )}

                <div className="eyebtnsignup">
                  {isConfirmVisible ? (
                    <AiOutlineEye onClick={togglePasswordVisibilityConfirm} />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={togglePasswordVisibilityConfirm}
                    />
                  )}
                </div>
                {error && (
                  <div
                    className=""
                    style={{ color: "red", fontSize: "0.70rem" }}
                  >
                    {error}
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="contact">
                  <div className="clip">
                    <div className="round"></div>
                    <button className="signup" type="submit">
                      <span>{t("submit")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmPassword;
