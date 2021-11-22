import React from "react";

import { isEmptyObject } from "./function-helpers";

const DateOfBirthFields = (fields) => {
  const { day, month, year } = fields;

  const anyError = day.meta?.error || month.meta?.error || year.meta?.error;

  const anyTouched =
    day.meta.touched || month.meta.touched || year.meta.touched;

  const isValidated = !anyTouched || (isEmptyObject(anyError) && anyTouched);

  return (
    <div className="data-of-birth">
      <p className={!isValidated ? "title invalid" : "title"}>
        {!isValidated
          ? anyError?.day || anyError?.month || anyError?.year
          : "date of birth"}
      </p>
      <div className="items">
        <input {...day.input} type="number" className="day" placeholder="DD" />

        <input
          {...month.input}
          type="number"
          className="month"
          placeholder="MM"
        />

        <input
          {...year.input}
          type="number"
          className="year"
          placeholder="YYYY"
        />
      </div>
    </div>
  );
};

export default DateOfBirthFields;
