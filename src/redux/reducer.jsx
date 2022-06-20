import * as types from "./actionType";

const badgetReducer = (state = [], action) => {
  switch (action.type) {
    case types.INSERT_ITEM:
      if (action.payload.installment) {
        const { price, installment } = action.payload;
         action.payload.installmentPrice = parseFloat(
          (price / installment).toFixed(2)
        );
      }
       const stringifiedState = JSON.stringify([...state, action.payload]);
      localStorage.setItem("bucket", stringifiedState);
      return [...state, action.payload];
 
      case types.UNVAN_ID_ADD:
           const {unvanId, productId, deliveryTime} = action.payload;
            const newState= state.map((st)=>{
            if(st.id==productId){
               return {...st, unvanId,deliveryTime }
            }
             return {...st,deliveryTime }
          })
           const stringifiedState4 = JSON.stringify([...newState]);
          localStorage.setItem("bucket", stringifiedState4);
        return [...newState];

    
    case types.INCREASE_ITEM:
      const {id, installment, quantity}=action.payload;
 
       state = state.map((item) => {
        if (item.id == id) {
          if(installment && item.installment){
            item.count =parseInt(item.count) + parseInt(quantity);
          }
          if(!installment && !item.installment){
            item.count =parseInt(item.count) + parseInt(quantity);
          }
          return item;
         }
        return item;
      });
      const stringifiedState5 = JSON.stringify([...state]);
      localStorage.setItem("bucket", stringifiedState5);
      return [...state];

    case types.DELETE_ITEM:
       state = state.filter((item) => item.id != action.payload);
       const stringifiedState1 = JSON.stringify(state);
      localStorage.setItem("bucket", stringifiedState1);
      return [...state];
    case types.COUNT_CHANGE:
       state = state.map((item) => {
         if ((item.id == action.payload.id) && (action.payload.count>0) ) {
           item.count = action.payload.count;
           return item;
        }
        return item;
      });
      const stringifiedState2 = JSON.stringify(state);
      localStorage.setItem("bucket", stringifiedState2);
      return [...state];

    case types.DELETE_ALL:
      const stringifiedState3 = JSON.stringify([]);
      localStorage.setItem("bucket", stringifiedState3);
      return [];

    case types.TAKE_ITEMS_FROM_STORAGE:
      state = JSON.parse(localStorage.getItem("bucket"));
      return [...state];
    default: {
      return state;
    }
  }
};

export default badgetReducer;
