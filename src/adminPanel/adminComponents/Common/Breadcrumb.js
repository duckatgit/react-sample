import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";

const Breadcrumb = (props) => {
  const { title, breadcrumbItems } = props;
  const itemLength = breadcrumbItems?.length;

  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between pb-0 pr-2">
          <h4 className="mb-sm-0 font-size-18">{title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {breadcrumbItems.map((item, key) => (
                <BreadcrumbItem key={key} active={key + 1 === itemLength}>
                  <Link to={item.link || "#"}>{item.title}</Link>
                </BreadcrumbItem>
              ))}
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItems: PropTypes.array,
  title: PropTypes.string,
};

Breadcrumb.defaultProps = {
  breadcrumbItems: [],
};

export default Breadcrumb;
