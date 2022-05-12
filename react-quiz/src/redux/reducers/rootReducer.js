import {combineReducers} from "redux";
import quizReducer from "./quizReducer";
import createReducer from "../slices/create";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer
})