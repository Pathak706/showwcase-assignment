import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { educationReducer } from "./educationDetails/educationDetailsReducer";
import { homeReducer } from "./home/homeReducer";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
  education: educationReducer,
  home: homeReducer,
});

const persistConfig = {
  key: "showcase",
  storage: storage,
  whitelist: ["home", "education"], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk, logger);
export const store = createStore(pReducer, composeWithDevTools(middleware));
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof rootReducer>;
