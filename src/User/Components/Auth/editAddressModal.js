import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Col, Input, FormGroup } from "reactstrap";
import nProgress from "nprogress";
import Kuwait from "assets/images/kuwait.jpg";

// Validations
import {
  ValidateAnyStringExit,
  validate,
  validateMobileNumber,
  validateSpaceExist,
} from "utils/common";

// Store
import {
  postUserAddress,
  getUsersAddresess,
  editUserAddress,
  getAddressToView,
} from "Store/Address/thunk";
import { kuwaitstates } from "utils/constant";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EditAddressModal = ({
  toggleEditAddress,
  settoggleEditAddress,
  editAddressConfirm,
  seteditAddressConfirm,
}) => {
  const { id } = editAddressConfirm;
  const { t } = useTranslation();
  const { loading, getAddress } = useSelector((state) => state?.userAddress);
  const [fields, setfields] = useState({
    fullName: "",
    phoneNumber: "+965 ",
    alternateNumber: "+965 ",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "Kuwait",
  });
  const [altStatus, SetAltStatus] = useState(false);

  const {
    fullName,
    fullNameError,
    phoneNumber,
    phoneNumberError,
    alternateNumber,
    alternateNumberError,
    address,
    addressError,
    pincode,
    pincodeError,
    city,
    cityError,
    state,
    stateError,
    country,
    countryError,
  } = fields;

  const AltNumber = () => {
    SetAltStatus(true);
  };

  const handleChange = useCallback((evt) => {
    const { value, name } = evt.target;
    if (name == "pincode") {
      if (value?.length < 7) {
        setfields((prev) =>
          value !== "" || undefined || null
            ? { ...prev, [name + "Error"]: false, [name]: value }
            : { ...prev, [name + "Error"]: true, [name]: value }
        );
      }
    } else if (name === "phoneNumber" || name === "alternateNumber") {
      if (
        value.startsWith("+965 ") &&
        !ValidateAnyStringExit(value) &&
        !validateSpaceExist(value.slice(5))
      ) {
        setfields((prev) =>
          (value !== "" || undefined || null) &&
          validateMobileNumber(value.slice(5))
            ? { ...prev, [name + "Error"]: false, [name]: value }
            : { ...prev, [name + "Error"]: true, [name]: value }
        );
      }
    } else {
      setfields((prev) =>
        value !== "" || undefined || null
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    }
  }, []);

  const resetField = () => {
    seteditAddressConfirm({ id: "" });
    setfields((prev) => ({
      fullName: "",
      phoneNumber: "+965 ",
      alternateNumber: "+965 ",
      address: "",
      pincode: "",
      city: "",
      state: "",
    }));
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const response = validate(fields, altStatus);
    let data = {
      fullName: fields?.fullName,
      phoneNumber: fields?.phoneNumber,
      address: fields?.address,
      pincode: fields?.pincode,
      city: fields?.city,
      state: fields?.state,
      country: fields?.country,
      alternatePhoneNumber: fields?.alternateNumber,
    };

    if (!response?.notValid) {
      nProgress.configure({ showSpinner: false });
      nProgress.start();
      try {
        SetAltStatus(false);
        if (id) {
          data.addressId = id;
          const updateResposne = await dispatch(editUserAddress(data));
          if (updateResposne.meta.requestStatus === "fulfilled") {
            resetField();
            settoggleEditAddress(false);
          }
        } else {
          const addResponse = await dispatch(postUserAddress(data));
          if (addResponse.meta.requestStatus === "fulfilled") {
            resetField();
            settoggleEditAddress(false);
          }
        }
        dispatch(getUsersAddresess());
      } catch (error) {
      } finally {
        nProgress.done();
      }
    } else if (response.phoneNumberSameError) {
      toast.error("Phone number and alternate number cannot be same", {
        autoClose: 5000,
      });
    } else {
      setfields((prev) => ({ ...response }));
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressToView({ id: id }));
  }, []);

  useEffect(() => {
    if (id && getAddress) {
      setfields((prevState) => ({
        ...prevState,
        fullName: getAddress?.fullName,
        phoneNumber: getAddress?.phoneNumber ? getAddress.phoneNumber : "+965 ",
        alternateNumber: getAddress?.alternatePhoneNumber
          ? getAddress?.alternatePhoneNumber
          : `+965 `,
        address: getAddress?.address,
        pincode: getAddress?.pincode,
        city: getAddress?.city,
        state: getAddress?.state,
        country: getAddress?.country,
      }));
    }
  }, [getAddress]);

  return (
    <React.Fragment>
      <Modal
        centered
        show={toggleEditAddress}
        onHide={() => {
          settoggleEditAddress(false);
          seteditAddressConfirm({ id: null });
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> {id ? t("editAddress") : t("addAddress")}</Modal.Title>
        </Modal.Header>
        <div className="login-model">
          <div className="modal-body ">
            <form onSubmit={onSubmit}>
              <FormGroup>
                <label>{t("fullName")}</label>
                <Input
                  type="text"
                  className="form-control no-padding-left"
                  name="fullName"
                  value={fullName}
                  invalid={fullNameError}
                  maxlength="150"
                  onChange={handleChange}
                  placeholder={t("pleaseEnterFullName")}
                />
                {fullNameError && (
                  <div className="invalid-feedback">
                    {t("pleaseEnterFullName")}
                  </div>
                )}
              </FormGroup>
              <div className="row">
                <Col md={6}>
                  <FormGroup className="flag">
                    <label> {t("phoneNumber")}</label>
                    <img src={Kuwait} alt="" className="img-fluid" />
                    <Input
                      type="text"
                      maxlength="15"
                      className="form-control no-padding-left flagleft"
                      name="phoneNumber"
                      value={phoneNumber}
                      invalid={phoneNumberError}
                      onChange={handleChange}
                      placeholder={t("enterPhoneNo")}
                    />
                    {phoneNumberError && (
                      <div className="invalid-feedback">
                        {phoneNumber.length > 5
                          ? t("invalidMobileNumber")
                          : t("mobileNumberValidation")}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  {!altStatus ? (
                    <div
                      onClick={AltNumber}
                      className="address-alternate-number"
                    >
                      + {t("addAlternateNumber")}
                    </div>
                  ) : (
                    ""
                  )}
                  {altStatus ? (
                    <FormGroup className="flag">
                      <label>{t("alternateNo")}</label>
                      <img src={Kuwait} alt="" className="img-fluid" />
                      <Input
                        type="text"
                        maxlength="15"
                        className="form-control no-padding-left flagleft"
                        name="alternateNumber"
                        value={alternateNumber}
                        invalid={alternateNumberError}
                        onChange={handleChange}
                        placeholder={t("enterAlternate")}
                      />
                      {alternateNumberError && (
                        <div className="invalid-feedback">
                          {alternateNumber.length > 5
                            ? t("invalidAlternate")
                            : t("enterAlternateNum")}
                        </div>
                      )}
                    </FormGroup>
                  ) : (
                    ""
                  )}
                </Col>
              </div>
              <FormGroup>
                <label>{t("address")}</label>
                <Input
                  type="text"
                  className="form-control no-padding-left"
                  name="address"
                  value={address}
                  invalid={addressError}
                  maxlength="250"
                  onChange={handleChange}
                  placeholder={t("enterAddress")}
                  style={{ width: "100%", wordBreak: "break-word" }}
                />
                {addressError && (
                  <div className="invalid-feedback">
                    {t("pleaseEnterAddress")}
                  </div>
                )}
              </FormGroup>

              <div className="row">
                <Col md={6}>
                  <FormGroup>
                    <label> {t("city")}</label>
                    <Input
                      type="text"
                      className="form-control no-padding-left"
                      name="city"
                      value={city}
                      maxlength="40"
                      invalid={cityError}
                      onChange={handleChange}
                      placeholder={t("enterCity")}
                    />

                    {cityError && (
                      <div className="invalid-feedback">
                        {t("pleaseEnterCity")}
                      </div>
                    )}
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <label>{t("state")}</label>
                    <Input
                      type="select"
                      className="form-control no-padding-left"
                      name="state"
                      value={state}
                      invalid={stateError}
                      onChange={handleChange}
                      placeholder={t("enterState")}
                      style={{
                        padding: "0 17px 0 17px !important",
                      }}
                    >
                      <option value="" disabled>
                        {t("selectState")}
                      </option>
                      {kuwaitstates?.map((item, key) => (
                        <option key={key} value={item}>
                          {item}
                        </option>
                      ))}
                    </Input>
                    {stateError && (
                      <div className="invalid-feedback">
                        {" "}
                        {t("pleaseEnterState")}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </div>
              <div className="row">
                <Col md={6}>
                  <FormGroup>
                    <label> {t("country")}</label>
                    <Input
                      type="text"
                      className="form-control no-padding-left"
                      name="country"
                      value={country}
                      maxlength="40"
                      disabled
                      invalid={countryError}
                      onChange={handleChange}
                      placeholder={t("enterCountry")}
                    />

                    {countryError && (
                      <div className="invalid-feedback">
                        {t("pleaseEnterCountry")}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <label>{t("zipcode")}</label>
                    <Input
                      type="number"
                      className="form-control no-padding-left"
                      name="pincode"
                      value={pincode}
                      invalid={pincodeError}
                      onChange={handleChange}
                      placeholder={t("enterZipcode")}
                    />
                    {pincodeError && (
                      <div className="invalid-feedback">
                        {t("pleaseEnterZipcode")}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </div>
              <div className="text-right d-flex">
                <button
                  type="submit"
                  className="signup custombtm add btn btn-primary"
                >
                  {loading ? (
                    <span>loading...</span>
                  ) : (
                    <span>{id ? t("update") : t("submit")}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EditAddressModal;
