import { createStore, combineReducers } from "redux";

import { counterReducer } from "./counter/CounterReducer";

export const rootReducer = combineReducers({ counterReducer });

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
