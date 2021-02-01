import { IHome } from "./home";

export const ADD_NAME = "ADD_NAME";
export const EDIT_NAME = "EDIT_NAME";
export const DELETE_NAME = "DELETE_NAME";

interface AddNameAction {
  type: typeof ADD_NAME;
  payload: IHome;
}

interface EditNameAction {
  type: typeof EDIT_NAME;
  payload: IHome;
}

interface DeleteNameAction {
  type: typeof DELETE_NAME;
  payload: IHome;
}

export type HomeActionTypes = AddNameAction | EditNameAction | DeleteNameAction;
