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
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );

  const [unit, setUnit] = useState("");
  const [hotelInfo, setHotelInfo] = useState([]);
  const [priceInfo, setPriceInfo] = useState([]);

  useEffect(() => {
    const fetchHotelInfo = async () => {
      const res = await axios.get(`${BaseURL}`);
      setHotelInfo(res.data);
    };
    fetchHotelInfo();
  }, []);

  useEffect(() => {
    const fecthAllPrice = async () => {
      const res = await axios.get(`${BaseURL}/1/${currency}`);
      await setPriceInfo(res.data);
    };

    fecthAllPrice();
  }, [hotelInfo, currency]);

  // useEffect(() => {
  //   async function asyncForEach(array, callback) {
  //     for (let index = 0; index < array.length; index++) {
  //       await callback(array[index], index, array);
  //     }
  //   }

  //   const fetchSpecificPrice = async () => {
  //     await asyncForEach(hotelInfo, async (item) => {
  //       let result = price.find((priceInfo) => priceInfo.id === item.id);
  //       // setHotelInfo({ ...item, priceInfo: result });
  //       item.priceInfo = result;
  //     });
  //   };
  //   console.log(123);

  //   fetchSpecificPrice();
  // }, [price]);

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
      <div className="container bg-secondary">
        <Header currency={currency} onSelectCurrency={onSelectCurrency} />
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
