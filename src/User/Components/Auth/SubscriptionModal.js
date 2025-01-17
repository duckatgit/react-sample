import nProgress from "nprogress";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Form, FormGroup, Input } from "reactstrap";
import { getUsersAddresess, getUsersAddressByAdmin } from "Store/Address/thunk";
import {
  addSubscription,
  addSubscriptionByAdmin,
  getSubscriptionProduct,
} from "Store/Subscription/thunks";
import { getUsers } from "Store/Users/thunks";
import { validate } from "utils/common";
import { days, weeks, months } from "utils/constant";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

function AddSubscription({ addToggle, handleCloseModal, isUsedAdmin }) {
  const animatedComponents = makeAnimated();
  const { t } = useTranslation();
  const { subProductDatasList } = useSelector((state) => state?.subscription);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [totalSubscriptionPrice, setTotalSubscriptionPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSelect = (item) => {
    setSelectedAddress(item);

    setFields((prevFields) => ({
      ...prevFields,
      addressId: item.id,
    }));

    setDropdownVisible(false);
  };
  const { userData } = useSelector((state) => state?.users);
  const { productList } = useSelector((state) => state?.product);
  const { allAddresess } = useSelector((state) => state?.userAddress);
  const [selectedData, setSelectedData] = useState([]);

  const dispatch = useDispatch();
  const [startList, setStartList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(
    allAddresess && allAddresess.length > 0 ? allAddresess[0] : null
  );

  const colourStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      backgroundColor: state.isFocused ? "black" : "white",
      boxShadow: state.isFocused ? "0px 0px 0px black" : "0px 0px 5px #ededed",
      color: state.isFocused ? "white" : "black",
      padding: 8,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: "9",
    }),
  };

  const [fields, setFields] = useState({
    userId: "",
    productId: [],
    subproductId: [],
    quantity: [],
    cardId: 1,
    planType: "",
    planStart: "",
    subscriptionPrice: "",
    addressId: "",
    expires: null,
    type: "",
  });
  const [quantityErrors, setQuantityErrors] = useState(
    Array(fields.subproductId.length).fill(false)
  );
  const [quantities, setQuantities] = useState(
    Array(fields.subproductId.length).fill("")
  );

  const {
    userId,
    userIdError,
    productId,
    productIdError,
    subproductId,
    subproductIdError,
    quantity,
    quantityError,
    planType,
    planTypeError,
    planStart,
    planStartError,
    cardId,
    subscriptionPrice,
    subscriptionPriceError,
    addressId,
    addressIdError,
    expiresError,
    type,
  } = fields;

  const handleChange = useCallback((evt) => {
    const { value, name } = evt.target;
    if (name === "quantity") {
      if (value < 1000000) {
        setFields((prev) =>
          (value !== "" || undefined || null) && value > 0
            ? { ...prev, [name + "Error"]: false, [name]: value }
            : { ...prev, [name + "Error"]: true, [name]: value }
        );
      }
    } else {
      setFields((prev) =>
        value !== "" || undefined || null
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    }
  }, []);
  const multiHandleChange = async (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    const payload = {
      isAdmin: isUsedAdmin,
      productItem: values,
    };
    setFields({ ...fields, productId: values, productIdError: false });
    if (values.length === 0) {
      setFields((prevFields) => ({
        ...prevFields,
        subproductId: [],
      }));
      setQuantities([]);
      setSelectedData([]);
    }
    const response = await dispatch(getSubscriptionProduct(payload));
  };

  const multiHandleChangeSubProduct = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    const selectedData = selectedOptions.map((option) => option.data);
    setSelectedData(selectedData);

    setFields((prevFields) => ({
      ...prevFields,
      subproductId: values,
      subproductIdError: false,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setFields((prev) => ({ ...prev, type: event.target.value }));
  };

  const handleDateChange = (date) => {
    setFields({ ...fields, expires: date });
  };

  const handleChangeQuantity = (evt, index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = evt.target.value;

    const newFields = { ...fields };
    newFields.quantity[index] = evt.target.value; //why setting quantity in 2 different varible.

    // Update the error state for individual quantity inputs
    const newQuantityErrors = [...quantityErrors];
    newQuantityErrors[index] = !evt.target.value.trim();

    setFields(newFields);
    setQuantities(newQuantities);
    setQuantityErrors(newQuantityErrors);

    // Calculate total subscription price
    const newTotalSubscriptionPrice = newQuantities.reduce(
      (total, quantity, index) => {
        const subproduct = selectedData.find(
          (item) => item.id === fields.subproductId[index]
        );
        return total + subproduct.subscriptionPrice * quantity;
      },
      0
    );

    setTotalSubscriptionPrice(newTotalSubscriptionPrice);
  };

  const checkQuantity = () => {
    const error = [];
    for (let item in subproductId) {
      if (
        quantities[item] == null ||
        quantities[item] == undefined ||
        quantities[item] == ""
      ) {
        error.push(true);
      } else {
        error.push(false);
      }
    }
    return error;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let response = validate(fields);

    const errorResult = checkQuantity();
    const error = errorResult.some((item) => item == true);

    setQuantityErrors(errorResult);
    if (!response.notValid && !error) {
      try {
        nProgress.configure({ showSpinner: false });
        nProgress.start();
        const inputDate = new Date(fields.expires);
        let payload = {
          subProductData: subproductId,
          productId: productId[0],
          quantity: quantities.map((qty) => Number(qty)),
          type: type,
          planType: planType,
          planStart: planStart,
          cardId: 1,
          addressId: Number(addressId),
          price: Number(totalSubscriptionPrice),
        };
        if (planType == "yearly") {
          payload.planStart = inputDate;
        }
        let response;
        if (isUsedAdmin) {
          payload.userId = Number(userId);
          response = await dispatch(addSubscriptionByAdmin(payload));
        } else {
          response = await dispatch(addSubscription(payload));
        }
        if (response.meta.requestStatus === "fulfilled") {
          handleClose();
        }
      } catch (error) {
        console.log(error);
      } finally {
        nProgress.done();
      }
    } else {
      setFields(response);
    }
  };

  const handleClose = () => {
    handleCloseModal("");
    setFields({
      ...fields,
      subproductId: "",
      quantity: "",
      planType: "",
      planStart: "",
      subscriptionPrice: "",
      addressId: "",
      expires: "",
    });
  };

  useEffect(() => {
    switch (planType) {
      case "weekly":
        setStartList(weeks);
        break;
      case "monthly":
        setStartList(days);
        break;
      case "yearly":
        setStartList(months);
        break;
      default:
        setFields((prev) => ({
          ...prev,
          planStart: "empty",
        }));
    }
  }, [planType]);

  useEffect(() => {
    if (isUsedAdmin) {
      dispatch(getUsers({ role: ["user"] }));
    } else {
      dispatch(getUsersAddresess());
      setFields((prev) => ({ ...prev, userId: "none" }));
    }
    setFields((prev) => ({ ...prev, type: paymentMethod }));
  }, []);

  useEffect(() => {
    if (isUsedAdmin) {
      dispatch(getUsersAddressByAdmin({ userId }));
    }
  }, [userId]);

  useEffect(() => {
    if (allAddresess && allAddresess.length > 0) {
      setSelectedAddress(allAddresess[0]);
      setFields((prev) => ({
        ...prev,
        addressId: allAddresess[0].id,
        addressIdError: false,
      }));
    }
  }, [allAddresess]);

  const helpMessage = () => {
    if (planType === "daily") {
      return (
        <div className="orderDesc">
          The order will be placed at 12 AM everyday.
        </div>
      );
    } else if (planType === "monthly") {
      return (
        <div className="orderDesc">
          The Order will be placed at 12 AM of selected date.
        </div>
      );
    } else if (planType === "weekly") {
      return (
        <div className="orderDesc">
          The Order will be placed at 12 AM of selected day.
        </div>
      );
    } else if (planType === "yearly") {
      return (
        <div className="orderDesc">
          The Order will be placed at 12 AM of selected date.
        </div>
      );
    }
  };
  return (
    <React.Fragment>
      <Modal
        centered
        show={addToggle}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="extra"
      >
        <Modal.Header closeButton>
          <Modal.Title> {t("addNewSubscription")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              {isUsedAdmin && (
                <Col md={6}>
                  <FormGroup>
                    <label>{t("user")}</label>
                    <Input
                      id="exampleSelect"
                      name="userId"
                      className={`form-control ${
                        userIdError ? "is-invalid" : ""
                      }`}
                      value={userId}
                      type="select"
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        {t("selectUser")}
                      </option>
                      {userData?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {`${item.firstName} ${item.lastName} (${item.email})`}
                        </option>
                      ))}
                    </Input>
                    {userIdError && (
                      <div className="invalid-feedback">
                        {t("userNameRequired")}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              )}
              <Col md={6}>
                <FormGroup>
                  <div className="addsubscription">
                    <label> {t("product")}</label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      styles={colourStyles}
                      className={`form-control ${
                        productIdError ? "is-invalid" : ""
                      }`}
                      name="productId"
                      isMulti
                      options={productList?.map((item, index) => ({
                        value: item.id,
                        label: item.title,
                      }))}
                      onChange={multiHandleChange}
                    />
                    {productIdError && (
                      <div className="invalid-feedback">
                        {t("productIsRequired")}
                      </div>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <label> {t("variants")}</label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    name="varientId"
                    className={`form-control ${
                      subproductIdError ? "is-invalid" : ""
                    }`}
                    styles={colourStyles}
                    isMulti
                    options={
                      fields.productId
                        ? subProductDatasList.data?.map((item, index) => ({
                            value: item.id,
                            label: item.title,
                            data: item,
                          })) || []
                        : []
                    }
                    value={fields.productId > 0 ? undefined : ""}
                    onChange={(selectedOptions) =>
                      multiHandleChangeSubProduct(selectedOptions)
                    }
                  />
                  {subproductIdError && (
                    <div className="invalid-feedback">
                      {t("variantRequired")}
                    </div>
                  )}
                </FormGroup>
              </Col>
              {fields.subproductId &&
                fields.subproductId.map((subproductId, index) => {
                  const subproduct = selectedData.find(
                    (item) => item.id === subproductId
                  );

                  return (
                    <Col md={6} key={index}>
                      <FormGroup>
                        <label>
                          {" "}
                          {t("variant")} {index + 1}
                        </label>
                        <Input
                          type="text"
                          pattern="[0-9]*"
                          value={quantities[index]}
                          name={`quantity-${index}`}
                          className={`form-control ${
                            quantityErrors[index] ? "is-invalid" : ""
                          }`}
                          maxLength="5"
                          placeholder="Quantity"
                          onChange={(evt) => {
                            // Remove non-numeric characters
                            const sanitizedValue = evt.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            handleChangeQuantity(
                              { target: { value: sanitizedValue } },
                              index
                            );
                          }}
                          required
                        />

                        <div>
                          {t("subscriptionPrice")}:{" "}
                          {subproduct.subscriptionPrice}
                        </div>
                        {quantityErrors[index] && (
                          <div className="invalid-feedback">
                            {t("quantityIsRequired")}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  );
                })}

              <Col md={6}>
                <FormGroup>
                  <label>{t("planType")}</label>
                  <Input
                    id="exampleSelect"
                    name="planType"
                    className={`form-control ${
                      planTypeError ? "is-invalid" : ""
                    }`}
                    value={planType}
                    type="select"
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      {t("selectPlan")}
                    </option>
                    <option value="daily">{t("daily")}</option>
                    <option value="weekly">{t("Weekly")}</option>
                    <option value="monthly">{t("Monthly")}</option>
                    <option value="yearly">{t("Yearly")}</option>
                  </Input>
                  {helpMessage()}
                  {planTypeError && (
                    <div className="invalid-feedback">
                      {t("planIsRequired")}
                    </div>
                  )}
                </FormGroup>
              </Col>
              {planType && planType !== "daily" && planType !== "yearly" && (
                <Col md={6}>
                  <FormGroup>
                    <label> {t("planStartDate")}</label>
                    <Input
                      id="exampleSelect"
                      name="planStart"
                      className={`form-control ${
                        planStartError ? "is-invalid" : ""
                      }`}
                      value={planStart}
                      type="select"
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        {t("selectPlanDay")}
                      </option>
                      {startList.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Input>
                    {planTypeError && (
                      <div className="invalid-feedback">
                        {t("planStartRequired")}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              )}
              {planType === "yearly" && (
                <Col md={6}>
                  <FormGroup>
                    <label>{"Expiry Date"}</label>
                    <DatePicker
                      selected={fields.expires}
                      onChange={handleDateChange}
                      dateFormat="dd MMM yyyy"
                      placeholderText="DD/MM/YYYY"
                      autoComplete="off"
                      className={`form-control ${
                        expiresError && !fields.expires ? "is-invalid" : ""
                      }`}
                      minDate={new Date()}
                    />
                    {expiresError &&
                      !fields.expires &&
                      planType === "yearly" && (
                        <div
                          style={{
                            width: "100%",
                            marginTop: "0.25rem",
                            fontSize: "80%",
                            color: "#f46a6a",
                          }}
                        >
                          {t("dateRequired")}
                        </div>
                      )}
                  </FormGroup>
                </Col>
              )}

              {subproductId && (
                <Col md={6}>
                  <FormGroup>
                    <label> {t("subscriptionTotalPrice")}</label>
                    <Input
                      type="number"
                      className={`form-control ${
                        subscriptionPriceError ? "is-invalid" : ""
                      }`}
                      value={totalSubscriptionPrice}
                      name="subscriptionPrice"
                      onChange={handleChange}
                      disabled
                    />
                  </FormGroup>
                </Col>
              )}
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className="variants">
                  <Input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label>{t("payWithCard")}</label>
                </FormGroup>

                <FormGroup className="variants">
                  <Input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label>{t("payWithCOD")}</label>
                </FormGroup>
              </Col>
              <Col md={6}>
                {paymentMethod === "card" && (
                  <div>
                    <label htmlFor="cardNumber">{t("cardNumber")}</label>
                    <Input
                      id="exampleSelect"
                      name="cardId"
                      value={cardId}
                      type="select"
                      placeholder="Select card"
                      onChange={handleChange}
                    >
                      <option value="" defaultValue>
                        {t("selectCard")}
                      </option>
                      {[
                        /* Your card data array */
                      ].map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.unitName}
                        </option>
                      ))}
                    </Input>
                  </div>
                )}
                {paymentMethod === "cod" && <div></div>}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <label>{t("address")}</label>

                  {allAddresess && allAddresess.length > 0 ? (
                    allAddresess.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-2"
                      >
                        <FormGroup className="subscription-address">
                          <Input
                            type="radio"
                            name="selectedAddress"
                            className={`form-control ${
                              addressIdError ? "is-invalid" : ""
                            }`}
                            id={`address-${index}`}
                            value={item.id}
                            checked={selectedAddress?.id === item.id}
                            onChange={() => handleSelect(item)}
                          />
                          <label htmlFor={`address-${index}`}>
                            {item?.fullName}, {item?.phoneNumber},{" "}
                            {item?.address}, {""}
                            {item?.city},{item?.state}, {item?.country},{""}
                            {item?.pincode}
                          </label>
                        </FormGroup>
                      </div>
                    ))
                  ) : (
                    <div
                      className={addressIdError ? "address text-danger" : ""}
                    >
                      {addressIdError
                        ? t("addressValidation")
                        : t("addAddress")}
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          <Button variant="primary" onClick={handleSubmit}>
            {t("submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default AddSubscription;
