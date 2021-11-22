import React, { useState, useEffect } from "react";

const GenderFields = (props) => {
  const [active, setActive] = useState("");

  const { male, female, unspecified, onChangeUserData } = props;

  useEffect(() => {
    let active = male.meta.active ? "male" : "";
    active = female.meta.active ? "female" : active;
    active = unspecified.meta.active ? "unspecified" : active;

    if (active !== "") {
      setActive(active);
      onChangeUserData("gender", active);
    }
  }, [
    male.meta.active,
    female.meta.active,
    unspecified.meta.active,
    onChangeUserData,
  ]);

  const anyTouched =
    male.meta.touched || female.meta.touched || unspecified.meta.touched;

  const anyVisited =
    male.meta.visited || female.meta.visited || unspecified.meta.visited;

  const isValidated =
    !anyTouched || ((anyTouched || anyVisited) && active !== "");

  return (
    <div className="gender">
      <p className={!isValidated ? "title invalid" : "title"}>
        {isValidated ? "gender" : "gender is required"}
      </p>
      <div className="items">
        <input
          {...male.input}
          type="button"
          value="male"
          className={
            (anyTouched || anyVisited) && active === "male"
              ? "gender-item selected-gender"
              : "gender-item"
          }
        />

        <input
          {...female.input}
          type="button"
          value="female"
          className={
            (anyTouched || anyVisited) && active === "female"
              ? "gender-item selected-gender"
              : "gender-item"
          }
        />

        <input
          {...unspecified.input}
          type="button"
          value="unspecified"
          className={
            (anyTouched || anyVisited) && active === "unspecified"
              ? "gender-item selected-gender"
              : "gender-item"
          }
        />
      </div>
    </div>
  );
};

export default GenderFields;