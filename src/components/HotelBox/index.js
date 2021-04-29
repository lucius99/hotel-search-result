import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Collapse } from "react-collapse";
import { FaMapMarkerAlt } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import numberFormat from "../../utils/numberFormat";
import "./hotelBox.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import parse from "html-react-parser";
import Competitor from "../Competitor";
import SavingPopUp from "../SavingPopUp";

const HotelBox = ({ unit, onBook, hotelInfo, priceInfo }) => {
  /**
   * {isOpen}
   * @type {boolean}
   * Expand description more
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * {competitors}
   * @type {Array}
   * Store all info competitor of hotel on website
   *
   * Expect Value : [
   *                  {
   *                    name:   {string},
   *                    price:  {string},
   *                    saving: {number}
   *                   }
   *                 ]
   */
  const [competitors, setCompetitors] = useState([]);

  // Temporary not use. Sorry for this inconvenience
  const [isSort, setIsSort] = useState(false);

  /**
   * {isPopUpSaving}
   * @type {boolean}
   * Pop up saving rate over other competitors
   */
  const [isPopUpSaving, setIsPopUpSaving] = useState(false);

  /**
   * {savingValue}
   * @type {number}
   * Store saving value to pop up
   */
  const [savingValue, setSavingValue] = useState(0);

  /**
   * UseEffect run several times when running page
   * Use to fetch all competitors from API
   */
  useEffect(() => {
    const fectchCompetitors = async () => {
      await setCompetitors([]);
      if (priceInfo) {
        if (priceInfo.competitors !== undefined) {
          for (let key in priceInfo.competitors) {
            await setCompetitors((competitors) => [
              ...competitors,
              {
                name: key,
                price: priceInfo.competitors[key],
                saving: Math.round(
                  ((priceInfo.competitors[key] - priceInfo.price) /
                    priceInfo.competitors[key]) *
                    100
                ),
              },
            ]);
          }
          await setIsSort(false);
        }
      }
    };

    fectchCompetitors();
  }, [priceInfo]);

  /**
   * Use to sort competitors'sprice from low to high
   */
  useEffect(() => {
    const sortCompetitors = async () => {
      if (priceInfo) {
        if (priceInfo.competitors !== undefined) {
          if (
            competitors.length === Object.keys(priceInfo.competitors).length
          ) {
            let result = competitors.sort((a, b) =>
              a.price > b.price ? 1 : -1
            );
            setCompetitors(result);
          }
        }
      }
    };

    sortCompetitors();
  }, [competitors]);

  /**
   * Handle set isPopUp when hover over competitor
   */
  const onHoverCompetitor = async () => {
    setIsPopUpSaving(true);
  };

  const onHoverOutCompetitor = async () => {
    setIsPopUpSaving(false);
  };

  /**
   * Handle set saving rate for hotel
   */
  const handleSetSavingValue = async (value) => {
    setSavingValue(value);
  };

  return (
    <Container className="bg-white mb-4 mt-4">
      <Row>
        <Col sm={3} className="fill">     {/* Image Of Hotel */}
          <Image
            style={{ width: "100%", height: "100%" }}
            src={hotelInfo.photo}
            thumbnail
          />
        </Col>
        <Col sm={9}>                      {/* Address, Name, Price,.... */}
          {isPopUpSaving && <SavingPopUp savingValue={savingValue} />}
          <Row>
            <Col sm={8} md={8}>
              <Row>                                                      {/* Hotel Name */}
                <Col style={{ fontSize: "2rem", fontWeight: "bold" }}>   
                  {hotelInfo.name}
                </Col>
              </Row>
              <Row className="pl-3 pr-3">                                {/* Star Rating */}
                <Col                      
                  sm={1}
                  lg={1}
                  md={2}
                  className="pr-1 pl-1 d-flex align-items-center justify-content-center rounded-left border font-weight-bold"
                  style={{ backgroundColor: "#fbb511", fontSize: "1.2rem" }}
                >                                                         
                  {numberFormat.starsFormat(hotelInfo.stars)}
                </Col>
                <Col
                  sm={3}
                  lg={4}
                  md={5}
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
              <Row className="pt-3 pb-3">                                  {/* Address */}
                <Col
                  sm={1}
                  xs={2}
                  className="pr-0 d-flex align-items-start justify-content-start"
                >
                  <FaMapMarkerAlt size={25} className="text-danger pt-1" />
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
              <Row className="pt-3 pb-0 pl-3 pr-3">                        {/* Competitors */}
                <Col
                  sm={12}
                  className="border-info rounded-right rounded-left text-secondary font-weight-bolder text-left pl-0 pb-1"
                >
                  {competitors.length > 0 ? (
                    <span>Others Hotel Website:</span>
                  ) : (
                    <span>There is no hotel to show up</span>
                  )}
                </Col>

                {competitors.length > 0 &&
                  // isSort &&
                  competitors.map((item) => (
                    <Competitor
                      onMouseEnter={onHoverCompetitor}
                      onMouseLeave={onHoverOutCompetitor}
                      key={`key-${item.name}}`}
                      competitors={item}
                      unit={unit}
                      handleSetSavingValue={handleSetSavingValue}
                    />
                  ))}
              </Row>
            </Col>

            <Col
              sm={4}
              md={4}
              className="d-flex flex-column justify-content-between"
            >
              
              <Row>                                            {/* User Review Rating, Price, Button */}
                <Col
                  sm={12}
                  xs={4}
                  className="d-flex align-items-center justify-content-end pr-3"
                >
                  <Row className="text-center">
                    <Col className="pb-2 pr-2 pl-2">
                      <span
                        className="text-primary font-weight-bold stroke"
                        style={{ fontSize: "1.5rem" }}
                      >
                        Good
                      </span>
                    </Col>

                    <Col sm={6} className="pl-2 pr-2">
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
                      className="d-flex flex-column align-items-end justify-content-center pr-3 pt-5"
                    >
                      <Row>
                        <Col className="align-bottom">
                          <span
                            className="border-primary p-1 rounded-right rounded-left"
                            style={{
                              fontSize: "1.8rem",
                              fontWeight: "bold",
                              borderBottom: "4px solid",
                              fontFamily: `"Arial Narrow", Arial, "Helvetica Condensed", Helvetica, sans-serif`,
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
                <Col className="d-flex align-items-center justify-content-end pt-4">    {/* Button Book Now */}
                  {priceInfo ? (
                    <Button
                      variant="primary"
                      className="border border-primary text-white"
                      size="lg"
                      onClick={() => console.log(competitors)}
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
          <Row className="border-top border-dark mt-3 rounded-right rounded-left">         {/* Description */}
            <Col
              className="d-flex flex-column align-items-center pt-4"
              style={{ fontSize: "1.2rem" }}
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
