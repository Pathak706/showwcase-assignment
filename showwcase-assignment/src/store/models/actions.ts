import { HomeActionTypes } from "../home/models/action";
import { EducationActionTypes } from "../educationDetails/models/action";

export type AppAction = HomeActionTypes | EducationActionTypes;
