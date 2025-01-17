import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Row, Col, Alert, Card, CardBody, Spinner } from "reactstrap";
import { Container, FormFeedback, Input, Label, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "adminPanel/adminComponents/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { postForgotPassword } from "Store/userAuthentication/thunks";

// import images
import logo from "assets/images/users/avatar-7.jpg";
import profile from "assets/images/profile-img.png";
import { toast } from "react-toastify";

const ForgetPasswordPage = (props) => {
  //meta title
  document.title = "Forget Password | Volca - Admin & Dashboard";
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state?.auth
  );

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(postForgotPassword(values))
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          console.error("Submission error:", error);
        });
    },
  });

  useEffect(() => {
    if (isError)
      toast.error(message, {
        autoClose: 5000,
      });
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess)
      toast.success(message, {
        autoClose: 5000,
      });
  }, [isSuccess, message]);

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
                      <div className="p-4">
                        <h5 className="text-light">Forgot Password!</h5>
                        <p className="text-light">
                          Enter the e-mail address you provided when creating
                          your account.
                        </p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>

                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>

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
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            disabled={isLoading}
                            className="btn btn-primary w-md "
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
                              "Submit"
                            )}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to&nbsp;
                  <Link
                    to="/admin/login"
                    className="font-weight-medium text-primary"
                  >
                    Login
                  </Link>
                </p>
                <p>© {new Date().getFullYear()} Volca.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
