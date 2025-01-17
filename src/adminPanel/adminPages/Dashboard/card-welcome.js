import React, { Component } from "react";
import { Row, Col, Card, Button } from "reactstrap";
import { Link } from "react-router-dom";

class CardWelcome extends Component {
  render() {
    const { t } = this.props;
    return (
      <Card className="">
        <Row className="welcome-board">
          <Col sm="7">
            <div className="text-primary p-3 ">
              <h5 className="text-primary text-nowrap"> {t("welcome")}</h5>
              <p className="">
                <b> {t("volca")}</b> {t("dashboard")}
              </p>
            </div>
          </Col>

          <Col
            sm="5"
            className="text-primary text-center px-3 pb-3 pt-0 pt-sm-3"
          >
            <Link to="/edit-profile" onClick={(e) => e.preventDefault()}>
              <Button color="primary" size="sm">
                {t("updateProfile")}
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default CardWelcome;
