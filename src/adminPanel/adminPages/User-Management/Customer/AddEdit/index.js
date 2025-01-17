import React, { useCallback, useEffect, useState } from "react";

// Package Modules
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  FormText,
} from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

// Components
import Breadcrumbs from "adminPanel/adminComponents/Common/Breadcrumb";
import Dropzone from "adminPanel/adminComponents/Dropzone";

function AddEditCustomer({ addToggle, handleCloseModal }) {
  document.title = "Volca | Admin";

  const { _id } = useParams();
  const navigate = useNavigate();

  const [breadcrumbItems, setbreadcrumbItems] = useState([]);
  const [fields, setfields] = useState({
    name: "",
    role: ["user"],
    password: "",
    email: "",
    mobile_number: "",
    country_code: "",
    profile_image: "",
    status: "active",
    selectedFile: {},
  });

  useEffect(() => {
    setbreadcrumbItems([
      { link: "/admin/customer", title: "Invite" },
      { title: "Customer" },
    ]);
  }, []);

  const handleChange = useCallback(
    (name) => (evt) => {
      if (evt.label) {
        setfields((prevState) => ({
          ...prevState,
          [name]: evt,
        }));
      } else {
        setfields((prevState) => ({
          ...prevState,
          [name]: evt.target.value,
        }));
      }
    },
    []
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <React.Fragment>
      <Modal centered show={addToggle} onHide={handleCloseModal}>
        <div className="page-content py-0 px-0">
          <Container fluid className="px-0">
            <Modal.Header closeButton>
              <Modal.Title>{"Invite Customer"}</Modal.Title>
            </Modal.Header>
            {/* <Breadcrumbs title={"Customer"} /> */}

            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>{"Name"}</Label>
                        <Input
                          type="text"
                          className="form-control"
                          value={fields?.name}
                          onChange={handleChange("name")}
                          required
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label>{"Mobile Number"}</Label>
                        <Input
                          type="number"
                          className="form-control remove_scroll"
                          min={1}
                          value={fields.mobile_number}
                          onChange={handleChange("mobile_number")}
                          required
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label>{"Email"}</Label>
                        <Input
                          type="email"
                          value={fields.email}
                          onChange={handleChange("email")}
                          required
                        />
                      </FormGroup>
                    </Col>

                    {!_id && (
                      <Col md={6}>
                        <FormGroup>
                          <Label>{"Password"}</Label>
                          <Input
                            type="password"
                            value={fields.password}
                            onChange={handleChange("password")}
                            required
                          />
                        </FormGroup>
                      </Col>
                    )}

                    <Col md={12}>
                      <FormGroup>
                        <Label>{"image"}</Label>
                        <Dropzone
                          selectedFile={_id ? fields.selectedFile : null}
                          onChange={(link) =>
                            setfields((pre) => ({
                              ...pre,
                              image: link,
                            }))
                          }
                        />
                        <FormText>{"Max file size : 5mb"}</FormText>
                        <p className="image_textt">{" png, jpg, jpeg, gif"}</p>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="mt-4 d-flex flex-wrap justify-content-center">
                    <Button type="submit" color="primary" className="w-md mb-2">
                      Submit
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Container>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default AddEditCustomer;
