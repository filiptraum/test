import React from "react";
import { connect } from "react-redux";

import Step1Form from "../step1-form";
import Step2Form from "../step2-form";
import Step3Form from "../step3-form";

import "./style.scss";

const StepForms = ({ step }) => {
  return (
    <div className={`step step-${step}`}>
      {step === 1 ? <Step1Form /> : null}
      {step === 2 ? <Step2Form /> : null}
      {step === 3 ? <Step3Form /> : null}
    </div>
  );
};

const mapStateToProps = ({ state: { step } }) => ({ step });

export default connect(mapStateToProps)(StepForms);
