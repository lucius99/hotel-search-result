import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  Accordion,
} from "react-bootstrap";
import { Collapse } from "react-collapse";
import { FaMapMarkerAlt } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import numberFormat from "../../utils/numberFormat";
import "./hotelBox.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import parse from "html-react-parser";

const HotelBox = ({ unit, onBook, hotelInfo, priceInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container className="bg-white mb-4 mt-4">
      <Row>
        <Col sm={4} className="fill">
          <Image
            style={{ width: "100%", height: "100%" }}
            src={hotelInfo.photo}
            thumbnail
          />
        </Col>
        <Col sm={8}>
          <Row>
            <Col sm={9}>
              <Row>
                <Col style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  {hotelInfo.name}
                </Col>
              </Row>
              <Row className="pl-3 pr-3">
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
                <Col
                  sm={1}
                  xs={2}
                  className="pr-0 d-flex align-items-start justify-content-start"
                >
                  <FaMapMarkerAlt
                    size={20}
                    className="ml-2 mt-1 mr-2 text-danger"
                  />
                </Col>
                <Col
                  sm={11}
                  xs={9}
                  className="nopadding d-flex align-items-end text-primary font-weight-normal"
                  style={{ fontSize: "1.2rem" }}
                >
                  {hotelInfo.address}
                </Col>
              </Row>
              {/* <Row>
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
              </Row> */}
            </Col>

            <Col sm={3} className="d-flex flex-column justify-content-between">
              {/* Rating Price Button */}
              <Row>
                <Col
                  sm={12}
                  xs={4}
                  className="d-flex align-items-center justify-content-end pr-3"
                >
                  <Row className="text-center">
                    <Col className="pb-2 pr-1 pl-1"><span className="text-primary font-weight-bold stroke" style={{fontSize: "1.3rem"}}>Good</span></Col>

                    <Col sm={6} className="pl-1 pr-1">
                      <span className="border bg-primary rounded-circle font-weight-bold btn-lg text-white">
                        {hotelInfo.rating}
                      </span>
                    </Col>
                  </Row>
                </Col>
                {priceInfo && unit && (
                  <>
                    <Col
                      sm={12}
                      xs={8}
                      className="d-flex flex-column align-items-end justify-content-center p-3"
                    >
                      <Row>
                        <Col className="align-bottom">
                          <span
                            className="border-primary p-1 rounded-right rounded-left"
                            style={{
                              fontSize: "1.9rem",
                              fontWeight: 500,
                              borderBottom: "4px solid",
                              fontFamily: `"Bodoni MT", Didot, "Didot LT STD", "Book Antiqua", Garamond, "Times New Roman", serif`
                            }}
                          >
                            {unit !== "₩"
                              ? numberFormat.demicalFomat(priceInfo.price)
                              : numberFormat.hundredFormat(
                                  priceInfo.price
                                )}{" "}
                            {unit}
                          </span>
                        </Col>
                      </Row>

                      <Row className="pt-2">
                        {priceInfo.taxes_and_fees && (
                          <Col
                            sm={12}
                            className="d-flex align-items-end justify-content-end pt-1"
                          >
                            <span
                              className="text-right highlight ml-4 text-white border-danger rounded-right rounded-left pr-2"
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: 500,
                              }}
                            >
                              Taxes and fees included
                            </span>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  </>
                )}
                {/* <Row>Đã bao gồm thuế</Row> */}
                <Col className="d-flex align-items-center justify-content-center pt-5">
                  {priceInfo ? (
                    <Button
                      variant=""
                      className="border border-primary"
                      size="lg"
                      onClick={() => console.log(priceInfo)}
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      BOOK NOW
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      className="border border-primary"
                      size="lg"
                      onClick={() => console.log(priceInfo)}
                      style={{ color: "black", fontWeight: "bold" }}
                      disabled
                    >
                      NOT AVAILABLE
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col
              className="d-flex flex-column align-items-center pt-4"
              style={{ fontSize: "1rem" }}
            >
              {parse(
                hotelInfo.description.substring(
                  hotelInfo.description.indexOf("<p>"),
                  hotelInfo.description.indexOf("</p>") + 4
                )
              )}{" "}
              {isOpen ? "" : "..."}
              <Collapse isOpened={isOpen}>
                {parse(
                  hotelInfo.description.substring(
                    hotelInfo.description.indexOf("</p>") + 4,
                    hotelInfo.description.length
                  )
                )}
              </Collapse>
              <Button
                variant=""
                className="border border-primary btn-view"
                size="md"
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: "black", fontWeight: "bold" }}
              >
                {isOpen ? `View less <<` : `View more >>`}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelBox;
