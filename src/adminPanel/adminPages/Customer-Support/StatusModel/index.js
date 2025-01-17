import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";

import { editIssue } from "Store/Customer-Support/thunks";
import { validate } from "utils/common";

function StatusModel({ addToggle, handleCloseModal, editId, editStatus }) {
  const { issueList } = useSelector((state) => state?.issue);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [fields, setFields] = useState({
    status: "",
    issueId: "",
  });

  const { status, statusError } = fields;

  useEffect(() => {
    setFields((prevFields) => ({
      ...prevFields,
      issueId: editId,
      status: editStatus,
    }));
  }, [editId, editStatus, issueList]);

  const handleTypeChange = (e) => {
    setFields({ ...fields, status: e.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let response = validate(fields);
    setFields(response);
    // const payload = {
    //   status: fields.status,
    // };

    if (!response.notValid) {
      const payload = {
        issueId: fields.issueId,
        status: fields.status,
      };

      if (editId) {
        handleCloseModal("Status updated successfully");
        dispatch(editIssue(payload));
        setFields({
          status: "",
          issueId: "",
        });
      }
    }
  };

  const handleClose = () => {
    handleCloseModal("");
    setFields({
      ...fields,
      status: "",
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
          <Modal.Title>{t("changeStatus")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <label>{t("status")}</label>
                  <Input
                    type="select"
                    className={`form-control ${
                      statusError ? "is-invalid" : ""
                    }`}
                    name="status"
                    value={fields.status}
                    onChange={handleTypeChange}
                  >
                    <option value="raised">{t("raised")}</option>
                    <option value="resolved">{t("resolved")}</option>
                    <option value="cancelled">{t("cancelled")}</option>
                  </Input>
                  {/* {statusError && (
                    <div className="invalid-feedback">Status is required</div>
                  )} */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            {editId ? t("update") : t("submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default StatusModel;
