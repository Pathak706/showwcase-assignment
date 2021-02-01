import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { educationReducer } from "./educationDetails/educationDetailsReducer";
import { homeReducer } from "./home/homeReducer";

export const rootReducer = combineReducers({ education: educationReducer, home: homeReducer });

export type AppState = ReturnType<typeof rootReducer>;

export type rootStore = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
