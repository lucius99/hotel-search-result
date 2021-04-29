import React from "react";
import "./savingPopUp.css";
const SavingPopUp = ({ savingValue }) => {
  return (
    <div
      className="position-absolute blink bg-danger text-white font-weight-bold p-2 border border-danger rounded-pill"
      style={{ right: "1rem", top: "3rem", fontSize: "1.4rem" }}
    >
      Ours Price Save {savingValue} %
    </div>
  );
};

export default SavingPopUp;
