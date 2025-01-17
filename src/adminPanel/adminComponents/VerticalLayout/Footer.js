import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row className="justify-contect-center">
            <Col className="text-center" md={12}>{new Date().getFullYear()} © Volca.</Col>
        
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
