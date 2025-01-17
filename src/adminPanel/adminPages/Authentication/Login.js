import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, CardBody, Card, Alert, Spinner } from "reactstrap";
import { Container, Form, Input, FormFeedback, Label } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import withRouter from "adminPanel/adminComponents/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import {
  getAdminProfile,
  getUserProfile,
  postAdminLogin,
} from "Store/userAuthentication/thunks";

// images
import profile from "assets/images/profile-img.png";
import { toast } from "react-toastify";

import { FaLock } from "react-icons/fa6";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Login = (props) => {
  //meta title
  document.title = "Volca | Admin";

  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state?.auth
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      role: "admin",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),

    onSubmit: async (values) => {
      const response = await dispatch(postAdminLogin(values));
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(getAdminProfile());
      }
    },
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 5000,
      });
    } else if (isSuccess) {
      toast.success(message, {
        autoClose: 5000,
      });
    }
  }, [isError, isSuccess]);

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-light pt-2"> Welcome Back !</h5>
                        <p className="text-light mb-0">
                          Sign in to continue to Volca.
                        </p>
                      </div>
                    </Col>

                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>

                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Enter password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                        <div className="eyebtnsignup login_eye">
                          {isPasswordVisible ? (
                            <AiOutlineEye onClick={togglePasswordVisibility} />
                          ) : (
                            <AiOutlineEyeInvisible
                              onClick={togglePasswordVisibility}
                            />
                          )}
                        </div>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          disabled={isLoading}
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          {isLoading ? (
                            <div className="spinner">
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className=""> loading...</span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link
                          to="/admin/forgot-password"
                          className="text-muted d-flex align-items-center justify-content-center"
                        >
                          {/* <i className="mdi mdi-lock me-1" /> */}
                          <FaLock className="me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
