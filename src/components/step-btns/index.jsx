import React from "react";
import { connect } from "react-redux";

import { onChangeStep, onChangeUserData } from "../../actions";

import { isEmptyObject } from "../step2-form/function-helpers";

import "./style.scss";

export const StepBtns = ({
  formState,
  step,
  onChangeStep,
  onChangeUserData,
}) => {
  const isDataOfBirthValidated =
    isEmptyObject(formState.step2?.syncErrors?.day) &&
    (formState.step2?.fields?.day?.visited ||
      formState.step2?.fields?.month?.visited ||
      formState.step2?.fields?.year?.visited);

  const isGenderValidated =
    formState.step2?.fields?.male?.visited ||
    formState.step2?.fields?.female?.visited ||
    formState.step2?.fields?.unspecified?.visited;

  const nextStepIsAllowed =
    (step === 1 && formState.step1?.syncErrors === undefined) ||
    (step === 2 && isDataOfBirthValidated && isGenderValidated);

  const BtnNext = (
    <button
      className="btn-next"
      type={nextStepIsAllowed ? "button" : "submit"}
      onClick={() => {
        if (nextStepIsAllowed) {
          if (step === 1) {
            onChangeUserData("email", formState.step1.values.email);
            onChangeUserData("password", formState.step1.values.password);
          } else {
            const { day, month, year } = formState.step2.values;

            const dateOfBirth = Date.parse(`${year}-${month}-${day}`);

            onChangeUserData("date_of_birth", dateOfBirth);
            onChangeUserData(
              "how_hear_about_us",
              formState.step2.values.howHearAboutUs || null
            );
          }

          onChangeStep(1);
        }
      }}
    >
      Next
    </button>
  );

  const BtnPrev = (
    <button
      className="btn-back"
      type="button"
      onClick={() => {
        onChangeStep(-1);
      }}
    >
      Back
    </button>
  );

  return (
    <div className="btns">
      {step === 2 ? BtnPrev : null}
      {step !== 3 ? BtnNext : null}
    </div>
  );
};

const mapStateToProps = ({ form, state: { step } }) => ({
  formState: form,
  step,
});

const mapDispatchToProps = { onChangeStep, onChangeUserData };

export default connect(mapStateToProps, mapDispatchToProps)(StepBtns);