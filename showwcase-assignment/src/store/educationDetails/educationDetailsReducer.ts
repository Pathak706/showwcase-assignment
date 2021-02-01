import {
  ADD_EDUCATION,
  EDIT_EDUCATION,
  DELETE_EDUCATION,
  EducationActionTypes,
} from "./models/action";

import { IEducationDetails } from "./models/educationDetails";

const defaultState: IEducationDetails[] = [];

export const educationReducer = (
  state = defaultState,
  action: EducationActionTypes
): IEducationDetails[] => {
  let nextState: IEducationDetails = {
    name_of_school: "",
    degree: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
    grade: "",
    description: "",
    index: 0,
  };
  switch (action.type) {
    case ADD_EDUCATION:
      nextState = Object.assign({}, action.payload, { index: state.length });
      state.push(nextState);
      return state;
    case EDIT_EDUCATION:
      let obj_index = state.findIndex(
        (obj) => obj.index === action.payload.index
      );
      if (obj_index) {
        state[obj_index] = action.payload;
      } else {
        nextState = Object.assign({}, action.payload, { index: state.length });
        state.push(nextState);
      }
      return state;
    case DELETE_EDUCATION:
      state.splice(action.payload, 1);
      return state;
    default:
      return state;
  }
};
