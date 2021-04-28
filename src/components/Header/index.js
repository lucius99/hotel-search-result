import React from "react";
import "./header.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { GrCurrency } from "react-icons/gr";

const Header = ({ currency, onSelectCurrency }) => {
  return (
    <Container>
      <Row>
        <Col>
          <header className="header">
            <h1>Hotel Result</h1>
          </header>
        </Col>

        <Col className="d-flex justify-content-end align-items-center">
          <GrCurrency size={25} className="mb-3 mr-2" />
          <Form.Group>
            <Form.Control
              as="select"
              defaultValue={currency}
              onChange={(e) => onSelectCurrency(e)}
            >
              <option>USD</option>
              <option>SGD</option>
              <option>CNY</option>
              <option>KRW</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;