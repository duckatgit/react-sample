import React, { useState, useCallback } from "react";
import { Form, Input } from "reactstrap";
import nProgress from "nprogress";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { sendQuery } from "Store/Settings/thunks";
import {
  ValidateAnyStringExit,
  validate,
  validateEmail,
  validateMobileNumber,
  validateSpaceExist,
} from "utils/common";
import { useTranslation } from "react-i18next";

const ContactForm = ({}) => {
  const { t } = useTranslation();
  const [fields, setFields] = useState({
    name: "",
    email: "",
    mobile: "+965 ",
    message: "",
  });

  const dispatch = useDispatch();

  const {
    name,
    nameError,
    email,
    emailError,
    mobile,
    mobileError,
    message,
    messageError,
  } = fields;

  const handleUserChange = useCallback((evt) => {
    const { value, name } = evt.target;
    if (name == "mobile") {
      if (
        value.startsWith("+965 ") &&
        !ValidateAnyStringExit(value) &&
        !validateSpaceExist(value.slice(5))
      ) {
        setFields((prev) =>
          (value !== "" || undefined || null) &&
          validateMobileNumber(value.slice(5))
            ? { ...prev, [name + "Error"]: false, [name]: value }
            : { ...prev, [name + "Error"]: true, [name]: value }
        );
      }
    } else if (name == "email") {
      setFields((prev) =>
        (value !== "" || undefined || null) && validateEmail(value)
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    } else {
      setFields((prev) =>
        value !== "" || undefined || null
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    }
  }, []);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    let response = validate(fields);
    if (!response?.notValid) {
      const data = {
        name: fields?.name,
        email: fields?.email,
        phoneNumber: fields?.mobile,
        message: fields.message,
      };
      try {
        nProgress.configure({ showSpinner: false });
        nProgress.start();
        const response = await dispatch(sendQuery(data));
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Query successfully submitted", {
            autoClose: 5000,
          });
          setFields({
            name: "",
            email: "",
            mobile: "",
            message: "",
          });
        }
      } catch (error) {
        toast.error(error, {
          autoClose: 5000,
        });
      } finally {
        nProgress.done();
      }
    } else {
      setFields((prev) => ({ ...prev, ...response }));
    }
  };

  return (
    <div className="cont_form">
      <h4 className="text-center mt-3">{t("letsTalk")}</h4>
      <div className="talk_abut">
        <div className="form-group mb-3">
          <label>{t("name")}</label>
          <Input
            type="text"
            name="name"
            className={`form-control ${nameError ? "is-invalid" : ""}`}
            placeholder={t("enterName")}
            value={name}
            maxlength="32"
            onChange={handleUserChange}
            required
          />

          {nameError && (
            <div className="invalid-feedback"> {t("NameIsRequired")}</div>
          )}
        </div>
        <div className="form-group mb-3">
          <label>{t("email")}</label>
          <Input
            type="email"
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            placeholder={t("enterEmail")}
            value={email}
            name="email"
            maxlength="32"
            onChange={handleUserChange}
            required
          />
          {emailError && (
            <div className="invalid-feedback">
              {email ? t("invalidEmail") : t("emailRequired")}
            </div>
          )}
        </div>
        <div className="form-group mb-3">
          <label>{t("mobile")}</label>
          <Input
            type="texy"
            className={`form-control ${mobileError ? "is-invalid" : ""}`}
            placeholder={t("validMobile")}
            value={mobile}
            name="mobile"
            maxlength="15"
            onChange={handleUserChange}
            required
          />
          {mobileError && (
            <div className="invalid-feedback">
              {" "}
              {mobile ? "Invalid mobile" : "Mobile is required"}
            </div>
          )}
        </div>
        <div className="form-group mb-3">
          <label>{t("message")}</label>
          <Input
            type="textarea"
            className={`form-control ${messageError ? "is-invalid" : ""}`}
            value={message}
            name="message"
            placeholder={t("enterMessage")}
            maxlength="50"
            rows="7"
            onChange={handleUserChange}
            required
          ></Input>
          {messageError && (
            <div className="invalid-feedback">{t("messageRequired")}</div>
          )}
        </div>
      </div>
      <div className="contact mt-4 text-center" onClick={onSubmit}>
        <div className="clip">
          <div className="round submit"></div>
          <a>{t("submit")}</a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
