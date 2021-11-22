import React from "react";
import { connect } from "react-redux";

import { Field, Fields, reduxForm } from "redux-form";

import { onChangeUserData } from "../../actions";

import StepBtns from "../step-btns";
import DateOfBirthFields from "./date-of-birth-fields";
import GenderFields from "./gender-fields";

import { isEmptyObject, countingPersonAge } from "./function-helpers";

import "./style.scss";

const validate = (value, allValues) => {
  const errors = {};

  if (allValues?.day === undefined) {
    errors.day = "day is required";
  } else if (parseInt(allValues?.day) > 31) {
    errors.day = "day is invalid";
  }

  if (allValues?.month === undefined) {
    errors.month = "month is required";
  }else if (parseInt(allValues?.month) > 12) {
    errors.month = "month is invalid";
  }

  if (allValues?.year === undefined) {
    errors.year = "year is required";
  } else if (allValues?.year.length !== 4) {
    errors.year = "year is invalid";
  }

  if (isEmptyObject(errors) && countingPersonAge(allValues) < 18) {
    errors.year = "you must be older then 18";
  }

  if (
    errors?.day === "day is required" &&
    errors?.month === "month is required" &&
    errors?.year === "year is required"
  ) {
    errors.day = "date of birth is required"
  }

  return errors;
};

const parse = (value, name) => {
  let proccesedValue = value;

  if (name === "day" || name === "month") {
    if (parseInt(value) === 0) {
      proccesedValue = "";
    }

    if (parseInt(value) < 0) {
      proccesedValue = "1";
    }

    if (value.length === 1 && parseInt(value) !== 0) {
      proccesedValue = "0" + value;
    }

    if (value.length === 3 && parseInt(value[0]) === 0) {
      proccesedValue = value.slice(1);
    }
  }

  return proccesedValue;
};

let Step2Form = ({ handleSubmit, onSubmit, onChangeUserData }) => {
  const howHearAboutUs = ["TV", "YouTube", "Facebook", "Instagram"];

  return (
    <form className="step-form-2" onSubmit={handleSubmit}>
      <div className="content">
        <Fields
          names={["day", "month", "year"]}
          component={DateOfBirthFields}
          validate={validate}
          parse={parse}
        />

        <Fields
          names={["male", "female", "unspecified"]}
          component={GenderFields}
          onChangeUserData={onChangeUserData}
        />

        <div className="how-hear-about-us">
          <p className="title">where did your hear about us?</p>

          <Field name="howHearAboutUs" component="select">
            <option value=""></option>
            {howHearAboutUs.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </Field>
        </div>
      </div>

      <StepBtns onSubmit={onSubmit} />
    </form>
  );
};

Step2Form = reduxForm({ form: "step2", onSubmit: () => {} })(Step2Form);

const mapStateToProps = () => ({});

const mapDispatchToProps = { onChangeUserData };

export default connect(mapStateToProps, mapDispatchToProps)(Step2Form);
