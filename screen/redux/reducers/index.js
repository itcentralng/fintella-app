import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cart";
import languageReducer from "./languages";

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  cart: cartReducer,
});

export default rootReducer;
