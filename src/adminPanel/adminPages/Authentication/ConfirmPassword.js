import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, CardBody, Card, Spinner } from "reactstrap";
import { Container, Form, Input, FormFeedback, Label } from "reactstrap";
import withRouter from "adminPanel/adminComponents/Common/withRouter";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { postConfirmPassword } from "Store/userAuthentication/thunks";

// images
import profile from "assets/images/profile-img.png";
import { toast } from "react-toastify";

const ConfirmPassword = () => {
  //meta title
  document.title = "Confirm password | Volca - Admin & Dashboard";
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location?.search);
  const token = query.get("token");

  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state?.auth
  );
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: "",
      confirmPassword: "",
      token: token,
    },

    validationSchema: Yup.object({
      password: Yup.string().required("Please enter your password"),
      confirmPassword: Yup.string().required("Please enter confirm password"),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(postConfirmPassword(values))
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
                        <h5 className="text-light pt-2">Confirm Password!</h5>
                        <p className="text-light mb-0">
                          Please Enter New password here.
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
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
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
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Confirm Password</Label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={validation.values.confirmPassword || ""}
                          placeholder="Enter confirm password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.confirmPassword &&
                            validation.errors.confirmPassword
                              ? true
                              : false
                          }
                        />
                        {validation.touched.confirmPassword &&
                        validation.errors.confirmPassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.confirmPassword}
                          </FormFeedback>
                        ) : null}
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
                            "Submit"
                          )}
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/admin/login" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Back to Login
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

export default withRouter(ConfirmPassword);

ConfirmPassword.propTypes = {
  history: PropTypes.object,
};
