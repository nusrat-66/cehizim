import * as types from "./actionType";

const defaultState = "credit";

const paymantTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.CREDIT:
      return "credit";
    case types.INCASH:
      return "incash";
    default:
     return state;
  }
};


export default paymantTypeReducer ;