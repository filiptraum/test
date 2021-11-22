import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import StepForms from "../step-forms";

import "./style.scss";

const App = ({ step }) => {
  const [widthForIndicator, setWidthForIndicator] = useState(0);

  useEffect(() => {
    const calcWidth = () => {
      const width = window.innerWidth >= 435 ? 425 : window.innerWidth - 10;

      setTimeout(() => {
        setWidthForIndicator(width);
      }, 150);
    };

    calcWidth();

    window.addEventListener("resize", calcWidth);

    return () => {
      window.removeEventListener("resize", calcWidth);
    };
  });

  const title = step !== 3 ? "Signup" : "Thank you!";
  const width = widthForIndicator * step * 0.33333;

  return (
    <div className="app">
      <div className="content">
        <h1 className="title">{title}</h1>

        <div className="indicator-box">
          <div className="indicator" style={{ width }}></div>
        </div>

        <StepForms />
      </div>
    </div>
  );
};

const mapStateToProps = ({ state: { step } }) => ({
  step,
});

export default connect(mapStateToProps)(App);