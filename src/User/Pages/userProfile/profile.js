import React, { useState, useEffect, useCallback } from "react";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import nProgress from "nprogress";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfile,
  getAdminProfile,
  getUserProfile,
  updateProfileImage,
} from "Store/userAuthentication/thunks";
import Avatar from "assets/images/user-icon.png";
import * as ACTION from "Store/userAuthentication/signUpSlice";
import {
  ValidateAnyStringExit,
  validate,
  validateEmail,
  validateMobileNumber,
  validateSpaceExist,
} from "utils/common";
import "../../../assets/scss/custom/components/_profile.scss";
import ImageCropper from "./imageCropper";
import Kuwait from "assets/images/kuwait.jpg";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userProfile, adminProfile, isEditError, isEditSuccess, message } =
    useSelector((state) => state?.auth);
    
  const isUsedForAdmin = location.pathname.includes("admin");

  const [ImagePreview, setImagePreview] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [fields, setfields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    image: "",
  });
  const [cropImage, setCropImage] = useState("");
  const {
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    email,
    emailError,
    mobileNumber,
    mobileNumberError,
    image,
    imageError,
  } = fields;

  const handleClose = () => {
    setIsCropperOpen(false);
  };

  useEffect(() => {
    if (isUsedForAdmin && adminProfile) {
      setfields((prevState) => ({
        ...prevState,
        ...adminProfile,
        mobileNumber:
          adminProfile?.mobileNumber?.length > 0
            ? adminProfile?.mobileNumber
            : `+965 `,
        image: adminProfile?.profileImage,
      }));
    } else if (userProfile) {
      setfields((prevState) => ({
        ...prevState,
        ...userProfile,
        mobileNumber:
          userProfile?.mobileNumber?.length > 0
            ? userProfile?.mobileNumber
            : `+965 `,
        image: userProfile?.profileImage,
      }));
    }
  }, [userProfile, adminProfile]);

  useEffect(() => {
    if (isUsedForAdmin) {
      dispatch(getAdminProfile());
    } else {
      dispatch(getUserProfile());
    }
  }, []);

  useEffect(() => {
    if (isEditSuccess) {
      toast.success(message, {
        autoClose: 5000,
      });
      if (isUsedForAdmin) {
        dispatch(getAdminProfile());
      } else {
        dispatch(getUserProfile());
      }
    } else if (isEditError) {
      toast.error(message, {
        autoClose: 5000,
      });
    }
    dispatch(ACTION.reset());
  }, [isEditSuccess, isEditError]);

  const handleImageChange = (event) => {
    event.preventDefault();
    const fileInput = event.target;
    const file = fileInput?.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setCropImage(file);
      setIsCropperOpen(true);
    }
    fileInput.value = null;
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    nProgress.configure({ showSpinner: false });
    nProgress.start();

    const response = validate(fields);

    const isMobileValid = validateMobileNumber(
      fields.mobileNumber.length > 4
        ? fields.mobileNumber.slice(-10)
        : fields.mobileNumber
    );

    if (!isMobileValid) {
      response.mobileNumberError = true;
    }

    const payload = {
      firstName: fields?.firstName,
      lastName: fields?.lastName,
      email: fields?.email,
      mobileNumber: fields?.mobileNumber,
    };

    if (
      !response.firstNameError &&
      !response.lastNameError &&
      !response.emailError &&
      !response.mobileNumberError
    ) {
      try {
        await dispatch(editUserProfile({ payload, isUsedForAdmin }));
      } catch (error) {
      } finally {
        nProgress.done();
      }
    } else {
      nProgress.done();
      setfields((prev) => ({
        ...prev,
        ...response,
      }));
    }
  };
  const handleChange = useCallback((evt) => {
    const { value, name } = evt.target;
    if (name === "mobileNumber") {
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
    } else if (name === "firstName") {
      // Capitalize the first letter of the input value
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setfields((prev) =>
        capitalizedValue !== "" || undefined || null
          ? { ...prev, [name + "Error"]: false, [name]: capitalizedValue }
          : { ...prev, [name + "Error"]: true, [name]: capitalizedValue }
      );
    } else if (name === "email") {
      setfields((prev) =>
        (value !== "" || undefined || null) && validateEmail(value)
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    } else if (!validateSpaceExist(value)) {
      setfields((prev) =>
        value !== "" || undefined || null
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    }
  }, []);

  const callToUpload = async (actualfile) => {
    try {
      nProgress.configure({ showSpinner: false });
      nProgress.start();
      actualfile.name = `cropImage.name ${Date.now()}`;
      actualfile.lastModified = cropImage.lastModified;
      actualfile.lastModifiedDate = cropImage.lastModifiedDate;
      const payload = new FormData();
      payload.append("image", actualfile);

      const response = await dispatch(
        updateProfileImage({ payload, isUsedForAdmin })
      );
      if (response.meta.requestStatus === "fulfilled") {
        handleClose();
      }
    } catch (err) {
      console.log(err);
    } finally {
      nProgress.done();
    }
  };
  return (
    <React.Fragment>
      <div className="row mx-0">
        <div className="col-lg-8 p-2">
          <section className="upper-details Profile_details">
            <h3 className="profile-title">{t("profileDetails")}</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group flag">
                <div className="row">
                  <div className="col-md-6">
                    <label>{t("firstName")}</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={firstName}
                      invalid={firstNameError}
                      maxLength={30}
                      onChange={handleChange}
                      placeholder={t("firstName")}
                    />
                    {firstNameError && (
                      <div className="invalid-feedback">
                        {t("pleaseEnterFirstName")}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label>{t("lastName")}</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={lastName}
                      maxLength={30}
                      invalid={lastNameError}
                      onChange={handleChange}
                      placeholder={t("lastName")}
                    />
                    {lastNameError && (
                      <div className="invalid-feedback">
                        {t("pleaseEnterLastName")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row" style={{ paddingTop: "12px" }}>
                  <div className="col-md-6">
                    <label>{t("email")}</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      invalid={emailError}
                      onChange={handleChange}
                      disabled
                      placeholder="example@email.com"
                    />
                    {emailError && (
                      <div className="invalid-feedback">
                        {email ? "Invalid email" : t("pleaseEnterEmail")}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="flag">
                      <label> {t("mobileNumber")}</label>
                      <img src={Kuwait} alt="" className="img-fluid" />
                      <Input
                        type="text"
                        maxlength="15"
                        className="form-control flagleft"
                        name="mobileNumber"
                        value={mobileNumber}
                        invalid={mobileNumberError}
                        onChange={handleChange}
                        placeholder="8246312366"
                      />

                      {mobileNumberError && (
                        <div className="invalid-feedback">
                          {mobileNumber.length > 5
                            ? t("invalidMobileNumber")
                            : t("mobileNumberValidation")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-left mt-4">
                {/* <button type="submit" className="signup edithome_popup">
                  Submit
                </button> */}
                <div className="contact">
                  <div className="clip p-0" onClick={onSubmit}>
                    <div className="round"></div>
                    <Link>{t("submit")}</Link>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
        <div className="col-lg-4 pl-5 p-2">
          <div className="uploded-image upload_profile_image">
            <div className="text-center user_image_cs py-4">
              <img
                className="img-fluid upload-user-image"
                src={image || Avatar}
                alt=""
              />
            </div>

            <div className="form-group mt-1 mb-3 text-center">
              <label
                htmlFor="profile"
                className={`custom-file-upload customlabel ${
                  imageError && "invalid"
                }`}
              >
                <div className="usewr-imghere">
                  <Input
                    type="file"
                    accept="image/*"
                    className="form-control d-none"
                    id="profile"
                    invalid={imageError}
                    onChange={(event) => handleImageChange(event)}
                  />

                  <p className="mb-0 upload_icn">
                    <span className="me-2">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span>{t("uploadYourImage")}</span>
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
        {isCropperOpen && (
          <ImageCropper
            isOpen={isCropperOpen}
            callToUpload={callToUpload}
            image={ImagePreview}
            close={handleClose}
            t={t}
          ></ImageCropper>
        )}
      </div>
    </React.Fragment>
  );
};

export default Profile;
