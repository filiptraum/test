import React from "react";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";

import StepBtns from "../step-btns";

import "./style.scss";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, active },
}) => {
  const hasError = touched && error;
  const isPasswordActive = type === "password" && active;

  return (
    <div className="item">
      <label
        className={hasError ? "title invalid" : "title"}
        htmlFor={input.name}
      >
        {hasError ? error : label}
      </label>

      <input
        {...input}
        type={isPasswordActive ? "text" : type}
        autoComplete="off"
      />
    </div>
  );
};

let Step1Form = ({ handleSubmit }) => {
  return (
    <form className="step-form-1" onSubmit={handleSubmit}>
      <div className="content">
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <Field
          name="confirmPassword"
          type="password"
          component={renderField}
          label="Confirm password"
        />
      </div>

      <StepBtns />
    </form>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password is too short";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Confirm password doesn't match";
  }

  return errors;
};

Step1Form = reduxForm({
  form: "step1",
  destroyOnUnmount: false,
  validate,
  onSubmit: () => {},
})(Step1Form);

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Step1Form);