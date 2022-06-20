import * as types from "./actionType";

const loginReducer = (
  state = {
    logged: false,
    id: "",
    fullName: "",
    phoneNumber: "",
    finCode: null,
    customerId:null
  },
  action
) => {
  switch (action.type){
    case types.LOGIN:
        return { logged: true, finCode: null, id:action.payload.id, phoneNumber: action.payload.phoneNumber, customerId:action.payload.customerId, fullName:action.payload.fullname }
    case types.UNLOG:
      return {
        logged: false,
        id: "",
        fullName: "",
        phoneNumber: "",
        finCode: null,
      }
    default: {
      return state;
    }
  }
};

export default loginReducer;
