
 import * as types from "./actionType";

const notification = (state = [], action) => {
  switch (action.type) {
    case types.GET_NOTIFICATION:
 

       return [...action.payload];
    
    
    
    default: {
      return state;
    }
  }
};

export default notification;
