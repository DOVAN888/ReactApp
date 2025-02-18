import { combineReducers } from "redux";
import userReducer from "./userReucer";

const rootReducer = combineReducers({
    user :userReducer

})

export default rootReducer