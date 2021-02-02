import {
  ADD_EDUCATION,
  EDIT_EDUCATION,
  DELETE_EDUCATION,
  EducationActionTypes,
} from "./models/action";

import { IEducationDetails } from "./models/educationDetails";

const defaultState = new Array<IEducationDetails>();

export const educationReducer = (
  state = defaultState,
  action: EducationActionTypes
): IEducationDetails[] => {
  switch (action.type) {
    case ADD_EDUCATION:
    case EDIT_EDUCATION:
      return action.payload;
    case DELETE_EDUCATION:
      return [...action.payload];
    default:
      return state;
  }
};
