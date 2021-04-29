import React from "react";
import { Col } from "react-bootstrap";
import numberFormat from "../../utils/numberFormat";
import "./competitor.css";

const Competitor = ({ competitors, unit, onMouseEnter, onMouseLeave, handleSetSavingValue }) => {
  const handleOnMouseEnter = async () => {
    if (competitors.saving > 0) {
      onMouseEnter();
      handleSetSavingValue(competitors.saving)
    }
  };
  return (
    <Col
      id={competitors.name}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={onMouseLeave}
      sm={4}
      xs={6}
      className="d-flex flex-column align-items-center justify-content-center pt-2 pb-2 border border-info rounded-right rounded-left competitor-hover"
      style={{ fontSize: "0.9rem" }}
    >
      <span className="border-bottom border-primary">{competitors.name}</span>
      <span className="font-weight-bold" style={{ fontSize: "1.1rem" }}>
        {unit !== "₩"
          ? numberFormat.demicalFomat(competitors.price)
          : numberFormat.hundredFormat(competitors.price)}{" "}
        {unit}
      </span>
    </Col>
  );
};

export default Competitor;
