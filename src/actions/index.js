const onChangeStep = (value) => {
  return {
    type: "ON_CHANGE_STEP",
    payload: value,
  };
};

const onChangeUserData = (key, value) => {
  return {
    type: "ON_CHANGE_USER_DATA",
    payload: { key, value },
  };
};

export { onChangeStep, onChangeUserData };
