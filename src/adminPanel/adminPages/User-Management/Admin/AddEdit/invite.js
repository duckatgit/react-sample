import React, { useCallback, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { sendInvite } from "Store/Users/thunks";
import { validate, validateEmail } from "utils/common";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function Invite({ addToggle, handleCloseModal }) {
  const { t } = useTranslation();
  const [fields, setFields] = useState({
    email: "",
    type: "admin",
  });

  const { email, emailError, type, typeError } = fields;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleUserChange = useCallback((evt) => {
    const { value, name } = evt.target;
    if (name == "email") {
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Validate email
    const isValidEmail = validateEmail(email);
    let response = validate(fields);

    if (!response.notValid) {
      setIsLoading(true);
      dispatch(sendInvite({ email, type })).then((resultAction) => {
        if (sendInvite.fulfilled.match(resultAction)) {
          setFields({ email: "", emailError: "" });
          handleCloseModal("");
        }
        setIsLoading(false);
      });
    } else {
      setFields((prev) => ({
        ...prev,
        ...response,
        emailError: !isValidEmail,
      }));
    }
  };

  const handleClose = () => {
    handleCloseModal("");
    setFields({
      email: "",
      emailError: "",
    });
  };
  const modalStyle = {
    maxWidth: "400px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <React.Fragment>
      <Modal
        centered
        show={addToggle}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title> {t("invite")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <label>{t("email")}</label>
                  <Input
                    type="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    value={email}
                    name="email"
                    maxLength="32"
                    placeholder={t("email")}
                    onChange={handleUserChange}
                    required
                  />
                  {emailError && (
                    <div className="invalid-feedback">
                      {email ? t("invalidEmail") : t("emailRequired")}
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <label>{t("role")}</label>
                  <Input
                    id="exampleSelect"
                    name="type"
                    className={`form-control ${typeError ? "is-invalid" : ""}`}
                    value={type}
                    type="select"
                    onChange={handleUserChange}
                  >
                    <option value="admin">{t("admin")}</option>
                    <option value="finance">{t("finance")}</option>
                    <option value="business">{t("business")}</option>
                  </Input>
                  {typeError && (
                    <div className="invalid-feedback">Type is required</div>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? t("sendingInvitation") : t("sendInvitation")}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
}

export default Invite;
