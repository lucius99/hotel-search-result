import React from "react";
import "./header.css";
import { Container, Row, Col, Form, Navbar } from "react-bootstrap";
import { GrCurrency } from "react-icons/gr";


const Header = ({ currency, onSelectCurrency }) => {
  return (
    <Container className="p-1 bg-white border-dark" style={{ position: "sticky", top: 0.5, zIndex: 99, border: "3px solid" }}>
      <Row>
        <Col>
          <header className="header">
            <h1>Hotel Result</h1>
          </header>
        </Col>

        <Col className="d-flex justify-content-end align-items-center">
          <GrCurrency size={25} className="mb-3 mr-2" />
          <Form.Group className="border">
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
