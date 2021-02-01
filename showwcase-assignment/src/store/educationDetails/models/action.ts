import { IEducationDetails } from "./educationDetails";

export const ADD_EDUCATION = "ADD_EDUCATION";
export const EDIT_EDUCATION = "EDIT_EDUCATION";
export const DELETE_EDUCATION = "DELETE_EDUCATION";

interface IAddEducationAction {
  type: typeof ADD_EDUCATION;
  payload: IEducationDetails[];
}

interface IEditEducationAction {
  type: typeof EDIT_EDUCATION;
  payload: IEducationDetails[];
}

interface IDeleteEducationAction {
  type: typeof DELETE_EDUCATION;
  payload: IEducationDetails[];
}

export type EducationActionTypes = IAddEducationAction | IEditEducationAction | IDeleteEducationAction;
