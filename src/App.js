import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import HotelBox from "./components/HotelBox";
import axios from "axios";
import BaseURL from "./API/BaseUrl";
import { Container } from "react-bootstrap";

import "./index.css";
const App = () => {
  /**
   *
   * @type {string}
   * Store string of currency
   */
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );
  const [unit, setUnit] = useState("");

  /**
   * {hotelInfo}
   * @type {Array}
   * Store all info competitor of hotel on website
   *
   * Expect Value : [
   *                  {
   *                    id:   {number},
   *                    name:  {string},
   *                    rating: {number}
   *                    address: {string}
   *                    photo: {string}
   *                    description: {string}
   *
   *                   }
   *                 ]
   */
  const [hotelInfo, setHotelInfo] = useState([]);

  /**
   * {priceInfo}
   * @type {Array}
   * Store all info competitor of hotel on website
   *
   * Expect Value : [
   *                  {
   *                    id:   {number},
   *                    price:  {number},
   *                    competitors: {object}
   *                   }
   *                 ]
   */
  const [priceInfo, setPriceInfo] = useState([]);

  /**
   * Use to fetch hotel info from API
   */
  useEffect(() => {
    const fetchHotelInfo = async () => {
      const res = await axios.get(`${BaseURL}`);
      setHotelInfo(res.data);
    };
    fetchHotelInfo();
  }, []);

  /**
   * Use to fetch price of hotel info from API
   */
  useEffect(() => {
    const fecthAllPrice = async () => {
      const res = await axios.get(`${BaseURL}/1/${currency}`);
      await setPriceInfo(res.data);
    };

    fecthAllPrice();
  }, [hotelInfo, currency]);

  useEffect(() => {
    const fetchUnit = async (currency) => {
      switch (currency) {
        case "USD":
          setUnit("$US");
          break;
        case "SGD":
          setUnit("$SG");
          break;
        case "CNY":
          setUnit("¥");
          break;
        case "KRW":
          setUnit("₩");
          break;
        default:
          setUnit("$US");
      }
    };

    fetchUnit(currency);
  }, [currency]);

  // Function to handle select currency
  const onSelectCurrency = async (e) => {
    await localStorage.setItem("currency", e.target.value);
    await setCurrency(e.target.value);
  };

  const onBook = async () => {
    console.log(priceInfo);
  };

  return (
    <Router>
      <Header currency={currency} onSelectCurrency={onSelectCurrency} />
      <div className="container bg-secondary mt-5">
        {hotelInfo.length > 0
          ? hotelInfo.map((item) => {
              return (
                <HotelBox
                  key={`hotel-${item.id}`}
                  unit={unit}
                  onBook={onBook}
                  hotelInfo={item}
                  priceInfo={priceInfo.find(
                    (priceItem) => priceItem.id === item.id
                  )}
                />
              );
            })
          : null}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
