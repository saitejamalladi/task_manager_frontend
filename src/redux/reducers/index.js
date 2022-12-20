import { combineReducers } from "redux";

import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";
import taskReducer from "./taskReducer";

export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  dashboardReducer,
  taskReducer,
});
