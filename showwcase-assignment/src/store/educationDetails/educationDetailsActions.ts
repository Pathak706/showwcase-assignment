import {
  ADD_EDUCATION,
  EDIT_EDUCATION,
  DELETE_EDUCATION,
} from "./models/action";
import { IEducationDetails } from "./models/educationDetails";

export const add_education = (payload: IEducationDetails[]) => ({
  type: ADD_EDUCATION,
  payload,
});

export const edit_education = (payload: IEducationDetails[]) => ({
  type: EDIT_EDUCATION,
  payload,
});

export const delete_education = (payload: IEducationDetails[]) => ({
  type: DELETE_EDUCATION,
  payload,
});
