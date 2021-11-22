const initialState = {
  step: 1,
  user_data: {
    email: null,
    password: null,
    date_of_birth: null,
    gender: null,
    how_hear_about_us: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_CHANGE_STEP":
      return {
        ...state,
        step: state.step + action.payload,
      };

    case "ON_CHANGE_USER_DATA":
      return {
        ...state,
        user_data: {
          ...state.user_data,
          [action.payload.key]: action.payload.value
        },
      };

    default:
      return state;
  }
};

export default reducer;
