import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import nProgress from "nprogress";
import { changePassword } from "Store/userAuthentication/thunks";
import { validate, validatePassword } from "utils/common";
import * as ACTION from "Store/userAuthentication/signUpSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const ChangePassword = ({ closePopUp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userProfile, isEditError, isEditSuccess, message } = useSelector(
    (state) => state?.auth
  );
  const [changePasswordFields, setchangePasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);
  const isUsedForAdmin = location.pathname.includes("admin");

  const {
    currentPassword,
    currentPasswordError,
    newPassword,
    newPasswordError,
    confirmPassword,
    confirmPasswordError,
  } = changePasswordFields;

  const handleChangePassword = useCallback((evt) => {
    const { value, name } = evt.target;
    setchangePasswordFields((prev) =>
      value !== "" || undefined || null
        ? { ...prev, [name + "Error"]: false, [name]: value }
        : { ...prev, [name + "Error"]: true, [name]: value }
    );
  }, []);

  const handleChangepasswordSubmit = async (evt) => {
    evt.preventDefault();
    nProgress.configure({ showSpinner: false });
    nProgress.start();

    const response = validate(changePasswordFields);

    if (!validatePassword(changePasswordFields?.newPassword)) {
      setchangePasswordFields((prev) => ({
        ...prev,
        ["newPasswordError"]: true,
      }));
      nProgress.done();
      return;
    }

    const payload = {
      currentPassword: changePasswordFields?.currentPassword,
      newPassword: changePasswordFields?.newPassword,
    };

    if (response?.notValid) {
      setchangePasswordFields((prev) => ({
        ...prev,
        ...response,
      }));
      nProgress.done();
      return;
    }

    if (newPassword != confirmPassword) {
      setchangePasswordFields((prev) => ({
        ...prev,
        ["confirmPasswordError"]: true,
      }));
      nProgress.done();
      return;
    }

    try {
      const response = await dispatch(
        changePassword({ payload, isUsedForAdmin })
      );
      if (isUsedForAdmin && response.meta.requestStatus === "fulfilled") {
        dispatch(ACTION.logOutAdmin());
        closePopUp();
      }
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible((prev) => !prev);
  };
  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prev) => !prev);
  };
  const toggleConfirmNewPasswordVisibility = () => {
    setIsConfirmNewPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
  if (!isUsedForAdmin) {
  if (!userProfile?.password) {
  navigate("/setting/profile");
  }
    }
  }, []);

  useEffect(() => {
    if (!isUsedForAdmin) {
      if (isEditSuccess) {
        toast.success(message, {
          autoClose: 5000,
        });
      } else if (isEditError) {
        toast.error(message, {
          autoClose: 5000,
        });
      }
      dispatch(ACTION.reset());
    }
  }, [isEditSuccess, isEditError]);

  return (
    <React.Fragment>
      <div className="row mx-0 cp">
        <div className={`col-md-${isUsedForAdmin ? 12 : 12}`}>
          <section
            className={`upper-details ${
              !isUsedForAdmin ? "Profile_details" : "Admin_details"
            }`}
          >
            {!isUsedForAdmin && (
              <h3 className="profile-title">{t("changeYourPassword")}</h3>
            )}
            <form onSubmit={handleChangepasswordSubmit}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label> {t("currentPass")}</label>
                    <Input
                      type={isCurrentPasswordVisible ? "text" : "password"}
                      className="form-control"
                      name="currentPassword"
                      value={currentPassword}
                      invalid={currentPasswordError}
                      onChange={handleChangePassword}
                      placeholder={t("currentPass")}
                    />
                    <div className="eyebtnsignup profile-eye">
                      {isCurrentPasswordVisible ? (
                        <AiOutlineEye
                          onClick={toggleCurrentPasswordVisibility}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={toggleCurrentPasswordVisibility}
                        />
                      )}
                    </div>
                    {currentPasswordError && (
                      <div className="invalid-feedback">
                        {t("currPassError")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <label> {t("newPass")}</label>
                    <Input
                      type={isNewPasswordVisible ? "text" : "password"}
                      className="form-control"
                      name="newPassword"
                      value={newPassword}
                      invalid={newPasswordError}
                      onChange={handleChangePassword}
                      placeholder={t("newPass")}
                    />
                    <div className="eyebtnsignup profile-eye">
                      {isNewPasswordVisible ? (
                        <AiOutlineEye onClick={toggleNewPasswordVisibility} />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={toggleNewPasswordVisibility}
                        />
                      )}
                    </div>

                    {newPasswordError && (
                      <div className="invalid-feedback">
                        {newPassword ? t("passmustbe") : t("newPassRequire")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <label>{t("confirmPass")}</label>
                    <Input
                      type={isConfirmNewPasswordVisible ? "text" : "password"}
                      className="form-control"
                      name="confirmPassword"
                      value={confirmPassword}
                      invalid={confirmPasswordError}
                      onChange={handleChangePassword}
                      placeholder={t("confirmPass")}
                    />
                    <div className="eyebtnsignup profile-eye">
                      {isConfirmNewPasswordVisible ? (
                        <AiOutlineEye
                          onClick={toggleConfirmNewPasswordVisibility}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={toggleConfirmNewPasswordVisibility}
                        />
                      )}
                    </div>

                    {confirmPasswordError && (
                      <div className="invalid-feedback">
                        {confirmPassword
                          ? t("passMatchError")
                          : t("passwordIsRequired")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div
                    className="text-right d-flex"
                    onClick={handleChangepasswordSubmit}
                  >
                    <div className="contact cp">
                      <a href="#a"> {t("submit")}</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePassword;
