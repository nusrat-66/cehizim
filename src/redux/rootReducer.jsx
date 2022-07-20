import { combineReducers } from "redux";
import elanReducers from "./reducer";
import loginReducer from "./loginReducer";
import wishList from "./wishList";
import categorieReducer from "./categoriesReducer";
import paymantType from "./paymantType"
import notification from "./notification"


export const rootReducer =  combineReducers({
    buckets:elanReducers,
    loginReducer,
    wishList,
    categorieReducer,
    paymantType,
    notification
})