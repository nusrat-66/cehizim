import * as types from "./actionType";

const categorieReducer = (
  state = [],
  action
) => {
  switch (action.type){
    case types.GET_CATEGORIES:
        return  action.payload
  
    default: {
      return state;
    }
  }
};

export default categorieReducer;
