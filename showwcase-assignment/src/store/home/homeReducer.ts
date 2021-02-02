import {
  HomeActionTypes,
  ADD_NAME,
  EDIT_NAME,
  DELETE_NAME,
} from "./models/action";
import { IHome } from "./models/home";

const defaultState: IHome = {
  name: "",
};

export const homeReducer = (
  state = defaultState,
  action: HomeActionTypes
): IHome => {
  const nextState = {
    name: state.name,
  };
  switch (action.type) {
    case ADD_NAME:
      nextState.name = action.payload.name;
      return nextState;
    case EDIT_NAME:
      nextState.name = action.payload.name;
      return nextState;
    case DELETE_NAME:
      nextState.name = "";
      return nextState;
    default:
      return state;
  }
};
