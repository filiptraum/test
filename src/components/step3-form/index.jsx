import React from "react";
import { connect } from "react-redux";

import "./style.scss";

import icon from "./check.png";

export const Step3Form = ({ user_data }) => {
  return (
    <>
      <img src={icon} alt="icon" />
      <button
        className="btn-dashboard"
        onClick={() => {
          console.log(JSON.stringify(user_data));
        }}
      >
        Go to Dashboard
      </button>
    </>
  );
};

const mapStateToProps = ({ state: { user_data } }) => ({
  user_data,
});

export default connect(mapStateToProps)(Step3Form);