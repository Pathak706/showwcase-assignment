import { ADD_NAME, EDIT_NAME, DELETE_NAME } from "./models/action";
import { IHome } from "./models/home";

export const add_name = (name: IHome) => ({
  type: ADD_NAME,
  payload: name,
});

export const edit_name = (name: IHome) => ({
  type: EDIT_NAME,
  payload: name,
});

export const delete_name = () => ({
  type: DELETE_NAME,
});
