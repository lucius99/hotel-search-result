import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import numberFormat from "../../utils/numberFormat";
import "./hotelBox.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const HotelBox = ({ unit, onBook, hotelInfo, priceInfo }) => {
  return (
    <Container>
      <Row>
        <Col sm={4} className="fill">
          <Image style={{ width: "100%" }} src={hotelInfo.photo} thumbnail />
        </Col>
        <Col sm={8}>
          <Row>
            <Col sm={9}>
              <Row>
                <Col style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  {hotelInfo.name}
                </Col>
              </Row>
              <Row className="pl-3">
                <Col
                  sm={1}
                  className="pr-1 pl-1 d-flex align-items-center justify-content-center rounded-left border font-weight-bold"
                  style={{ backgroundColor: "#fbb511", fontSize: "1.2rem" }}
                >
                  {numberFormat.starsFormat(hotelInfo.stars)}
                </Col>
                <Col
                  sm={3}
                  className="nopadding bg-dark rounded-right rounded-left d-flex justify-content-center pb-1"
                >
                  <StarRatings
                    className="d-flex align-items-center justify-content-center"
                    style={{ display: "block" }}
                    rating={hotelInfo.stars}
                    starDimension="20px"
                    starSpacing="1px"
                    starRatedColor="#f6ab3f"
                  />
                </Col>
              </Row>
              <Row className="pt-3 pb-3">
                <Col sm={1} className="pr-0">
                  <FaMapMarkerAlt size={20} className="ml-2 mt-1" />
                </Col>
                <Col
                  sm={11}
                  className="nopadding d-flex align-items-end text-primary font-weight-normal"
                  style={{ fontSize: "1.2rem" }}
                >
                  {hotelInfo.address}
                </Col>
              </Row>
              <Row>
                <Col
                  className="d-flex flex-column align-items-center pt-4"
                  style={{ fontSize: "1rem" }}
                >
                  <p>
                    Boasting 15 food and beverage options, 2 swimming pools, and
                    its own aquarium, Prince Hotel is right next to JR Shinagawa
                    Train Station, from where Haneda Airport is only a 25-minute
                    train ride away. This 39-storey hotel offers beautiful Tokyo
                    views and free WiFi throughout the entire hotel.
                  </p>{" "}
                </Col>
              </Row>
            </Col>

            <Col sm={3} className="d-flex flex-column justify-content-between">
              {/* Rating Price Button */}
              <Row>
                <Col className="d-flex align-items-center justify-content-end mr-3">
                  <span className="border bg-primary rounded-circle font-weight-bold btn-lg text-white">{hotelInfo.rating}</span>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex align-items-center justify-content-center">
                  {priceInfo && (
                    <span
                      className="border-primary"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 500,
                        borderBottom: "4px solid",
                      }}
                    >
                      {priceInfo.price} {unit}
                    </span>
                  )}
                </Col>
              </Row>
              {/* <Row>Đã bao gồm thuế</Row> */}
              <Row>
                <Col className="d-flex align-items-center justify-content-center">
                  <Button
                    variant=""
                    className="border border-primary"
                    size="lg"
                    onClick={() => console.log(priceInfo)}
                    style={{color: "black", fontWeight: "bold"}}
                  >
                    BOOK NOW
                  </Button>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelBox;
