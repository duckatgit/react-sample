import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import { validate } from "utils/common";
import { editDeliveryCharge, getAllSetting } from "Store/Settings/thunks";
import { useTranslation } from "react-i18next";

function EditPopUp({ addToggle, handleCloseModal, editId, currentAmount }) {
  document.title = "Volca | Admin";
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    amount: "",
  });

  const { amount, amountError } = fields;

  useEffect(() => {
    if (editId) {
      setFields({
        amount: currentAmount,
      });
    }
  }, [editId]);

  const handleChange = useCallback((evt) => {
    const { value, name } = evt.target;
    if (value.length < 10000) {
      setFields((prev) =>
        (value !== "" || undefined || null) && value > 0
          ? { ...prev, [name + "Error"]: false, [name]: value }
          : { ...prev, [name + "Error"]: true, [name]: value }
      );
    }
  }, []);

  // In your handleSubmit function
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let response = validate(fields);
    setFields(response);

    if (!response.notValid) {
      try {
        const payload = {
          chargeId: Number(editId),
          amount: Number(amount),
        };
        const response = await dispatch(editDeliveryCharge(payload));
        if (response.meta.requestStatus === "fulfilled")
          toast.success("Fee updated successfully", {
            autoClose: 5000,
          });
        dispatch(getAllSetting());
        handleClose();
      } catch (error) {
        toast.error(error, {
          autoClose: 5000,
        });
      }
    }
  };

  const handleClose = () => {
    handleCloseModal(false, "");
    setFields({
      amount: "",
    });
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={addToggle}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("update")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <label> {t("deliveryFee")}</label>
                  <Input
                    type="text"
                    pattern="[0-9]*"
                    className={`form-control ${
                      amountError ? "is-invalid" : ""
                    }`}
                    name="amount"
                    value={amount}
                    maxLength="6"
                    placeholder={t("deliveryFee")}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      handleChange({
                        target: { name: "amount", value: numericValue },
                      });
                    }}
                    required
                  />

                  {amountError && (
                    <div className="invalid-feedback">
                      {amount ? t("invalidAmount") : t("amountRequired")}
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            {t("update")}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default EditPopUp;
