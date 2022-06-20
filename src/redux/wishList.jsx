import * as types from "./actionType";

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_WISHLIST_TO_STORAGE:
      state.push(action.payload);

       localStorage.setItem("wishlist", JSON.stringify(state))
      return [...state];
    case types.DELETE_WISHLIST_FROM_STORAGE:
     state.forEach((st, index)=>{
      if(st==action.payload){
        state.splice(index, 1)
      }
      })
      localStorage.setItem("wishlist", JSON.stringify(state))
       return [...state];

      case types.TAKE_WISHLIST_FROM_STORAGE:
        const wishListFromSt=JSON.parse(localStorage.getItem("wishlist"))
        
        return [...wishListFromSt];
    
    default: {
      return state;
    }
  }
};

export default loginReducer;
