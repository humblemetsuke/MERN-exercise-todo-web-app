import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

import goalReducer from "./goalReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  goals: goalReducer
});
